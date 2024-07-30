import { NotificationAnimatedModal } from './NotificationAnimatedModal';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../components/ui/table';
import { ScrollArea } from '../components/ui/scrollarea';
import { useRecoilState } from 'recoil';
import { notificationState } from '../recoil/atoms/notification';
import { useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/atoms/auth';
import ShowAlert from '../hooks/useShowAlert';

export function NotificationTable() {
	const [notifications, setNotifications] = useRecoilState(notificationState);
	const authToken = useRecoilValue(authState).token;
	console.log(authToken);
	const showAlert = ShowAlert();

	useEffect(() => {
		async function fetchNotifications() {
			const url = '/api/protected/notifications';
			const completeUrl = `${import.meta.env.VITE_BACKEND_URL}${url}`;
			try {
				const response = await axios.get(completeUrl, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				});
				if (response) {
					console.log(response);
					setNotifications(response.data);
				}
			} catch (error) {
				showAlert({
					show: true,
					type: 'error',
					msg: 'Error fetching notifications',
				});
			}
		}

		fetchNotifications();
	}, []);
	return (
		<div className="border border-zinc-700 rounded-2xl p-4 md:p-8 flex items-center mt-4">
			<ScrollArea className="min-h-[24rem] w-[18rem] md:w-[40rem] lg:w-[50rem] rounded-md ">
				<Table>
					<TableCaption className="hidden md:table-caption">
						No more results
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Flight Id</TableHead>
							<TableHead className="hidden md:table-cell">
								Time
							</TableHead>
							<TableHead className="hidden md:table-cell">
								Status
							</TableHead>
							<TableHead className="text-center">Open</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{notifications.map((notification) => (
							<TableRow
								key={notification.flight_id + notification.id}
							>
								<TableCell className="font-medium">
									{notification.flight_id}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{new Date(
										notification.timestamp
									).toLocaleTimeString()}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{notification.status}
								</TableCell>
								<TableCell>
									<NotificationAnimatedModal
										notification={notification}
									></NotificationAnimatedModal>
								</TableCell>
							</TableRow>
						))}
						{/* <TableRow>
							<TableCell className="font-medium">
								INV001
							</TableCell>
							<TableCell className="hidden md:table-cell">
								12:00 PM
							</TableCell>
							<TableCell>
								<NotificationAnimatedModal></NotificationAnimatedModal>
							</TableCell>
						</TableRow> */}
					</TableBody>
				</Table>
			</ScrollArea>
		</div>
	);
}
