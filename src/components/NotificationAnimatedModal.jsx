import { useState } from 'react';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalTrigger,
} from './ui/animated-modal';
import { useRequest } from '../hooks/useRequest';
import { authState } from '../recoil/atoms/auth';
import { useRecoilValue } from 'recoil';
import useShowAlert from '../hooks/useShowAlert';

export function NotificationAnimatedModal({ notification }) {
	const [statusState, setStatusState] = useState('Mark as read');
	const { sendRequest, loading } = useRequest();
	const showAlert = useShowAlert();
	const authToken = useRecoilValue(authState).token;
	async function handleMarkAsRead(notification) {
		const url = '/api/protected/notifications/update-as-read';
		try {
			const response = await sendRequest(
				url,
				{
					id: notification.id,
				},
				'Successfully marked as read',
				{
					Authorization: `Bearer ${authToken}`,
				}
			);
			if (response) {
				console.log(response);
				setStatusState('Done ✈️');
			} else {
				setStatusState('Error ❌');
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
						Open
					</span>
					<div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
						📂
					</div>
				</ModalTrigger>
				<ModalBody>
					<ModalContent>
						<h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
							Flight ID: {notification.flight_id}
						</h4>

						<div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
							<div className="flex  items-center justify-center">
								<span className="text-neutral-700 dark:text-neutral-300 text-sm">
									Time: {notification.time}
								</span>
							</div>
							<div className="flex text-start">
								<span className="text-neutral-700 dark:text-neutral-300 text-sm">
									Message: {notification.message}
								</span>
							</div>
						</div>
					</ModalContent>
					<ModalFooter className="gap-4">
						{notification.status === 'unread' && (
							<button
								className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-2 rounded-md border border-black w-32"
								onClick={() => handleMarkAsRead(notification)}
							>
								{statusState}
							</button>
						)}
					</ModalFooter>
				</ModalBody>
			</Modal>
		</div>
	);
}
