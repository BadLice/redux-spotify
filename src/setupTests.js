import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// Object.defineProperty(window, 'matchMedia', {
// 	writable: true,
// 	value: jest.fn().mockImplementation((query) => ({
// 		matches: false,
// 		media: query,
// 		onchange: null,
// 		addListener: jest.fn(), // deprecated
// 		removeListener: jest.fn(), // deprecated
// 		addEventListener: jest.fn(),
// 		removeEventListener: jest.fn(),
// 		dispatchEvent: jest.fn(),
// 	})),
// });

global.matchMedia =
	global.matchMedia ||
	function () {
		return {
			matches: false,
			addListener: jest.fn(),
			removeListener: jest.fn(),
		};
	};
