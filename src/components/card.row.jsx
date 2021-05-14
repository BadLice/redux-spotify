import { Col, Row, Typography } from 'antd';
import React from 'react';

const CardRow = ({ children, showAll, title, onShowAll }) => {
	return (
		<Row gutter={[27, 16]}>
			{title && (
				<Col span={showAll ? 22 : 24}>
					<Typography.Title level={3}>{title}</Typography.Title>
				</Col>
			)}
			{showAll && (
				<Col span={2}>
					<Typography.Title
						onClick={onShowAll}
						className='text-link'
						type='secondary'
						level={5}
						underline
					>
						Show all
					</Typography.Title>
				</Col>
			)}
			{children}
		</Row>
	);
};
export default CardRow;
