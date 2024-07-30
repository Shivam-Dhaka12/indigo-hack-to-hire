import { PlaceholdersAndVanishInput } from './ui/palceholders-and-vanish-input';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { flightState } from '../recoil/atoms/flight';
import { useRequest } from '../hooks/useRequest';
import useShowAlert from '../hooks/useShowAlert';

export function SearchBar() {
	const navigate = useNavigate();
	const showAlert = useShowAlert();
	const { sendRequest } = useRequest();
	const [flights, setFlights] = useRecoilState(flightState);

	const placeholders = [
		'Search by flight number',
		'Search by Airline',
		'Search by Arrival Gate',
		'Search by Departure Gate',
	];
	const url = '/api/flights';
	const handleChange = (e) => {
		setFlights((prev) => ({ ...prev, search: e.target.value }));
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await sendRequest(url, {
				searchParam: flights.search,
			});
			if (response) {
				console.log(response.data);
				const { flights } = response.data;
				setFlights((prev) => ({ ...prev, flights }));
				navigate('/flights');
			} else {
				showAlert({
					show: true,
					type: 'error',
					msg: 'Server unreachable',
				});
			}
		} catch (error) {
			showAlert({
				show: true,
				type: 'error',
				msg: error.message,
			});
		}
	};

	return (
		<PlaceholdersAndVanishInput
			placeholders={placeholders}
			onChange={handleChange}
			onSubmit={onSubmit}
			value={flights.search}
		/>
	);
}
