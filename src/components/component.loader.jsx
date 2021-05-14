import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const ComponentLoader = ({ children, on, rest }) => {
	return (
		<>
			{on ? (
				<center style={{ height: 753, paddingTop: 300 }}>
					<Spin
						indicator={
							<Loading3QuartersOutlined
								style={{ fontSize: 50 }}
								spin
							/>
						}
					/>
				</center>
			) : (
				React.Children.toArray(children).map((child) =>
					React.cloneElement(child, rest)
				)
			)}
		</>
	);
};

export default ComponentLoader;
