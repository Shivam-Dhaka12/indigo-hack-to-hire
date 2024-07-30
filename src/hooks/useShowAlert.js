import { useSetRecoilState } from 'recoil';
import { alertState } from './../recoil/atoms/alert';

export default function useShowAlert() {
	const setAlert = useSetRecoilState(alertState);

	return ({ type, msg }) => {
		// Set the new alert
		setAlert({
			show: true,
			type,
			msg,
		});
	};
}
