import axios from 'axios';
import { authActions } from '../store/auth';

function executeFunctionByName(functionName, context /*, args */) {
	var args = Array.prototype.slice.call(arguments, 2);
	var namespaces = functionName.split('.');
	var func = namespaces.pop();
	for (var i = 0; i < namespaces.length; i++) {
		context = context[namespaces[i]];
	}
	return context[func].apply(context, args);
}

const apiRequest = async (dispatch, type, url, data) => {
	let response = null;
	try {
		response = await executeFunctionByName(type, axios, url, data);
	} catch (error) {
		response = error.response;
		if (response.status === 401) {
			dispatch(authActions.logout());
			throw new Error(response);
		}

		if (response.status !== 200 || response.status !== 201) {
			throw new Error(response);
		}
	}
	return response;
};

export default apiRequest;
