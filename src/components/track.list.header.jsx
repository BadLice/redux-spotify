import { Affix, Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
const TrackListHeader = ({ ownerId }) => {
	const [affixed, setAffixed] = useState(false);

	const style = {
		backgroundColor: '#fafafa',
		height: 64,
		borderBottom: '1px solid #f0f0f0',
		marginRight: -30,
		marginLeft: -30,
	};
	const handleAffixed = (affixed) => {
		setAffixed(affixed);
	};
	return (
		<Affix offsetTop={64} onChange={handleAffixed}>
			<div style={affixed ? style : {}}>
				<Row
					align='middle'
					gutter={16}
					style={{ height: 64, paddingRight: 30, paddingLeft: 30 }}
				>
					<Col span={2}></Col>
					<Col span={2}></Col>
					<Col span={5}>
						<Title level={4}>Name</Title>
					</Col>
					<Col span={5}>
						<Title level={4}>Album</Title>
					</Col>
					<Col span={6}>
						<Title level={4}>Added at</Title>
					</Col>
					<Col span={4}>
						<Title level={4}>Duration</Title>
					</Col>
				</Row>
			</div>
		</Affix>
	);
};

export default TrackListHeader;
