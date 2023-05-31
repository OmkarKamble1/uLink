"use client";

import { useState, useEffect } from 'react';
import Notification from '@/components/Notification';
import LoginButton from '@/components/LoginButton';
import { useSession } from 'next-auth/react';


const LandingPage = () => {
	
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const { data } = useSession();
	 
	const handleCreateButton = () => {
		if (data) {
			window.location.href = '/create'
		} else {
			document.getElementById('notification-div').classList.add('popup-active');
			setTimeout(() => {
				document.getElementById('notification-div').classList.remove('popup-active');
			}, 2000);					
		}
	};

	useEffect(() => {
		if (data && data.user) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [])

	return (
	  <div className="min-h-screen flex flex-col items-center justify-center">
		<Notification text={'Login to create short link.'} />
		<div className="text-center z-20">
		  <h1 className="font-extrabold font-Quicksand text-5xl md:text-6xl mb-6 bg-gradient-to-br from-pink-300 via-white to-blue-300 text-transparent bg-clip-text stroke-white stroke-1	">
			uLink
		  </h1>
		  <p className="font-extralight font-Caveat sm:text-2xl md:text-3xl text-neutral-900 mb-10">
			The URL Shortener for Everyone.
		  </p>
				
		  <div className="flex justify-center font-sans text-lg">
			{
				isLoggedIn ? 

				<button onClick={handleCreateButton} className="py-3 px-14 bg-gradient-to-br from-indigo-600 via-[#431992] to-[#260e52] hover:bg-indigo-900 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
 				Create a Short Link	
 				</button>
				:
				<button onClick={handleCreateButton} className="py-3 px-10 bg-gradient-to-br from-indigo-600 via-[#431992] to-[#260e52] hover:bg-indigo-900 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
 				Create a Short Link	
 				</button>
			}
 			
 			
 		  </div>
		  
 		</div>
		 
	  </div>
	);
};

export default LandingPage;
