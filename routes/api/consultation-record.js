const express = require("express");
const router = express.Router();
const Models = require("../../models");
const passport = require("passport");
const ConsultRecord = Models.consult_record;
const Op = Models.Sequelize.Op;

router.get("/", passport.authenticate("jwt", {session: false}), async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const timeFrom = req.query.timeFrom;
        const timeEnd = req.query.timeEnd;
        if (!timeEnd || !timeFrom || timeFrom === "" || timeEnd === "") {
            throw new Error("Invalid Parameter");
        }
        let result = await ConsultRecord.findAll({
            where: {
                user_id: userId,
                date: {
                    [Op.gte]: timeFrom,
                    [Op.lt]: timeEnd,
                },
            },
        });
        console.log(userId);
        res.json(result);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post("/", passport.authenticate("jwt", {session: false}), async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const doctor = req.body.doctor;
        const patient = req.body.patient;
        const diagnosis = req.body.diagnosis;
        const medication = req.body.medication;
        const fee = req.body.fee;
        const date = req.body.date;
        const followup = req.body.followup;

        if (!doctor || !patient || !diagnosis || !medication || !fee || !date || !followup) {
            throw new Error("Invalid Parameter");
        }

        if (doctor === "" || patient === "" || diagnosis === "" || medication === "" || fee === "" || date === "" || followup === "") {
            throw new Error("Invalid Parameter");
        }
        await ConsultRecord.create({
            user_id: userId,
            doctor: doctor,
            patient: patient,
            diagnosis: diagnosis,
            medication: medication,
            fee: fee,
            date: date,
            followup: followup,
        });
        
        res.status(200).send({success: true});
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});

module.exports = router;
