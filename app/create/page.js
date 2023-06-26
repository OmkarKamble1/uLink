'use client';

import axios from 'axios';
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { TbCopy, TbCheck, TbArrowUpRight } from 'react-icons/tb';
import Notification from '@/components/Notification';
import { useSession } from 'next-auth/react';

export default function Create() {
	const [link, setLink] = useState('');
	const [shortlink, setShortLink] = useState('ulinkk.vercel.app/');
	const [isFetching, setIsFetching] = useState(false);
	const [isCopying, setIsCopying] = useState(false);

	const [notificationText, setNotificationText] = useState('');

	const { data } = useSession();

	const handerButtonSubmit = async () => {
		const regex =
			/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-_]+)*\/?[a-zA-Z0-9\-\._~:/?#\[\]@!$&'()*+,;=]*$/;

		const isLinkValid = link.match(regex);
		if (!isLinkValid) {
			setNotificationText('Invalid link');
			document.getElementById('notification-div').classList.add('popup-active');
			setTimeout(() => {
				document
					.getElementById('notification-div')
					.classList.remove('popup-active');
			}, 2000);
		} else {
			if (data) {
				setIsFetching(true);
				await axios
					.post('/api/create', {
						link: link,
						id: data.user.id
					})
					.then((res) => {
						setIsFetching(false);
						if (res.data.success === true) {
							const { shortLink } = res.data;
							setShortLink(shortLink);
						} else {
							setNotificationText('Error creating short link');
							document
								.getElementById('notification-div')
								.classList.add('popup-active');
							setTimeout(() => {
								document
									.getElementById('notification-div')
									.classList.remove('popup-active');
							}, 2000);
						}
					})
					.catch((err) => {
						setIsFetching(false);
						setShortLink('An error occurred while creating the link.');
						setNotificationText('Server error');
						document
							.getElementById('notification-div')
							.classList.add('popup-active');
						setTimeout(() => {
							document
								.getElementById('notification-div')
								.classList.remove('popup-active');
						}, 2000);
					});
			} else {
				window.location.href = '/login';
			}
		}
	};

	const copyLink = () => {
		if (shortlink !== 'ulinkk.vercel.app/') {
			navigator.clipboard.writeText(shortlink);
			setIsCopying(true);
			setTimeout(() => {
				setIsCopying(false);
			}, 1200);
		}
	};

	return (
		<main className='flex min-h-screen w-full flex-col items-center justify-center p-20 max-sm:px-10'>
			<Notification text={notificationText} />
			<h1 className='md:text-4xl max-md:text-[2rem] font-bold mb-8 text-white z-20'>
				Create Short Link
			</h1>
			<form className='max-sm:px-0 w-[100%] max-md:max-cust:px-10'>
				<div className='my-12 gap-10 flex flex-row flex-wrap justify-center'>
					<input
						type='text'
						value={link}
						onChange={(e) => setLink(e.target.value)}
						placeholder='Enter the original link'
						className='z-20 py-2 px-4 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-screen cust:max-w-[60%] max-cust:max-w-[100%] max-sm:w-[100vw]'
					/>
					<div className='z-20 w-screen cust:max-w-[30%] max-cust:max-w-[100%] relative'>
						<input
							type='text'
							placeholder='Short Link'
							disabled
							value={shortlink}
							className='cursor-text min-w-full py-2 px-4 border-2 border-gray-300 bg-neutral-200 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-90 '
						/>
						<span className='z-20 absolute top-3 right-2 opacity-80 flex flex-row gap-3'>
							{isCopying ? (
								<TbCheck className='z-20' color='black' size={'20px'} />
							) : (
								<TbCopy
									onClick={copyLink}
									className='z-20 cursor-pointer'
									color='black'
									size={'20px'}
								/>
							)}
							<a
								target='_blank'
								href={
									shortlink !== 'ulinkk.vercel.app/'
										? `https://${shortlink}`
										: null
								}
							>
								<TbArrowUpRight
									className='z-20 cursor-pointer'
									color='black'
									size={'20px'}
								/>
							</a>
						</span>
					</div>
				</div>

				<div className='z-20 flex items-center justify-center h-14 font-sans'>
					<button
						disabled={isFetching ? true : false}
						onClick={(e) => {
							e.preventDefault();
							handerButtonSubmit();
						}}
						className='z-20 py-3 px-10 max-sm:w-[250px] w-[300px] bg-gradient-to-br from-indigo-600 via-[#431992] to-[#260e52] hover:from-indigo-500 hover:to-[#301368] text-white font-semibold rounded-lg transition-all'
					>
						{isFetching ? (
							<BeatLoader color='white' size={'10px'} />
						) : (
							'Generate Short Link'
						)}
					</button>
				</div>
			</form>
		</main>
	);
}
