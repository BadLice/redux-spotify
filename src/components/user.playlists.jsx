import { Col, Divider } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
	fetchUserPlaylists,
	userPlaylistsActions,
} from '../store/user.playlists';
import CardRow from './card.row';
import ComponentLoader from './component.loader';
import CustomPagination from './custom.pagination';
import PageLayout from './page.layout';
import PlaylistCard from './playlist.card';

const UserPlaylists = () => {
	const token = useSelector((state) => state.auth.token);
	const playlists = useSelector((state) => state.userPlaylists.playlists);
	const total = useSelector((state) => state.userPlaylists.total);
	const dispatch = useDispatch();
	const { pageNumber } = useParams();
	const limit = 21;

	useEffect(() => {
		if (token) {
			if (!playlists) {
				dispatch(
					fetchUserPlaylists(token, limit, (pageNumber - 1) * limit)
				);
			}
		}
	}, [dispatch, pageNumber, playlists, token]);

	return (
		<PageLayout>
			<ComponentLoader on={!playlists}>
				<>
					<CardRow title='Your playlists'>
						{playlists &&
							playlists.map((playlist) => (
								<Col key={playlist.id}>
									<PlaylistCard playlist={playlist} />
								</Col>
							))}
					</CardRow>
					<Divider />
					<CustomPagination
						rootPath='/user/playlists'
						pageNumber={pageNumber}
						total={total}
						limit={limit}
						restoreFunction={userPlaylistsActions.setPlaylists(
							null
						)}
					/>
				</>
			</ComponentLoader>
		</PageLayout>
	);
};

export default UserPlaylists;
