const router = require("express").Router();
const { PlayList, validate } = require("../models/artist");
const { Song } = require("../models/song");
const { User } = require("../models/user");
const { Artist } = require("../models/artist");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const Joi = require("joi");

// Create artist
router.post("/", admin, async (req, res) => {
	const { error } = validate(req.body);
	if (error) res.status(400).send({ message: error.details[0].message });

	const artist = await Artist(req.body).save();
	res.status(201).send({ data: artist, message: "artist created successfully" });
});

// Get all artists
router.get("/", async (req, res) => {
	const artists = await Artist.find();
	res.status(200).send({ data: artists });
});

// Update artist
router.put("/:id", [validateObjectId, admin], async (req, res) => {
	const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.send({ data: artist, message: "Updated artist successfully" });
});

// Delete song by ID
router.delete("/:id", [validateObjectId, admin], async (req, res) => {
	await Artist.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Artist deleted sucessfully" });
});

// Follow artist
router.put("/like/:id", [validateObjectId, auth], async (req, res) => {
	let resMessage = "";
	const artist = await Artist.findById(req.params.id);
	if (!artist) return res.status(400).send({ message: "artist does not exist" });

	const user = await User.findById(req.user._id);
	const index = user.likedArtists.indexOf(artist._id);
	if (index === -1) {
		user.likedArtists.push(artist._id);
		resMessage = "Added to artists followed by you";
	} else {
		user.likedArtists.splice(index, 1);
		resMessage = "Removed from your following artist list";
	}

	await user.save();
	res.status(200).send({ message: resMessage });
});

// Get following artists
router.get("/like", auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	const artists = await Song.find({ _id: user.likedArtists });
	res.status(200).send({ data: artists });
});
module.exports = router;
