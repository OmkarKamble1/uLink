'use client';

import axios from 'axios';
import React, { useEffect, useState, use } from 'react';
import { BeatLoader, BarLoader } from 'react-spinners';
import Notification from '@/components/Notification';
import { useSession } from 'next-auth/react';

function UserPage({ params }) {
	const username = params.user;
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loadingData, setLoadingData] = useState(true);
	const [data, setData] = useState([]);
	const [clicks, setClicks] = useState(0);

	const [notificationText, setNotificationText] = useState('');

	const { data: session } = useSession();

	const getData = async () => {
		await axios
			.post('/api/getUserData', {
				id: session.user.id
			})
			.then((res) => {
				if (res.data.userData !== 'USERNOTFOUND') {
					if (res.data.userData !== 'LINKSNOTFOUND') {
						setData(res.data.userData);
						setClicks(res.data.total_views);
						setLoadingData(false);
					} else {
						setData('NOTFOUND');
						setLoadingData(false);
						setNotificationText('Links not found');
						document
							.getElementById('notification-div')
							.classList.add('popup-active');
						setTimeout(() => {
							document
								.getElementById('notification-div')
								.classList.remove('popup-active');
						}, 2000);
					}
				} else {
					setNotificationText('User not found');
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
	};

	useEffect(() => {
		setIsLoggedIn(true);
		getData();
	}, [session]);

	return (
		<div className='min-h-screen flex justify-center p-16 max-md:p-4 max-md:pt-16'>
			<Notification text={notificationText} />

			{isLoggedIn ? (
				<div className='bg-white relative w-full rounded-xl py-16 max-sm:py-11 px-[10%] max-sm:px-3 bg-opacity-70 backdrop-blur-sm'>
					<img
						draggable={false}
						className='w-24 bg-white rounded-full absolute -top-12 left-12 transition-all hover:scale-[1.1]  max-sm:w-16 max-sm:left-8 max-sm:-top-8'
						src={`https://robohash.org/${username}?set=set3`}
					/>
					<div className='absolute flex gap-4 text-lg max-sm:text-base top-2 right-5 text-black '>
						<p>
							Total links: <span className='font-semibold'>{data.length}</span>
						</p>
						/
						<p>
							Total clicks: <span className='font-semibold'>{clicks}</span>
						</p>
					</div>

					{loadingData ? (
						<div className='flex items-center justify-center h-60'>
							<BeatLoader color='#727272' size={'20px'} />
						</div>
					) : (
						<>
							{data === 'NOTFOUND' ? (
								<div className='flex items-center text-center justify-center h-60 flex-col'>
									<h1 className='text-2xl max-sm:text-xl mx-2'>
										Create your first short link and make your URLs snappy!
									</h1>
									<p className='text-blue-800 mt-5 text-lg'>
										<a href='/create'>Create short link now !</a>
									</p>
								</div>
							) : (
								<div className='flex items-center justify-center'>
									<table className='w-full table-fixed border-collapse font-Nunito'>
										<thead>
											<tr className=' text-gray-700 border-b-2 border-gray-600 text-lg max-sm:text-base'>
												<th className='w-3/6 py-3 max-md:py-2 max-md:w-2/4'>
													Original Link
												</th>
												<th className='w-2/6 py-3 max-md:py-2 max-md:w-2/4'>
													Short Link
												</th>
												<th className='w-1/6 py-3 max-md:hidden'>Clicks</th>
												<th className='w-1/6 py-3  max-md:py-2 max-md:w-1/4'>
													Details
												</th>
											</tr>
										</thead>
										<tbody className='text-gray-900'>
											{data.reverse().map((row) => (
												<tr
													key={row.id}
													className='rounded-2xl cursor-pointer border-b border-gray-400 text-center p-2 hover:bg-white hover:bg-opacity-50 transition-all'
												>
													<td className='py-3 px-6 truncate max-sm:py-2 max-sm:px-1 max-sm:text-sm rounded-s-full'>
														{row.original_link}
													</td>
													<td className='py-3 px-6 text-blue-800 font-semibold max-sm:py-2 max-sm:px-1 max-sm:text-sm truncate'>
														<a
															target='_blank'
															href={`http://${row.short_link}`}
														>
															{row.short_link}
														</a>
													</td>
													<td className='py-3 px-6 max-sm:py-2 max-sm:px-1 max-sm:text-sm  max-md:hidden'>
														{row.views}
													</td>
													<td className='py-3 px-6 max-sm:px-1 max-sm:text-sm  rounded-e-full max-sm:rounded-e-full'>
														<a
															href={`/u/${username}/stats?link=${row.link_id}`}
														>
															<button className='bg-indigo-600 hover:bg-indigo-800 py-1 px-4 rounded-full max-sm:text-sm  text-white'>
																show
															</button>
														</a>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</>
					)}
				</div>
			) : (
				<div className='flex flex-col h-[70vh] items-center justify-center'>
					<h1 className='text-2xl m-3 text-white'>Loading user profile</h1>
					<BarLoader
						speedMultiplier={'2'}
						color='black'
						height={'2px'}
						size={'50px'}
					/>
				</div>
			)}
		</div>
	);
}

export default UserPage;
