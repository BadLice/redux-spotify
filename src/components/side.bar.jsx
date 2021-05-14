import {
	HomeOutlined,
	PlusOutlined,
	UnorderedListOutlined,
	VerticalLeftOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchUserPlaylistsPreview } from '../store/user.playlists';
import CreatePlaylistModal from './create.playlist.modal';

const SideBar = () => {
	const token = useSelector((state) => state.auth.token);
	const playlists = useSelector((state) => state.userPlaylists.preview);
	const total = useSelector((state) => state.userPlaylists.total);
	const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (token) {
			if (!playlists) {
				dispatch(fetchUserPlaylistsPreview(token));
			}
		}
	}, [dispatch, playlists, token]);

	const showAllPlaylists = () => {
		history.push('/user/playlists/1');
	};

	const showPlaylist = (id) => {
		history.push(`/playlist/${id}`);
	};

	const handleShowCreatePlaylist = () => {
		setShowCreatePlaylist(true);
	};

	const handleGoHome = () => {
		history.push('/');
	};

	return (
		<>
			<Sider
				style={{
					overflow: 'auto',
					height: '100vh',
					position: 'fixed',
					left: 0,
				}}
			>
				<Menu theme='dark' mode='inline'>
					<Menu.Item
						key='home'
						icon={<HomeOutlined />}
						onClick={handleGoHome}
					>
						Home
					</Menu.Item>
					<SubMenu
						key='playlists'
						icon={<UnorderedListOutlined />}
						title='Playlists'
					>
						<Menu.Item
							key='3'
							icon={<PlusOutlined />}
							onClick={handleShowCreatePlaylist}
						>
							Create a playlist
						</Menu.Item>
						{playlists &&
							playlists.map(({ id, name }) => (
								<Menu.Item
									key={id}
									onClick={() => showPlaylist(id)}
								>
									{name}
								</Menu.Item>
							))}
						{total && playlists && playlists.length < total && (
							<Menu.Item
								key='playlistsShowAll'
								icon={<VerticalLeftOutlined />}
								onClick={showAllPlaylists}
							>
								Show all
							</Menu.Item>
						)}
					</SubMenu>
				</Menu>
			</Sider>
			<CreatePlaylistModal
				visible={showCreatePlaylist}
				setVisible={setShowCreatePlaylist}
			/>
		</>
	);
};

export default SideBar;
