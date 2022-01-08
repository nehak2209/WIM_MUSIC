import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

export const createArtist = async (artist, dispatch) => {
	dispatch(actions.createArtistStart());
	try {
		const { data } = await axiosInstance.post("/artists", artist);
		dispatch(actions.createArtistSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.createArtistFailure());
		return false;
	}
};

export const getAllArtists = async (dispatch) => {
	dispatch(actions.getAllArtistsStart());
	try {
		const { data } = await axiosInstance.get("/artists");
		dispatch(actions.getAllArtistsSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getAllArtistsFailure());
		return false;
	}
};

export const updateArtist = async (id, artist, dispatch) => {
	dispatch(actions.updateArtistStart());
	try {
		const { data } = await axiosInstance.put(`/artists/${id}`, artist);
		dispatch(actions.updateArtistSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.updateArtistFailure());
		return false;
	}
};

export const deleteArtist = async (id, dispatch) => {
	dispatch(actions.deleteArtistStart());
	try {
		const { data } = await axiosInstance.delete(`/artists/${id}`);
		dispatch(actions.deleteArtistSuccess(id));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.deleteArtistFailure());
		return false;
	}
};
