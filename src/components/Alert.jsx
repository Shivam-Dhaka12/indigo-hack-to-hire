import { useRecoilState } from 'recoil';
import { alertState } from './../recoil/atoms/alert';

const alertTypeClasses = {
	error: 'bg-red-700 hover:bg-red-900 ',
	primary: 'bg-zinc-800 hover:bg-zinc-900 ',
	secondary: 'bg-zinc-700 hover:bg-zinc-900 ',
};

export default function Alert() {
	const [{ type, msg }, setAlert] = useRecoilState(alertState);

	return (
		<div
			className={`${alertTypeClasses[type]}flex items-center alert absolute top-8 left-1/2 -translate-x-1/2  text-white alert-error pl-6 pr-10 md:pl-8 md:pr-12 py-4 md:py-6 shadow-md  cursor-pointer rounded-md min-w-max z-50`}
		>
			{msg}

			<span
				className="absolute right-4 rounded-full  scale-100 hover:scale-110"
				width={15}
				onClick={() => setAlert({ show: false, type: '', msg: '' })}
			>
				x
			</span>
		</div>
	);
}
