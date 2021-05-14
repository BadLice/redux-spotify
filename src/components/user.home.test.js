import { configureStore } from '@reduxjs/toolkit';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { config } from '../store';
import UserHome from './user.home';
import UserHomeArtists from './user.home.artists';
import UserHomePlaylists from './user.home.playlists';

let wrapper;
let store = configureStore(config);

beforeEach(() => {
	wrapper = mount(
		<Provider store={store}>
			<UserHome />
		</Provider>
	);
});

afterEach(() => {
	wrapper.unmount();
});

it('shows playlist and artis preview', () => {
	expect(wrapper.find(UserHomeArtists)).toHaveLength(1);
	expect(wrapper.find(UserHomePlaylists)).toHaveLength(1);
});
