import { List } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchPlaylist, playlistActions } from '../store/playlist';
import ComponentLoader from './component.loader';
import PageLayout from './page.layout';
import PlayListHeader from './playlist.header';
import Track from './track';
import TrackListHeader from './track.list.header';

const PlayList = () => {
	const playlist = useSelector((state) => state.playlist.data);
	const token = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();
	const { id } = useParams();
	const queue = useMemo(
		() =>
			playlist
				? playlist.tracks.items.map(
						(track) => track.track.preview_url ?? null
				  )
				: [],
		[playlist]
	);

	useEffect(() => {
		if (token) {
			if (!playlist) {
				dispatch(fetchPlaylist(token, id));
			}
		}
		if (playlist) {
			return () => dispatch(playlistActions.setPlaylist(null));
		}
	}, [dispatch, id, playlist, token]);

	return (
		<PageLayout>
			<ComponentLoader on={!playlist}>
				{playlist && (
					<>
						<PlayListHeader playlist={playlist} />
						{playlist.tracks && playlist.tracks.items && (
							<List
								size='large'
								dataSource={playlist.tracks.items}
								renderItem={(track, i) => (
									<Track
										track={track}
										queue={queue}
										queueIndex={i}
									/>
								)}
								header={<TrackListHeader />}
							/>
						)}
					</>
				)}
			</ComponentLoader>
		</PageLayout>
	);
};

export default PlayList;
