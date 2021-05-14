import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Card, Divider } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

const { Meta } = Card;

const ArtistCard = ({ artist }) => {
	const { images, name, followers, genres } = artist;
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
		>
			<Meta
				title={name}
				description={
					genres &&
					genres
						.map((g) => `${g}, `)
						.join('')
						.slice(0, -2)
				}
			/>
			<Divider />
			<Text>
				Followers: <Text type='success'>{followers.total}</Text>
			</Text>
		</Card>
	);
};

export default ArtistCard;
