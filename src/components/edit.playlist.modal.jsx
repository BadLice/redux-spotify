import { Input, Modal, notification, Radio } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { playlistActions } from '../store/playlist';
import { editPlaylist, userPlaylistsActions } from '../store/user.playlists';

const EditPlaylistModal = ({ visible, setVisible, playlist }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const token = useSelector((state) => state.auth.token);
	const { success, error } = useSelector(
		(state) => state.userPlaylists.editResult
	);

	const [isLoading, setIsLoading] = useState(false);

	let [name, setName] = useState(playlist.name);
	let [description, setDescription] = useState(playlist.description);
	let [xpublic, setXpublic] = useState(playlist.public);

	const clearForm = useCallback(() => {
		setName(playlist.name);
		setDescription(playlist.description);
		setXpublic(playlist.public);
	}, [playlist.description, playlist.name, playlist.public]);

	const handleOk = () => {
		if (name && xpublic !== null) {
			setIsLoading(true);
			dispatch(
				editPlaylist({
					token,
					playlistId: playlist.id,
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

	useEffect(() => {
		if (error) {
			setIsLoading(false);
			clearForm();
		}
		if (success) {
			setIsLoading(false);
			setVisible(false);
			dispatch(
				playlistActions.setPlaylist({
					...playlist,
					name,
					description,
					publoc: xpublic,
				})
			);
			dispatch(
				userPlaylistsActions.setEditResult({
					success: false,
					error: false,
				})
			);
		}
	}, [
		clearForm,
		description,
		dispatch,
		error,
		history,
		name,
		playlist,
		setVisible,
		success,
		xpublic,
	]);

	return (
		<>
			<Modal
				title={`Edit details of ${playlist.name}`}
				okText='Save'
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

export default EditPlaylistModal;
