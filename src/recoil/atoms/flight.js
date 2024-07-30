import { atom } from 'recoil';

export const flightState = atom({
	key: 'flight',
	default: {
		search: '',
		flights: [],
	},
});
