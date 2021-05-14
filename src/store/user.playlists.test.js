import { notification } from 'antd';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	createPlaylist,
	editPlaylist,
	fetchUserPlaylists,
	fetchUserPlaylistsPreview,
} from './user.playlists';

let mockStore;
jest.mock('antd', () => ({
	notification: { error: jest.fn() },
}));

beforeEach(() => {
	mockStore = configureMockStore([thunk]);
	moxios.install();
});

afterEach(() => {
	moxios.uninstall();
});

describe('playlist preview', () => {
	let testResponse;
	let initialState;
	let store;

	beforeEach(() => {
		testResponse = {
			items: [{ id: 'test1' }, { id: 'test2' }, { id: 'test3' }],
			total: 3,
		};

		initialState = {
			preview: null,
			total: null,
		};

		store = mockStore(initialState);
		store.dispatch(fetchUserPlaylistsPreview());
	});

	it('shows error notification', (done) => {
		moxios.wait(() => {
			let request = moxios.requests.mostRecent();
			request
				.respondWith({
					status: 500,
					response: testResponse,
				})
				.then(() => {
					expect(notification.error).toHaveBeenCalledTimes(1);
					done();
				});
		});
	});
	it('correctly fetches', (done) => {
		const expectedActions = [
			{
				type: 'userPlaylists/setPreview',
				payload: testResponse.items,
			},
			{
				type: 'userPlaylists/setTotal',
				payload: testResponse.total,
			},
		];
		moxios.wait(() => {
			let request = moxios.requests.mostRecent();

			request
				.respondWith({
					status: 200,
					response: testResponse,
				})
				.then(() => {
					const actions = store.getActions();
					expect(actions).toEqual(expectedActions);
					done();
				});
		});
	});
});

describe('user playlist', () => {
	let testResponse;
	let initialState;
	let store;

	beforeEach(() => {
		testResponse = {
			items: [{ id: 'test1' }, { id: 'test2' }, { id: 'test3' }],
			total: 3,
		};

		initialState = {
			playlists: null,
			total: null,
		};

		store = mockStore(initialState);
		store.dispatch(fetchUserPlaylists());
	});

	it('correctly fetches', (done) => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request
				.respondWith({
					status: 201,
					response: testResponse,
				})
				.then(() => {
					const expectedActions = [
						{
							type: 'userPlaylists/setPlaylists',
							payload: testResponse.items,
						},
						{
							type: 'userPlaylists/setTotal',
							payload: testResponse.total,
						},
					];
					const actions = store.getActions();
					expect(actions).toEqual(expectedActions);
					done();
				});
		});
	});

	it('shows error notification', (done) => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request
				.respondWith({
					status: 403,
					response: testResponse,
				})
				.then(() => {
					expect(notification.error).toHaveBeenCalledTimes(1);
					done();
				});
		});
	});
});

describe('create playlist', () => {
	let testResponse;
	let initialState;
	let store;

	beforeEach(() => {
		testResponse = {
			id: 'test',
		};

		initialState = {
			playlists: null,
			total: null,
		};

		store = mockStore(initialState);
		store.dispatch(
			createPlaylist({
				token: 'test',
				userId: 'test',
				name: 'test',
				description: 'test',
				xpublic: true,
			})
		);
	});

	it('correctly creates', (done) => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request
				.respondWith({
					status: 201,
					response: testResponse,
				})
				.then(() => {
					const expectedActions = [
						{
							type: 'userPlaylists/setCreateResult',
							payload: {
								success: false,
								error: false,
							},
						},
						{
							type: 'userPlaylists/setCreateResult',
							payload: {
								success: testResponse,
								error: false,
							},
						},
					];
					const actions = store.getActions();
					expect(actions).toEqual(expectedActions);
					done();
				});
		});
	});

	it('shows error notification', (done) => {
		const expectedActions = [
			{
				type: 'userPlaylists/setCreateResult',
				payload: {
					success: false,
					error: false,
				},
			},
			{
				type: 'userPlaylists/setCreateResult',
				payload: {
					success: false,
					error: true,
				},
			},
		];
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request
				.respondWith({
					status: 403,
					response: testResponse,
				})
				.then(() => {
					const actions = store.getActions();
					expect(actions).toEqual(expectedActions);
					expect(notification.error).toHaveBeenCalledTimes(1);
					done();
				});
		});
	});
});

describe('edit playlist', () => {
	let testResponse;
	let initialState;
	let store;

	beforeEach(() => {
		testResponse = {
			id: 'test',
		};

		initialState = {
			playlists: null,
			total: null,
		};

		store = mockStore(initialState);
		store.dispatch(
			editPlaylist({
				token: 'test',
				userId: 'test',
				name: 'test',
				description: 'test',
				xpublic: true,
			})
		);
	});

	it('correctly edit', (done) => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request
				.respondWith({
					status: 201,
					response: testResponse,
				})
				.then(() => {
					const expectedActions = [
						{
							type: 'userPlaylists/setEditResult',
							payload: {
								success: false,
								error: false,
							},
						},
						{
							type: 'userPlaylists/setEditResult',
							payload: {
								success: true,
								error: false,
							},
						},
					];
					const actions = store.getActions();
					expect(actions).toEqual(expectedActions);
					done();
				});
		});
	});

	it('shows error notification', (done) => {
		const expectedActions = [
			{
				type: 'userPlaylists/setEditResult',
				payload: {
					success: false,
					error: false,
				},
			},
			{
				type: 'userPlaylists/setEditResult',
				payload: {
					success: false,
					error: true,
				},
			},
		];
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request
				.respondWith({
					status: 403,
					response: testResponse,
				})
				.then(() => {
					const actions = store.getActions();
					expect(actions).toEqual(expectedActions);
					expect(notification.error).toHaveBeenCalledTimes(1);
					done();
				});
		});
	});
});
