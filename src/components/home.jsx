import { Breadcrumb } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react';
import Footer from './footer';
import NavBar from './nav.bar';

const Home = () => {
	return (
		<Layout className='layout'>
			<NavBar />
			<Content style={{ padding: '0 50px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<div className='site-layout-content'>Content</div>
			</Content>
			<Footer />
		</Layout>
	);
};

export default Home;
