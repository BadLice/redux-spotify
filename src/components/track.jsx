import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { Button, Col, Image, Row } from 'antd';
import Item from 'antd/lib/list/Item';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import Audio from './audio';

const parseDate = (str) => {
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sept',
		'Oct',
		'Nov',
		'Dec',
	];

	let date = new Date(str);
	return `${date.getDate()} ${
		monthNames[date.getMonth()]
	} ${date.getFullYear()}`;
};

const msToTime = (duration) => {
	let milliseconds = Math.floor((duration % 1000) / 100),
		seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60);

	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;

	return minutes + ':' + seconds + '.' + milliseconds;
};

const Track = ({ track, queue, queueIndex }) => {
	return (
		<Item>
			<Row style={{ width: '100%' }} align='middle' gutter={16}>
				<Col span={2}>
					<Audio
						index={queueIndex}
						queue={queue}
						renderPlay={<Button icon={<CaretRightOutlined />} />}
						renderPause={<Button icon={<PauseOutlined />} />}
						size='large'
					/>
				</Col>
				<Col span={2}>
					<Image
						preview={false}
						width={64}
						src={
							track.track.album.images[
								track.track.album.images.length - 1
							] &&
							track.track.album.images[
								track.track.album.images.length - 1
							].url
						}
						fallback='/default.jpg'
					/>
				</Col>
				<Col span={5}>
					<Title level={5}>{track.track.name}</Title>
				</Col>
				<Col span={5}>
					<Title level={5} underline className='text-link'>
						{track.track.album.name}
					</Title>
				</Col>
				<Col span={6}>
					<Title level={5}>{parseDate(track.added_at)}</Title>
				</Col>
				<Col span={4}>
					<Title level={5}>{msToTime(track.track.duration_ms)}</Title>
				</Col>
			</Row>
		</Item>
	);
};

export default Track;
