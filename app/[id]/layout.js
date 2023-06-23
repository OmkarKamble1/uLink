export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<title>redirecting -uLink</title>
			<body className='relative min-h-screen bg-white'>{children}</body>
		</html>
	);
}
