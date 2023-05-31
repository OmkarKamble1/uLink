"use client";

import Signup from '@/components/Signup';
import LoginComponent from '@/components/Login';

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';

function Login() {
	const [toggleModal, setToggleModal] = useState(true)

	const {data} = useSession();
	
	useEffect(() => {
		if (data && data.user) {			
			window.location.replace('/')
		}
	})
	return (
		<main className='z-50 flex min-h-screen w-full flex-col items-center justify-center p-20 max-sm:p-10 transition-all'>
			{	
				toggleModal ?
				<LoginComponent toggle={setToggleModal} />
				:
				<Signup toggle={setToggleModal} />
				
			}
			
		</main>
	)
}

export default Login;