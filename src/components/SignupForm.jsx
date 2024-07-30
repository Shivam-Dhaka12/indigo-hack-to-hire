import React from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { cn } from '../utils/cn';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '../recoil/atoms/auth';
import Loader from './Loader';
import { useRequest } from '../hooks/useRequest';
import { getSocketInstance, handleSocketError } from '../utils/socketManager';
import useShowAlert from '../hooks/useShowAlert';
import TokenManager from '../utils/TokenManager';

export function SignupForm() {
	const navigate = useNavigate();
	const setAuthState = useSetRecoilState(authState);
	const showAlert = useShowAlert();

	const { sendRequest, loading } = useRequest();

	const [postInputs, setPostInputs] = useState({
		email: 'shviamdhaka1200@gmail.com',
		password: '12345678',
		name: 'shivam dhaka',
		phone: '9876543210',
	});

	const url = '/api/auth/signup';

	function handlePostInputChange(e) {
		console.log(e.target.value);
		setPostInputs({
			...postInputs,
			[e.target.id]: e.target.value,
		});
		console.log(postInputs);
	}
	async function handleSubmit(e) {
		if (e) {
			e.preventDefault();
		}
		const response = await sendRequest(
			url,
			postInputs,
			'Log in successful!'
		);
		if (response) {
			const { token } = response.data;
			TokenManager.set(token);

			setAuthState({ token });

			try {
				const socket = getSocketInstance(token);
				if (socket) {
					handleSocketError(socket, showAlert);
				}
				navigate('/');
			} catch (error) {
				console.log(error);
				showAlert({
					show: true,
					type: 'error',
					msg: 'Error: ' + error,
				});
			}
		}
	}

	return (
		<div className="mt-28 w-full px-8">
			<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
				<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
					Sign up
				</h2>
				<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
					Sign up to get real-time updates
				</p>

				<form className="my-8" onSubmit={handleSubmit}>
					<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
						<LabelInputContainer>
							<Label htmlFor="name">First name</Label>
							<Input
								id="name"
								placeholder="Tyler Harris"
								type="text"
								onChange={handlePostInputChange}
							/>
						</LabelInputContainer>
					</div>
					<LabelInputContainer className="mb-4">
						<Label htmlFor="email">Email Address</Label>
						<Input
							id="email"
							placeholder="projectmayhem@fc.com"
							type="email"
							onChange={handlePostInputChange}
						/>
					</LabelInputContainer>
					<LabelInputContainer className="mb-4">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							placeholder="••••••••"
							type="password"
							onChange={handlePostInputChange}
						/>
					</LabelInputContainer>
					<LabelInputContainer className="mb-8">
						<Label htmlFor="phone">Phone</Label>
						<Input
							placeholder="9876543210"
							type="text"
							onChange={handlePostInputChange}
						/>
					</LabelInputContainer>

					<button
						className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
						type="submit"
					>
						{loading ? <Loader /> : <>Sign up &rarr;</>}

						<BottomGradient />
					</button>
					<a
						href="/signin"
						className="block mt-2 text-zinc-600 text-center"
					>
						Already have an account? Signin
					</a>
				</form>
			</div>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

const LabelInputContainer = ({ children, className }) => {
	return (
		<div className={cn('flex flex-col space-y-2 w-full', className)}>
			{children}
		</div>
	);
};
