'use client';
import { SessionProvider } from 'next-auth/react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function RootLayout({ children }) {
	const [email, setEmail] = useState();
	const [username, setUsername] = useState();

	return (
		<html lang='en'>
			<head>
				<title>uLink</title>
			</head>
			<SessionProvider>
				<body className='relative bg-gradient-to-r from-teal-400 to-violet-600 font-Nunito'>
					<Navbar />
					{children}
					<Footer />
				</body>
			</SessionProvider>
		</html>
	);
}
