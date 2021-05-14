import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import playerSlice from './player';
import playlistSlice from './playlist';
import userArtistsSlice from './user.artists';
import userPlaylistsSlice from './user.playlists';

const config = {
	reducer: {
		auth: authSlice.reducer,
		userPlaylists: userPlaylistsSlice.reducer,
		userArtists: userArtistsSlice.reducer,
		playlist: playlistSlice.reducer,
		player: playerSlice.reducer,
	},
};

const store = configureStore(config);

export { config };
export default store;
