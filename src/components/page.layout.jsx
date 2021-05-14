import Layout, { Content } from 'antd/lib/layout/layout';
import React, { memo } from 'react';
import NavBar from './nav.bar';
import Player from './player';
import SideBar from './side.bar';

const PageLayout = ({ children }) => {
	return (
		<>
			<Layout className=''>
				<SideBar />
			</Layout>
			<Layout className='layout' style={{ marginLeft: 200 }}>
				<NavBar />
				<Content>
					<div className='site-layout-content'>{children}</div>
				</Content>
				<Player />
			</Layout>
		</>
	);
};

export default memo(PageLayout);
