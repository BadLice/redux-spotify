import { UserOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../store/auth';

const NavUserAvatar = () => {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleLogout = () => {
		dispatch(authActions.logout());
		history.push('/');
	};

	const UserPopover = () => {
		return (
			<div>
				<p>{user.email}</p>
				<p>{user.id}</p>
				<p>Followers: {user.followers.total}</p>
				<Button block ghost onClick={handleLogout}>
					Logout
				</Button>
			</div>
		);
	};

	return (
		<>
			{user && (
				<Popover content={UserPopover} title={user.display_name}>
					<Avatar
						size={55}
						icon={<UserOutlined />}
						src={
							user.images && user.images[0].url
								? user.images[0].url
								: null
						}
						className='nav-user-avatar'
					/>
				</Popover>
			)}
		</>
	);
};

export default NavUserAvatar;
