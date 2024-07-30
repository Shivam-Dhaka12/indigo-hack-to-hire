export function Button({ className, children, onClick }) {
	return (
		<a
			className={`px-8 text-sm h-10 border dark:border-neutral-600 flex justify-center items-center rounded-xl ${className} cursor-pointer z-50`}
			onClick={onClick}
		>
			{children}
		</a>
	);
}
