const express = require("express");
const router = express.Router();
const Person = require("../models/person.js");
//POST route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    //create a new person using the data
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("data is saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});
//GET method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data is fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //Extract the work type from the url parameter
    if (
      workType === "chef" ||
      workType === "waiter" ||
      workType === "manager" ||
      workType === "owner"
    ) {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json("Invalid work type");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json("Person not found");
    }
    console.log("data is updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json("Person not found");
    }
    console.log("data is deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
