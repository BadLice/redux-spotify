import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import moxios from 'moxios';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from '../../App';
import store from '../../store';

let wrapper;
const token =
	'BQBsYtxsd1WczaT5_OoKuZYsrX3zndTGEXSCqWopQC1OKaQEglO9C3XfY3I3TJjHgv_1KY8wtg66ynq7hbtjEBsvoNT7DkzqGrWglQ2s7wYrST9HRMrqqHetm1Mp72SC-xlA_mT3R19JM3z03FNCUASfMXHhZfMxE_WL6EESL7ozzYgXmiVkix18u4N-Vf4cM---W0k4VWJp3Yx9F6OHzRwFkzRaU3TEXqnqSw';
const history = createMemoryHistory();

describe('not authenticated', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetAllMocks();
		jest.mock('react-router-dom', () => ({
			...jest.requireActual('react-router-dom'),
			useLocation: () => ({
				hash: '',
				pathname: '/',
				search: '',
				state: undefined,
			}),
			useParams: () => ({}),
			useHistory: () => ({}),
		}));
	});

	afterEach(() => {
		//cleanup
		wrapper.unmount();
	});

	it('shows login button when not authenticated', () => {
		history.push('/');
		wrapper = mount(
			<Provider store={store}>
				<Router history={history}>
					<App />
				</Router>
			</Provider>
		);

		expect(wrapper.find('li.login-button').length).toEqual(1);
	});
});

describe('authenticated', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetAllMocks();
		jest.mock('react-router-dom', () => ({
			...jest.requireActual('react-router-dom'),
			useLocation: () => ({
				hash: `#access_token=BQBsYtxsd1WczaT5_OoKuZYsrX3zndTGEXSCqWopQC1OKaQEglO9C3XfY3I3TJjHgv_1KY8wtg66ynq7hbtjEBsvoNT7DkzqGrWglQ2s7wYrST9HRMrqqHetm1Mp72SC-xlA_mT3R19JM3z03FNCUASfMXHhZfMxE_WL6EESL7ozzYgXmiVkix18u4N-Vf4cM---W0k4VWJp3Yx9F6OHzRwFkzRaU3TEXqnqSw&token_type=Bearer&expires_in=3600`,
				pathname: `/#access_token=BQBsYtxsd1WczaT5_OoKuZYsrX3zndTGEXSCqWopQC1OKaQEglO9C3XfY3I3TJjHgv_1KY8wtg66ynq7hbtjEBsvoNT7DkzqGrWglQ2s7wYrST9HRMrqqHetm1Mp72SC-xlA_mT3R19JM3z03FNCUASfMXHhZfMxE_WL6EESL7ozzYgXmiVkix18u4N-Vf4cM---W0k4VWJp3Yx9F6OHzRwFkzRaU3TEXqnqSw&token_type=Bearer&expires_in=3600`,
				search: '',
				state: undefined,
			}),
			useParams: () => ({}),
			useHistory: () => ({}),
		}));

		moxios.install();

		//fake all requests at url http://jsonplaceholder.typicode.com/comments
		moxios.stubRequest(
			`https://api.spotify.com/v1/me?access_token=${token}`,
			//this is the response that will be sent to axios
			{
				status: 200,
				response: {
					email: 'test@test.it',
					id: 'test',
					display_name: 'Test Name',
					followers: { total: 50 },
				},
			}
		);

		history.push(
			'/#access_token=BQBsYtxsd1WczaT5_OoKuZYsrX3zndTGEXSCqWopQC1OKaQEglO9C3XfY3I3TJjHgv_1KY8wtg66ynq7hbtjEBsvoNT7DkzqGrWglQ2s7wYrST9HRMrqqHetm1Mp72SC-xlA_mT3R19JM3z03FNCUASfMXHhZfMxE_WL6EESL7ozzYgXmiVkix18u4N-Vf4cM---W0k4VWJp3Yx9F6OHzRwFkzRaU3TEXqnqSw&token_type=Bearer&expires_in=3600'
		);
	});

	afterEach(() => {
		//cleanup
		moxios.uninstall();
		wrapper.unmount();
	});

	it('shows user data when authenticated', (done) => {
		wrapper = mount(
			<Provider store={store}>
				<Router history={history}>
					<App />
				</Router>
			</Provider>
		);

		//wait for the response -> useful because moxios responses are asyncronous so we need to wait a bit before the response is listened and the state is updated
		moxios.wait(() => {
			wrapper.update(); //force component rerender to update the state

			expect(wrapper.find('li.login-button').length).toEqual(0);
			expect(wrapper.find('span.nav-user-avatar').length).toEqual(1);

			done(); //default test funcion used in setTimeout to notify the test environment that the test is finished -> the test will not be completed until we call this function
		});
	});
});
