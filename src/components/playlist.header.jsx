import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Image, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditPlaylistModal from './edit.playlist.modal';

const PlayListHeader = ({ playlist }) => {
	const {
		images,
		name,
		description,
		owner,
		followers,
		tracks,
		collaborative,
		public: xpublic,
	} = playlist;

	const userId = useSelector((state) =>
		state.auth.user ? state.auth.user.id : null
	);
	const canEdit = owner.id === userId;

	const [showEditModal, setShowEditModal] = useState(false);

	const handleEdit = () => {
		setShowEditModal(true);
	};

	return (
		<>
			<Row align='bottom' style={{ marginBottom: 20 }}>
				<Col span={5}>
					<Image
						width={240}
						src={images && images[0] ? images[0].url : ''}
						fallback='/default.jpg'
					/>
				</Col>
				<Col span={19}>
					<Title level={1}>
						{canEdit && (
							<Button
								icon={<EditOutlined />}
								type='dashed'
								shape='circle'
								className='playlist-edit-button'
								onClick={handleEdit}
							/>
						)}
						{name}
					</Title>
					{description && (
						<Title level={3}>
							{canEdit && (
								<Button
									icon={<EditOutlined />}
									type='dashed'
									shape='circle'
									className='playlist-edit-button'
									onClick={handleEdit}
								/>
							)}
							{description}
						</Title>
					)}
					<Title level={5} className='text-link' underline>
						{owner.display_name}
					</Title>
					<Title level={5}>{xpublic ? 'Public' : 'Private'}</Title>
					<Title level={5}>
						{followers.total} followers - {tracks.total} tracks
					</Title>
					{collaborative && (
						<Title level={4} type='success'>
							COLLABORATIVE PLAYLIST
						</Title>
					)}
				</Col>
			</Row>
			{playlist && (
				<EditPlaylistModal
					visible={showEditModal}
					setVisible={setShowEditModal}
					playlist={playlist}
				/>
			)}
		</>
	);
};

export default PlayListHeader;
