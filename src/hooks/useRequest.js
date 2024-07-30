import { useState } from 'react';
import axios, { isAxiosError } from 'axios';
import useShowAlert from './useShowAlert';

export function useRequest() {
	const showAlert = useShowAlert();
	const [loading, setLoading] = useState(false);

	const sendRequest = async (url, postInputs, successMsg, headers) => {
		setLoading(true);
		const completeUrl = `${import.meta.env.VITE_BACKEND_URL}${url}`;
		try {
			const response = await axios.post(completeUrl, postInputs, {
				headers,
			});

			if (successMsg) {
				showAlert({
					show: true,
					type: 'primary',
					msg: successMsg,
				});
			}

			return response;
		} catch (error) {
			let errorMsg = 'Something went wrong';
			console.log(error);
			if (isAxiosError(error)) {
				errorMsg = error.message + ': Server unreachable';
			}
			if (isAxiosError(error) && error.response) {
				errorMsg = error.response.data.message;
			}
			console.log(errorMsg);
			showAlert({
				show: true,
				type: 'error',
				msg: errorMsg,
			});
		} finally {
			setLoading(false);
		}
	};

	return { sendRequest, loading };
}
