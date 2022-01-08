const mongoose = require("mongoose");
const Joi = require("joi");

//const ObjectId = mongoose.Schema.Types.ObjectId;

const artistSchema = new mongoose.Schema({
	name: { type: String, required: true },
	desc: { type: String },
	songs: { type: Array, default: [] },
	img: { type: String },
});

const validate = (artist) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		desc: Joi.string().allow(""),
		songs:Joi.array().items(Joi.string()),
		img: Joi.string().allow(""),
	});
	return schema.validate(artist);
};

const Artist = mongoose.model("artist", artistSchema);

module.exports = { Artist, validate };