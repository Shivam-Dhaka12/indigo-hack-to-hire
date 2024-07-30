import { atom } from 'recoil';

export const alertState = atom({
	key: 'alert',
	default: {
		show: false,
		type: 'error',
		msg: 'This is an sample alert',
	},
});
