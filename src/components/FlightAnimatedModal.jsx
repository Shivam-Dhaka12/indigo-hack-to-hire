import React from 'react';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalTrigger,
} from './ui/animated-modal';
import { authState } from '../recoil/atoms/auth';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useRequest } from '../hooks/useRequest';
import useShowAlert from '../hooks/useShowAlert';
import Loader from './Loader';

export function FlightAnimatedModal({ flight }) {
	const { sendRequest } = useRequest();
	const navigate = useNavigate();
	const showAlert = useShowAlert();
	const authToken = useRecoilValue(authState).token;
	const [subscribeState, setSubscribeState] = React.useState('Subscribe');
	let isLoggedIn = true;
	if (!authToken || authToken === 'Invalid_Token') isLoggedIn = false;

	async function handleSubscribe(flight_id) {
		const url = '/api/protected/subscriptions';
		try {
			const response = await sendRequest(
				url,
				{
					flight_id: flight_id + '',
				},
				'Subscription successful!',
				{
					Authorization: `Bearer ${authToken}`,
				}
			);
			if (response) {
				console.log(response);
				setSubscribeState('Subscribed ✈️');
			} else {
				setSubscribeState('');
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
	}
	return (
		<div className="flex items-center justify-center">
			<Modal>
				<ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
					<span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
						Subscribe
					</span>
					<div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
						✈️
					</div>
				</ModalTrigger>
				<ModalBody>
					<ModalContent>
						<h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
							Subscribe to get notified about this flight ✈️
						</h4>

						<div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
							<div className="flex  items-center justify-center">
								<PlaneIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
								<span className="text-neutral-700 dark:text-neutral-300 text-sm">
									Flight No: {flight.flight_id}
								</span>
							</div>
							<div className="flex items-center justify-center">
								<span className="text-neutral-700 dark:text-neutral-300 text-sm">
									Status: {flight.status}
								</span>
							</div>
							<div className="flex items-center justify-center">
								<span className="text-neutral-700 dark:text-neutral-300 text-sm">
									Airline: {flight.airline}
								</span>
							</div>
							<div className="flex items-center justify-center">
								<span className="text-neutral-700 dark:text-neutral-300 text-sm">
									Scheduled Departure:{' '}
									{new Date(
										flight.scheduled_departure
									).toLocaleTimeString('en-us', {
										hours: 'numeric',
										minutes: 'numeric',
									})}
								</span>
							</div>
							<div className="flex  items-center justify-center">
								<span className="text-neutral-700 dark:text-neutral-300 text-sm">
									Scheduled Arrival:{' '}
									{new Date(
										flight.scheduled_arrival
									).toLocaleTimeString({
										hours: 'numeric',
										minutes: 'numeric',
									})}
								</span>
							</div>

							<div className="flex items-center justify-center">
								<span className="text-neutral-700 dark:text-neutral-300 text-sm">
									Arrival Gate: {flight.arrival_gate}
								</span>
							</div>
							<div className="flex items-center justify-center">
								<span className="text-neutral-700 dark:text-neutral-300 text-sm">
									Departure Gate: {flight.departure_gate}
								</span>
							</div>
						</div>
					</ModalContent>
					<ModalFooter className="gap-4">
						{!isLoggedIn ? (
							<button
								className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-2 rounded-md border border-black w-36"
								onClick={() => navigate('/signin')}
							>
								Signin to Subscribe
							</button>
						) : (
							<button
								className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-2 rounded-md border border-black w-28"
								onClick={() =>
									handleSubscribe(flight.flight_id)
								}
							>
								{subscribeState}
							</button>
						)}
					</ModalFooter>
				</ModalBody>
			</Modal>
		</div>
	);
}

const PlaneIcon = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
		</svg>
	);
};
