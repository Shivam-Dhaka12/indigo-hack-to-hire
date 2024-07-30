import { BackgroundBeams } from '../components/ui/background-beams';
import { SearchBar } from '../components/Searchbar';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import TokenManager from '../utils/TokenManager';
import { authState } from './../recoil/atoms/auth';
import { deleteSocketInstance } from '../utils/socketManager';
import useShowAlert from '../hooks/useShowAlert';

export function Hero({ isLoggedIn }) {
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
		<>
			<div>
				<div className="h-[40rem] flex flex-col justify-center  items-center px-4">
					<div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
						<h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
							Discover <br /> flights worldwide.
						</h1>
					</div>
					<SearchBar></SearchBar>
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
								{notificationCount > 0 &&
									`(${notificationCount})`}
							</Button>
						</div>
					)}
				</div>
			</div>
			<BackgroundBeams />
		</>
	);
}
