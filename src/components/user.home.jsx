import { Divider } from 'antd';
import React from 'react';
import PageLayout from './page.layout';
import UserHomeArtists from './user.home.artists';
import UserHomePlaylists from './user.home.playlists';

const UserHome = () => {
	return (
		<PageLayout>
			<UserHomePlaylists />
			<Divider />
			<UserHomeArtists />
		</PageLayout>
	);
};

export default UserHome;
