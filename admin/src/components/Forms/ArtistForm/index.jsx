import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
//import { createSong, updateSong } from "../../../redux/songsSlice/apiCalls";
import {createArtist, updateArtist} from "../../../redux/artistsSlice/apiCalls";
import { toast } from "react-toastify";
import Joi from "joi";
import TextField from "../../Inputs/TextField";
import FileInput from "../../Inputs/FileInput";
import Button from "../../Button";
import { Paper } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ImageIcon from "@mui/icons-material/Image";
import styles from "./styles.module.scss";

const ArtistForm = () => {
	const [data, setData] = useState({
		name: "",
		desc: "",
        song: null,
		img: null,
		
	});
	const [errors, setErrors] = useState({ name: "", desc: "" });
	const { artists, createArtistProgress, updateArtistProgress } = useSelector(
		(state) => state.artists
	);
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const artist = artists.filter((artist) => artist._id === id);
		if (id !== "new" && artist[0]) {
			setData({
				name: artist[0].name,
				desc: artist[0].artist,
				song: artist[0].song,
				img: artist[0].img,
			});
		}
	}, [id, artists]);

	const schema = {
		name: Joi.string().required().label("Name"),
		desc: Joi.string().required().label("Description"),
		song: Joi.string().required().label("Song"),
        img: Joi.string().required().label("Image"),
	};

	const handleInputState = (name, value) => {
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const handleErrorState = (name, value) => {
		setErrors((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { error } = Joi.object(schema).validate(data);
		if (!error) {
			if (id === "new") {
				const res = await createArtist(data, dispatch);
				res && history.push("/artists");
			} else {
				const res = await updateArtist(id, data, dispatch);
				res && history.push("/artists");
			}
		} else {
			toast.error(error.message);
		}
	};

	return (
		<div className={styles.container}>
			<Paper className={styles.form_container}>
				<h1 className={styles.heading}>
					{id === "new" ? "Add New Artist" : "Edit Artist"} <MusicNoteIcon />
				</h1>
				<form onSubmit={handleSubmit}>
					<div className={styles.input_container}>
						<TextField
							name="name"
							label="Enter artist name"
							handleInputState={handleInputState}
							handleErrorState={handleErrorState}
							schema={schema.name}
							error={errors.name}
							value={data.name}
							required={true}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							name="desc"
							label="Description"
							handleInputState={handleInputState}
							required={true}
							value={data.desc}
							handleErrorState={handleErrorState}
							schema={schema.desc}
							error={errors.desc}
						/>
					</div>
					<div className={styles.file_container}>
						<FileInput
							label="Choose song"
							icon={<MusicNoteIcon />}
							type="audio"
							name="song"
							handleInputState={handleInputState}
							value={data.song}
						/>
					</div>
					<div className={styles.file_container}>
						<FileInput
							label="Choose image"
							icon={<ImageIcon />}
							type="image"
							name="img"
							value={data.img}
							handleInputState={handleInputState}
						/>
					</div>
					<Button
						type="submit"
						label={id === "new" ? "Submit" : "Update"}
						isFetching={id === "new" ? createArtistProgress : updateArtistProgress}
						style={{ marginLeft: "auto" }}
					/>
				</form>
			</Paper>
		</div>
	);
};

export default ArtistForm;
