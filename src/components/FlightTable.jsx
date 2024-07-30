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
import { FlightAnimatedModal } from './FlightAnimatedModal';
import { flightState } from './../recoil/atoms/flight';
import { useRecoilValue } from 'recoil';

export function FlightTable() {
	const flights = useRecoilValue(flightState);

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
								Status
							</TableHead>
							<TableHead className="hidden md:table-cell">
								Arr. Gate
							</TableHead>
							<TableHead className="hidden md:table-cell">
								Dep. Gate
							</TableHead>
							<TableHead className="hidden md:table-cell">
								Arrival
							</TableHead>
							<TableHead className="hidden md:table-cell">
								Departure
							</TableHead>
							<TableHead className="text-center">
								Subscribe
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{flights.flights.map((flight) => (
							<TableRow key={flight.flight_id}>
								<TableCell>{flight.flight_id}</TableCell>
								<TableCell className="hidden md:table-cell">
									{flight.status}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{flight.arrival_gate}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{flight.departure_gate}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{new Date(
										flight.scheduled_arrival
									).toLocaleTimeString('en-US', {
										hour: 'numeric',
										minute: 'numeric',
									})}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{new Date(
										flight.scheduled_departure
									).toLocaleTimeString('en-US', {
										hour: 'numeric',
										minute: 'numeric',
									})}
								</TableCell>

								<TableCell className="text-center">
									<FlightAnimatedModal
										flight={flight}
									></FlightAnimatedModal>
								</TableCell>
							</TableRow>
						))}
						{/* <TableRow>
							<TableCell className="font-medium">
								INV001
							</TableCell>
							<TableCell className="hidden md:table-cell">
								On Time
							</TableCell>
							<TableCell className="hidden md:table-cell">
								{' '}
								12:00 PM
							</TableCell>
							<TableCell className="hidden md:table-cell">
								{' '}
								11:00 AM
							</TableCell>
							<TableCell>
								<FlightAnimatedModal></FlightAnimatedModal>
							</TableCell>
						</TableRow> */}
					</TableBody>
				</Table>
			</ScrollArea>
		</div>
	);
}
