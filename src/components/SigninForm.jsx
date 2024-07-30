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

export function SigninForm() {
	const navigate = useNavigate();
	const setAuthState = useSetRecoilState(authState);
	const showAlert = useShowAlert();

	const { sendRequest, loading } = useRequest();

	const [postInputs, setPostInputs] = useState({
		email: 'shivamdhaka1200@gmail.com',
		password: '12345678',
	});

	const url = '/api/auth/signin';

	function handlePostInputChange(e) {
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
		<div className="w-full mt-32 px-8">
			<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
				<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
					Sign In
				</h2>
				<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
					Sign in to get real-time updates.
				</p>

				<form className="my-20" onSubmit={handleSubmit}>
					<LabelInputContainer className="mb-4">
						<Label htmlFor="email">Email Address</Label>
						<Input
							placeholder="projectmayhem@fc.com"
							id="email"
							type="email"
							onChange={handlePostInputChange}
							required
						></Input>
					</LabelInputContainer>
					<LabelInputContainer className="mb-4">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							placeholder="••••••••"
							type="password"
							onChange={handlePostInputChange}
							required
						/>
					</LabelInputContainer>

					<button
						className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-20 text-center"
						type="submit"
					>
						{loading ? <Loader /> : <>Sign in &rarr;</>}

						<BottomGradient />
					</button>

					<a
						href="/signup"
						className="block mt-2 text-zinc-600 text-center"
					>
						Don't have an account? Signup
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
