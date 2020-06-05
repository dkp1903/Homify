import { AUTH } from '../actions/types';

const initialState = {
	isAuthenticated: false,
	user: {}
}

export default function (state = initialState, action) {
	switch(action.type) {
		case AUTH.SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: true,
				user: action.user
			}
		case AUTH.LOGOUT:
			return initialState;
		default:
			return initialState;
	}

}