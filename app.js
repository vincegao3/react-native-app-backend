const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const dov = require("dotenv").config();
const bodyParser = require("body-parser");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const indexRouter = require("./routes/index");

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

const Models = require("./models");
const User = Models.User;

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "react-native-app";

let strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
    console.log("payload received", jwt_payload);
    let user = await User.findOne({
        where: {user_id: jwt_payload.id},
    });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);

app.use(passport.initialize());

app.use((req, res, next) => {
    delete req.headers["content-encoding"];
    next();
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
const models = require("./models");

// CORS for Local Development
app.use(cors({origin: true, credentials: true}));

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Handle Error
app.use((err, req, res, next) => {
    return res.status(err.status || 500).send({
        message: err.message,
        error: {},
        title: "error",
    });
});

module.exports = app;
