import { configureStore } from '@reduxjs/toolkit';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { config } from '../store';
import PlaylistCard from './playlist.card';
import UserHomePlaylists from './user.home.playlists';

let wrapper;

afterEach(() => {
	wrapper.unmount();
});

it('correctly renders user playlists', () => {
	const store = configureStore({
		...config,
		preloadedState: {
			userPlaylists: {
				preview: [
					{ id: '1', owner: {} },
					{ id: '2', owner: {} },
					{ id: '3', owner: {} },
				],
			},
		},
	});
	wrapper = mount(
		<Provider store={store}>
			<UserHomePlaylists />
		</Provider>
	);

	expect(wrapper.find(PlaylistCard)).toHaveLength(3);
});
