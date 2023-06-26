'use client';
import { SessionProvider } from 'next-auth/react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
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
