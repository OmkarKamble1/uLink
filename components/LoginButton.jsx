"use client";

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

function LoginButton() {

	const { data } = useSession();
	
	if (data && data.user) {
		return (
			<div>
				<h2 className='text-black text-xl'>{JSON.stringify(data)}</h2>
				<button  className='bg-neutral-700 rounded-full px-10 py-2 m-4 hover:bg-neutral-900 hover:text-white transition-colors font-bold' onClick={() => signOut()}>
					Sign out
				</button>
			</div>
		)
	}

	return (
		<div>
			<button className='bg-neutral-700 rounded-full px-10 py-2 m-4 hover:bg-neutral-900 hover:text-white transition-colors font-bold' onClick={() => signIn()}>
				Sign in
			</button>
		</div>
	)
}

export default LoginButton