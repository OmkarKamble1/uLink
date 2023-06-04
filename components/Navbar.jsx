'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

function Navbar() {
	const [popup, setPopup] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState('');
	const [isFetching, setIsFetching] = useState(false);

	const handerLogout = () => {
		localStorage.removeItem('data').replace('/');
		setIsLoggedIn(false);
	};

	const { data } = useSession();

	useEffect(() => {
		setIsFetching(true);
		if (data && data.user) {
			setIsLoggedIn(true);
			setUsername(data.user.username ? data.user.username : '');
			setIsFetching(false);
		} else {
			setIsFetching(false);
		}
	});

	return (
		<nav
			onClick={() => (isLoggedIn ? setPopup(!popup) : null)}
			className={`hover:bg-opacity-70 z-20 bg-white backdrop-blur bg-opacity-60 absolute top-2 right-5 w-52 ${
				!popup ? 'h-10' : 'h-[9.5rem]'
			} rounded-[1.3rem] flex flex-col px-2 cursor-pointer py-1 transition-all overflow-hidden select-none`}
		>
			{isFetching ? (
				<div className="flex items-center justify-center h-10">
					<BeatLoader color="#707070" size={'8px'} />
				</div>
			) : (
				<>
					{isLoggedIn ? (
						<>
							<div className="w-full flex-row flex items-center justify-between">
								<h2 className="font-semibold ml-2 text-neutral-800 truncate">
									{username}
								</h2>
								<img
									className="w-8 bg-white rounded-full"
									src={`https://robohash.org/${username}?set=set3`}
								/>
							</div>
							<div className="mt-1 gap-1 w-full flex flex-col text-center">
								<a href={`/u/${username}`}>
									<h3 className="hover:bg-white hover:bg-opacity-60 rounded-2xl py-1 z-50">
										My links
									</h3>
								</a>
								<a href={`/create`}>
									<h3 className="hover:bg-white hover:bg-opacity-60 rounded-2xl py-1 z-50">
										Create
									</h3>
								</a>
								<h3
									onClick={() => signOut({ redirect: true })}
									className="hover:bg-white hover:bg-opacity-60 rounded-2xl py-1"
								>
									Logout
								</h3>
							</div>
						</>
					) : (
						<div className="w-full flex flex-col text-center">
							<h3
								onClick={() => signIn()}
								className="hover:bg-white hover:bg-opacity-60 rounded-2xl py-1 z-50 cursor-pointer"
							>
								Login
							</h3>
						</div>
					)}
				</>
			)}
		</nav>
	);
}

export default Navbar;
