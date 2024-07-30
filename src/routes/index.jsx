import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { Hero } from '../pages/Hero';
import { Layout } from '../components/Layout';
import { SigninForm } from '../components/SigninForm';
import { SignupForm } from '../components/SignupForm';
import { Flights } from '../pages/Flights';
import { Notifications } from '../pages/Notifications';

const Router = ({ isLoggedIn }) => {
	return useRoutes([
		{
			path: '/',
			element: (
				<Layout isLoggedIn={isLoggedIn}>
					<Outlet />
				</Layout>
			),
			children: [
				{ path: '', element: <Hero isLoggedIn={isLoggedIn} /> },
				{
					path: 'signin',
					element: isLoggedIn ? <Navigate to="/" /> : <SigninForm />,
				},
				{
					path: 'signup',
					element: isLoggedIn ? <Navigate to="/" /> : <SignupForm />,
				},
				{
					path: 'flights',
					element: <Flights isLoggedIn={isLoggedIn} />,
				},
				{
					path: 'user',
					element: isLoggedIn ? (
						<Outlet />
					) : (
						<Navigate to="/signin" />
					),
					children: [
						{
							path: 'notifications',
							element: <Notifications />,
						},
					],
				},
				// // below are testing routes, without auth
				// { path: 'room', element: <JoinRoom /> },
				// { path: 'game/:roomId', element: <Game /> },

				// {
				// 	path: '*',
				// 	element: <PageNotFound />,
				// },
			],
		},
	]);
};

export default Router;
