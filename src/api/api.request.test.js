import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import apiRequest from './api.request';

const dispatchMock = jest.fn();

beforeEach(() => {
	moxios.install();
});

afterEach(() => {
	moxios.uninstall();
});

describe('401 errror', () => {
	let mockStore;
	let store;
	beforeEach(() => {
		moxios.stubRequest('testError401', {
			status: 401,
			response: 'error401',
		});
		mockStore = configureMockStore([thunk]);
		store = mockStore({ auth: { token: null, user: null } });
	});

	it('correctly logs out on error 401', (done) => {
		apiRequest(store.dispatch, 'get', 'testError401').catch((error) => {
			const expectedActions = [
				{ type: 'auth/logout', payload: undefined },
			];
			const actions = store.getActions(expectedActions);
			expect(actions).toEqual(expectedActions);
			done();
		});
	});
});

describe('general error', () => {
	beforeEach(() => {
		moxios.stubRequest('testError', { status: 500, response: 'error' });
	});

	it('correctly throws error', (done) => {
		apiRequest(dispatchMock, 'get', 'testError').catch((error) => {
			expect(dispatchMock).toHaveBeenCalledTimes(0);
			expect(error).toBeInstanceOf(Error);
			done();
		});
	});
});

describe('success', () => {
	beforeEach(() => {
		moxios.stubRequest('testOk', { status: 200, response: 'ok' });
	});

	it('correctly executes get request', (done) => {
		apiRequest(dispatchMock, 'get', 'testOk').then(({ data }) => {
			moxios.wait(() => {
				expect(dispatchMock).toHaveBeenCalledTimes(0);
				expect(data).toEqual('ok');
				done();
			});
		});
	});

	it('correctly executes post request', (done) => {
		apiRequest(dispatchMock, 'post', 'testOk', { test: 'test data' }).then(
			({ data }) => {
				moxios.wait(() => {
					expect(dispatchMock).toHaveBeenCalledTimes(0);
					expect(data).toEqual('ok');
					done();
				});
			}
		);
	});

	it('correctly executes put request', (done) => {
		apiRequest(dispatchMock, 'put', 'testOk', { test: 'test data' }).then(
			({ data }) => {
				moxios.wait(() => {
					expect(dispatchMock).toHaveBeenCalledTimes(0);
					expect(data).toEqual('ok');
					done();
				});
			}
		);
	});

	it('correctly executes delete request', (done) => {
		apiRequest(dispatchMock, 'delete', 'testOk', {
			test: 'test data',
		}).then(({ data }) => {
			moxios.wait(() => {
				expect(dispatchMock).toHaveBeenCalledTimes(0);
				expect(data).toEqual('ok');
				done();
			});
		});
	});
});
