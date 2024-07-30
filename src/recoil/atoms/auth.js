import { atom } from 'recoil';
import TokenManager from './../../utils/TokenManager';

export const authState = atom({
	key: 'auth',
	default: {
		token: TokenManager.get(),
	},
});
