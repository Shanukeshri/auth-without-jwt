const router = require("express").Router();
const note = require("./noteModel.js");
const isAuth = require('./middleware.js')

router.get("/", isAuth,async (req, res) => {
  const userId = req.session.userId;
  noteArray = await note.find({ userId });
  if (!noteArray) {
    return res.status(400).json({ msg: "No notes found" });
  }
  noteArray = noteArray.map(ele =>  ele.note);
   
  noteNew = noteArray.join(".");
  return res.status(200).json({ note: noteNew });
});

router.post("/", isAuth,async (req, res) => {
  newNote = new note({ note: req.body.note, userId: req.session.userId });
  await newNote.save();
  return res.status(200).json({ msg: "Note Added Successfully" });
});

module.exports = router;
