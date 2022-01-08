import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteArtist } from "../../../redux/artistsSlice/apiCalls";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	Paper,
	IconButton,
	CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.scss";

const ArtistTable = ({ artists }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	setTimeout(() => setLoading(false), 1000);

	const handleDelete = (id) => {
		deleteArtist(id, dispatch);
	};

	return (
		<TableContainer component={Paper} className={styles.table_container}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align="center">Image</TableCell>
						<TableCell align="center">Artist</TableCell>
						<TableCell align="center">Description</TableCell>
						<TableCell align="center">Actions</TableCell>
					</TableRow>
				</TableHead>
				{loading && (
					<TableBody>
						<TableRow>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="left">
								<CircularProgress
									style={{ color: "#1ed760", margin: "2rem 0" }}
								/>
							</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableBody>
				)}
				{!loading && (
					<TableBody>
						{artists.length !== 0 &&
							artists.map((artist, index) => (
								<TableRow key={artist._id}>
									<TableCell align="center">
										<img className={styles.artist_img} src={artist.img} alt="" />
									</TableCell>
									<TableCell align="center">{artist.name}</TableCell>
									<TableCell align="center">{artist.desc}</TableCell>
									<TableCell align="center">
										<Link to={`/artists/${artist._id}`}>
											<IconButton className={styles.edit_btn}>
												<EditIcon />
											</IconButton>
										</Link>
										<IconButton
											className={styles.delete_btn}
											onClick={() => handleDelete(artist._id)}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						{artists.length === 0 && (
							<TableRow>
								<TableCell align="center"></TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center">
									<img
										className={styles.no_data_img}
										src="./noData.svg"
										alt=""
									/>
								</TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						)}
					</TableBody>
				)}
			</Table>
		</TableContainer>
	);
};

export default ArtistTable;
