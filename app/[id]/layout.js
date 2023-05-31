
import Footer from '@/components/Footer.jsx'

export default function RootLayout({ children }) {
	
  return (
    <html lang="en">
      <body className='relative min-h-screen bg-white'>
		{children}
	  	<Footer />
		<div className="absolute bottom-0 h-full w-full left-0 right-0 top-0 -z-10">
			<div className='h-full relative -z-0'>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 320"
					className="fill-current text-indigo-100 top-0 absolute"
				>
					<path
					fill='#37C2C5'
					fillOpacity="0.1"
					d="M0,256L48,250.7C96,245,192,235,288,218.7C384,203,480,181,576,186.7C672,192,768,224,864,234.7C960,245,1056,235,1152,208C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
					></path>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 320"
					className="fill-current text-purple-100 bottom-0 absolute"
				>
					<path
					fill='#724CE7'
					fillOpacity="0.1"
					d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,170.7C672,181,768,171,864,181.3C960,192,1056,224,1152,234.7C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
					></path>
				</svg>
		  	</div>
		</div>		
	  </body>	  
    </html>
  )
}
