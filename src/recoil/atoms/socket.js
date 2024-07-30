import { atom } from 'recoil';

export const socketState = atom({
	key: 'socket',
	default: null,
});
