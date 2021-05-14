import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Card, Divider } from 'antd';
import Text from 'antd/lib/typography/Text';
// import parse from 'html-react-parser';
import React from 'react';
import { useHistory } from 'react-router-dom';

const { Meta } = Card;

const PlaylistCard = ({ playlist }) => {
	const { images, name, description, owner } = playlist;

	const history = useHistory();

	const handleClick = () => {
		history.push(`/playlist/${playlist.id}`);
	};
	return (
		<Card
			hoverable
			style={{ width: 240 }}
			cover={
				<img
					src={
						images && images[0]
							? images[0].url
							: 'https://picsum.photos/240'
					}
					alt='playlist'
					actions={[
						<SettingOutlined key='setting' />,
						<EditOutlined key='edit' />,
						<EllipsisOutlined key='ellipsis' />,
					]}
				/>
			}
			onClick={handleClick}
		>
			<Meta title={name} description={description} />
			<Divider />
			<Text className='text-link' underline>
				{owner.display_name}
			</Text>
		</Card>
	);
};

export default PlaylistCard;
