const express = require("express");
const router = express.Router();
const PersonModel = require("../model/PersonModel");
// --------------------- ADD one person ------------------------------
router.post("/", async (req, res) => {
    try {
        const { name, age, favoriteFoods } = req.body;
        const Person = new PersonModel({ name, age, favoriteFoods });
        await Person.save();
        res.status(200).send({ msg: "New Person is added", Person });
    } catch (error) {
        res.status(500).send({ msg: "Person is not added", error });
    }
});
// --------------------- ADD multy persons ------------------------------
router.post("/ManyRecords", async (req, res) => {
    try {
        const Persons = req.body;
        await PersonModel.create(Persons);
        res.status(200).send({ msg: "New Persons are added", Persons });
    } catch (error) {
        res.status(500).send({ msg: "Persons are not added", error });
    }
});
// --------------------- print all persons ------------------------------
router.get("/", async (req, res) => {
    try {
        const Persons = await PersonModel.find();
        res.status(200).send({ msg: "All Persons are finded", Persons });
    } catch (error) {
        res.status(500).send({ msg: "Any Persons are finded", error });
    }
});
// --------------------- print one person by favoriteFoods ------------------------------
router.get("/favoriteFoods/:favoriteFoods", async (req, res) => {
    try {
        const { favoriteFoods } = req.params;
        const Person = await PersonModel.findOne({
            favoriteFoods: favoriteFoods,
        });
        res.status(200).send({
            msg: `Person how have ${favoriteFoods} as favoriteFoods is : `,
            Person,
        });
    } catch (error) {
        res.status(500).send({
            msg: `any Person have ${favoriteFoods} as favoriteFoods`,
            error,
        });
    }
});
// --------------------- print one person by ID ------------------------------
router.get("/PersonId/:Id", async (req, res) => {
    try {
        const { Id } = req.params;
        const Person = await PersonModel.findById(Id);
        res.status(200).send({ msg: `Person with ID = ${Id}`, Person });
    } catch (error) {
        res.status(500).send({
            msg: "ther are not any Person with this ID",
            error,
        });
    }
});
// --------------------- update favoriteFoods ------------------------------
router.put("/favoriteFoodsUpdat/:Id", async (req, res) => {
    try {
        const { Id } = req.params;
        const Person = await PersonModel.findById(Id);
        const newPerson = await Person.updateOne({
            $push: { favoriteFoods: "hamburger" },
        });
        await newPerson.save();
        res.status(200).send({ msg: "favoriteFoods is Updated", newPerson });
    } catch (error) {
        res.status(500).send({ msg: "favoriteFoods is not Updated", error });
    }
});
// --------------------- update age ------------------------------
router.put("/ageUpdate/:Name", async (req, res) => {
    try {
        const { Name } = req.params;
        const Person = await PersonModel.findOneAndUpdate(
            { name: Name },
            { age: 20 },
            { new: true }
        );
        res.status(200).send({ msg: "age is Update", Person });
    } catch (error) {
        res.status(500).send({ msg: "age is not Update", error });
    }
});
// --------------------- delet Person ------------------------------
router.delete("/:Id", async (req, res) => {
    try {
        const { Id } = req.params;
        const Person = await PersonModel.findOneAndDelete(Id);
        res.status(200).send({ msg: "person deleted", Person });
    } catch (error) {
        res.status(500).send({ msg: "person is not deleted", error });
    }
});
// --------------------- remove Person ------------------------------
router.delete("/personRemove/:Name", async (req, res) => {
    try {
        const { Name } = req.params;
        const Persons = await PersonModel.remove({ name: Name });
        res.status(200).send({ msg: "persons removed", Persons });
    } catch (error) {
        res.status(200).send({ msg: "persons are not removed", error });
    }
});
// --------------------- Find people who like burritos ------------------------------
router.get("/Helpers", (req, res) => {
    const Persons = PersonModel.find({ favoriteFoods: "burritos" })
        .sort({ name: "asc" })
        .limit(2)
        .select("-age")
        .exec((err, data) => {
            if (err) {
                res.status(200).send({
                    msg: "any persons are finded",
                    err,
                });
            } else res.status(200).send({ msg: "persons are finded", data });
        });
});

module.exports = router;
