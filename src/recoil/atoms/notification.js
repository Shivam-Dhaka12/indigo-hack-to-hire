import { atom } from 'recoil';

export const notificationState = atom({
	key: 'notification',
	default: [],
});
