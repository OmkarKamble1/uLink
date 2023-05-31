import React from 'react'
import Link from 'next/link';

function Header() {
  return (
	<header className="bg-neutral-50 bg-opacity-40 backdrop-filter backdrop-blur-sm absolute top-0 left-0 w-full border-b-2 border-black-50 z-50 px-12">
      <div className="container mx-auto flex justify-between items-center py-4">
		
        <h1 className="text-2xl font-bold font-sans"><a href='/'>uLink</a></h1>
        <nav className="flex space-x-8">						
			{/* <Link href="/login" className="text-black font-bold text-lg  hover:text-gray-300">
                Login
			</Link> */}
        </nav>
      </div>
    </header>
  )
}

export default Header