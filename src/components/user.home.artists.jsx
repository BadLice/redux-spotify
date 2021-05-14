import { Col } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserArtists } from '../store/user.artists';
import ArtistCard from './artist.card';
import CardRow from './card.row';

const UserHomeArtists = () => {
	const token = useSelector((state) => state.auth.token);
	const artists = useSelector((state) => state.userArtists.artists);
	const dispatch = useDispatch();

	useEffect(() => {
		if (token) {
			if (!artists || artists.length !== 7) {
				dispatch(fetchUserArtists(token));
			}
		}
	});

	return (
		<CardRow title='You are following' showAll>
			{artists &&
				artists.map((artist) => (
					<Col key={artist.id}>
						<ArtistCard artist={artist} />
					</Col>
				))}
		</CardRow>
	);
};

export default UserHomeArtists;
