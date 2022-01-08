import { createSlice } from "@reduxjs/toolkit";

export const artistsSlice = createSlice({
	name: "artists",
	initialState: {
		artists: [],
		createArtistProgress: false,
		getAllArtistsProgress: false,
		updateArtistProgress: false,
		deleteArtistProgress: false,
		error: false,
	},
	reducers: {
		createArtistStart: (state) => {
			state.createArtistProgress = true;
		},
		createArtistSuccess: (state, action) => {
			state.artists.push(action.payload);
			state.createArtistProgress = false;
		},
		createArtistFailure: (state) => {
			state.error = true;
			state.createArtistProgress = false;
		},

		getAllArtistStart: (state) => {
			state.getAllArtistsProgress = true;
		},
		getAllArtistSuccess: (state, action) => {
			state.artists = action.payload;
			state.getAllArtistsProgress = false;
		},
		getAllArtistFailure: (state) => {
			state.error = true;
			state.getAllArtistsProgress = false;
		},

		updateArtistStart: (state) => {
			state.updateArtistProgress = true;
		},
		updateArtistSuccess: (state, action) => {
			const index = state.artists.findIndex(
				(artist) => artist._id === action.payload._id
			);
			state.artists[index] = action.payload;
			state.updateArtistProgress = false;
		},
		updateArtistFailure: (state) => {
			state.error = true;
			state.updateArtistProgress = false;
		},

		deleteArtistStart: (state) => {
			state.deleteArtistProgress = true;
		},
		deleteArtistSuccess: (state, action) => {
			state.artists = state.artists.filter((artist) => artist._id !== action.payload);
			state.deleteArtistProgress = false;
		},
		deleteArtistFailure: (state) => {
			state.error = true;
			state.deleteArtistProgress = false;
		},
	},
});

export const {
	createArtistStart,
	createArtistSuccess,
	createArtistFailure,
	getAllArtistsStart,
	getAllArtistsSuccess,
	getAllArtistsFailure,
	updateArtistStart,
	updateArtistSuccess,
	updateArtistFailure,
	deleteArtistStart,
	deleteArtistSuccess,
	deleteArtistFailure,
} = artistsSlice.actions;

export default artistsSlice.reducer;
