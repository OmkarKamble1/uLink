export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<title>redirecting -uLink</title>
			</head>
			<body className='relative min-h-screen bg-white'>{children}</body>
		</html>
	);
}
