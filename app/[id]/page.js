'use client';

import axios from 'axios';
import React, { useEffect } from 'react';

function CodePage({ params }) {
	const urlCode = params.id;
	const getOriginalUrl = async () => {
		const stats = await getStats();
		await axios
			.post('/api/get', {
				id: urlCode,
				stats: stats
			})
			.then((res) => {
				if ((res.data.success = true)) {
					const original_link = res.data.link;
					window.location.href = original_link;
				} else {
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
			.catch(
				() =>
					(document.getElementById('status').innerHTML =
						'<h1 class="text-red-600">Link not found</h1>')
			);
	};
	const getStats = async () => {
		// get timestamp
		const now = Date.now();
		// get location
		const location = await axios.get('https://geolocation-db.com/json/');

		const returnObj = {
			timestamp: now,
			country: location.data.country_name,
			state: location.data.state,
			city: location.data.city
		};
		return returnObj;
	};
	useEffect(() => {
		getOriginalUrl();
	});

	return (
		<main className='max-sm:text-xl text-3xl flex min-h-screen w-full flex-col items-center justify-center p-20'>
			<span id='status' className='text-xl mt-10'></span>
		</main>
	);
}

export default CodePage;
