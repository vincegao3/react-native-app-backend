const express = require("express");
const router = express.Router();
const passport = require("passport");
const models = require("../../models");
const User = models.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) throw new Error("Invalid Parameter");

        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new Error("User Not Found");
        }

        const result = await bcrypt.compare(password, user.password);

        if (result) {
            let payload = {id: user.user_id};
            let jwtOptions = {};
            jwtOptions.secretOrKey = "react-native-app";
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({msg: "success", token: token});
        } else {
            throw new Error("Incorrect Password");
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err && err.message);
    }
});

router.post("/register", async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const address = req.body.address;
        const phone = req.body.phone;
        const name = req.body.name;
        if (!email || !password || !address || !phone || !name) {
            throw new Error("Invalid Parameter");
        }

        if (!isValidEmail(email)) {
            throw new Error("Incorrect Email");
        }

        if (phone.length !== 8 || isNaN(phone)) {
            throw new Error("Incorrect Phone Number");
        }

        const existedUser = await User.findOne({
            where: {
                email: email,
            },
        });

        if (existedUser) {
            throw new Error("User is Existed");
        } else {
            const salt = await bcrypt.genSalt(10);
            let hashedPass = await bcrypt.hash(password, salt);
            const user = await User.create({
                email: email,
                password: hashedPass,
                name: name,
                address: address,
                phone_number: phone,
            });
        }

        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});

router.get("/", passport.authenticate("jwt", {session: false}), async (req, res, next) => {
    try {
            res.status(200).send("yes");
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});

module.exports = router;
