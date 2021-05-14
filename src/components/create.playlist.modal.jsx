import { Input, Modal, notification, Radio } from 'antd';
import Text from 'antd/lib/typography/Text';
import { default as React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPlaylist } from '../store/user.playlists';

const CreatePlaylistModal = ({ visible, setVisible }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const token = useSelector((state) => state.auth.token);
	const userId = useSelector((state) =>
		state.auth.user ? state.auth.user.id : null
	);

	const success = useSelector((state) => state.userPlaylists.createSuccess);
	const error = useSelector((state) => state.userPlaylists.createError);

	const [isLoading, setIsLoading] = useState(false);

	let [name, setName] = useState('');
	let [description, setDescription] = useState('');
	let [xpublic, setXpublic] = useState(null);

	useEffect(() => {
		if (error) {
			setIsLoading(false);
			clearForm();
		}
		if (success) {
			setIsLoading(false);
			setVisible(false);
			clearForm();
			history.push(`/playlist/${success.id}`);
		}
	}, [error, history, setVisible, success]);

	const clearForm = () => {
		setName('');
		setDescription('');
		setXpublic(null);
	};

	const handleOk = () => {
		if (name && xpublic !== null) {
			setIsLoading(true);
			dispatch(
				createPlaylist({
					token,
					userId,
					name,
					description,
					xpublic,
				})
			);
		} else {
			notification.error({
				message: 'Cannot create playlist',
				description: 'Name and Visibility are required fields',
				placement: 'bottomRight',
			});
		}
	};

	const handleCancel = () => {
		clearForm();
		setVisible(false);
	};

	return (
		<>
			<Modal
				title='Create new playlist'
				okText='Create'
				visible={visible}
				onOk={handleOk}
				confirmLoading={isLoading}
				onCancel={handleCancel}
			>
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='Name'
					allowClear
				/>
				<br />
				<br />
				<Input.TextArea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder='Description'
					rows={4}
					allowClear
				/>
				<br />
				<br />
				<center>
					<Text>Visibility</Text>
					<br />
					<Radio.Group
						value={xpublic}
						onChange={(e) => setXpublic(Boolean(e.target.value))}
						buttonStyle='solid'
						defaultValue={true}
					>
						<Radio.Button value={true}>Public</Radio.Button>
						<Radio.Button value={false}>Private</Radio.Button>
					</Radio.Group>
				</center>
			</Modal>
		</>
	);
};

export default CreatePlaylistModal;
