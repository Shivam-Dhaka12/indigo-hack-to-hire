// import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import Alert from './Alert';
import { useRecoilValue, useRecoilState } from 'recoil';
import TokenManager from '../utils/TokenManager';
import { alertState } from './../recoil/atoms/alert';
import { authState } from './../recoil/atoms/auth';
import { deleteSocketInstance } from '../utils/socketManager';
import useShowAlert from '../hooks/useShowAlert';

export function Layout({ isLoggedIn, children }) {
	const navigate = useNavigate();
	const notificationCount = 0;

	const showAlert = useShowAlert();
	const alert = useRecoilValue(alertState);
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
		<div className="bg-zinc-950 h-screen overflow-y-hidden">
			{/*navbar*/}
			<div className="z-[50] fixed top-0 w-full bg-zinc-950 border-b border-transparent">
				<div className="px-8 flex h-16 items-center max-w-[88rem] mx-auto">
					<div className="mr-4 flex">
						<a
							className="flex items-center justify-center space-x-2 text-2xl font-bold py-6 text-center text-gray-100  md:mr-10"
							navigate="/"
						>
							<div
								className="flex flex-col cursor-pointer"
								onClick={() => navigate('/')}
							>
								<h1 className="text-black dark:text-white font-sans">
									{' '}
									Flights{' '}
									<span className="inline-block md:inline text-sm font-light text-gray-400">
										by Indigo
									</span>
								</h1>
							</div>
						</a>
					</div>

					{isLoggedIn && (
						<div className="hidden md:flex flex-1 items-center justify-end gap-2 sm:gap-2 md:justify-end">
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
					{!isLoggedIn && (
						<div className="hidden md:flex flex-1 items-center justify-end gap-2 sm:gap-2 md:justify-end">
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
					{alert.show && <Alert />}
				</div>
			</div>
			{/*main content*/}
			<div className="flex-grow flex items-center justify-center">
				{children}
			</div>
		</div>
	);
}
