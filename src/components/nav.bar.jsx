import { Affix, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { useSelector } from 'react-redux';
import NavUserAvatar from './nav.user.avatar';

const NavBar = () => {
	const token = useSelector((state) => state.auth.token);

	const handleLogin = (e) => {
		window.location.href =
			'https://accounts.spotify.com/authorize?client_id=d4067b51bea74583907941e60c1a7780&response_type=token&redirect_uri=http://localhost:3000&scope=user-read-private user-read-email user-follow-read playlist-modify-public playlist-modify-private';
	};

	return (
		<Affix offsetTop={0}>
			<Header>
				<div className='logo' />
				{token ? (
					<NavUserAvatar />
				) : (
					<Menu
						className='navbar-menu'
						theme='dark'
						mode='horizontal'
						onClick={handleLogin}
					>
						<Menu.Item
							key='login'
							color='white'
							className='login-button'
							id='ciao'
						>
							Login
						</Menu.Item>
					</Menu>
				)}
			</Header>
		</Affix>
	);
};

export default NavBar;
