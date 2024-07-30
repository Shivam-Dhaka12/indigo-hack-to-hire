import React from 'react';
import { NotificationTable } from '../components/NotificationTable';

export function Notifications() {
	return (
		<div>
			<div className="h-[30rem] md:h-[40rem] flex flex-col justify-center mt-[6rem] items-center px-4">
				<div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
					<h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
						Notifications
					</h1>
				</div>
				<NotificationTable></NotificationTable>
			</div>
		</div>
	);
}
