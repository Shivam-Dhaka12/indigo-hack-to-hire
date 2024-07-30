import { SearchBar } from '../components/Searchbar';
import { FlightTable } from '../components/FlightTable';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import TokenManager from '../utils/TokenManager';
import { authState } from './../recoil/atoms/auth';
import { deleteSocketInstance } from '../utils/socketManager';
import useShowAlert from '../hooks/useShowAlert';

export function Flights({ isLoggedIn }) {
	const navigate = useNavigate();
	const notificationCount = 0;

	const showAlert = useShowAlert();
	const [authstate, setAuthstate] = useRecoilState(authState);
	const authToken = authstate.token;
	if (!authToken || authToken === 'Invalid_Token') isLoggedIn = false;

	function handleLogout() {
		TokenManager.remove();
		setAuthstate({
			token: '',
		});
		deleteSocketInstance();
		showAlert({
			show: true,
			type: 'primary',
			msg: 'Logout Successful',
		});
		navigate('/');
	}

	return (
		<div className="flex-grow flex items-center justify-center">
			<div className="h-[36rem] md:h-[40rem] flex flex-col justify-center mt-[6rem] items-center px-4">
				<SearchBar className="mb-8"></SearchBar>
				{!isLoggedIn && (
					<div className="md:hidden flex mt-8 justify-center gap-2">
						<Button
							className={'text-white border-transparent'}
							onClick={() => navigate('/signup')}
						>
							Sing up
						</Button>
						<Button
							className={'text-black bg-white font-semibold'}
							onClick={() => navigate('/signin')}
						>
							Sign in
						</Button>
					</div>
				)}
				{isLoggedIn && (
					<div className="md:hidden flex mt-8 items-center justify-end gap-2 sm:gap-2 md:justify-end">
						<Button
							className={'text-white border-transparent'}
							onClick={handleLogout}
						>
							Logout
						</Button>
						<Button
							className={'text-black bg-white font-semibold'}
							onClick={() => navigate('/user/notifications')}
						>
							Notifications{' '}
							{notificationCount > 0 && `(${notificationCount})`}
						</Button>
					</div>
				)}
				<FlightTable></FlightTable>
			</div>
		</div>
	);
}
