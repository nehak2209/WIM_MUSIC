import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import SongTable from "../../components/Tables/SongTable";
import ArtistTable from "../../components/Tables/ArtistTable";
import Button from "../../components/Button";
import AddIcon from "@mui/icons-material/Add";
//import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./styles.module.scss";

const Artists = () => {
	const { artists } = useSelector((state) => state.artists);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>
					Artists <PersonIcon />
				</h1>
				<Link to="/artists/new">
					<Button startIcon={<AddIcon />} label="Add New Artist" />
				</Link>
			</div>
			<ArtistTable artists={artists} />
		</div>
	);
};

export default Artists;
