import { Col } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchUserPlaylistsPreview } from '../store/user.playlists';
import CardRow from './card.row';
import PlaylistCard from './playlist.card';

const UserHomePlaylists = () => {
	const token = useSelector((state) => state.auth.token);
	const playlists = useSelector((state) => state.userPlaylists.preview);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (token) {
			if (!playlists) {
				dispatch(fetchUserPlaylistsPreview(token));
			}
		}
	}, [dispatch, playlists, token]);

	const handleShowAll = () => {
		history.push('/user/playlists/1');
	};

	return (
		<>
			<CardRow title='Your playlists' showAll onShowAll={handleShowAll}>
				{playlists &&
					playlists.map((playlist) => (
						<Col key={playlist.id}>
							<PlaylistCard playlist={playlist} />
						</Col>
					))}
			</CardRow>
		</>
	);
};

export default UserHomePlaylists;
