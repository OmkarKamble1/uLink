"use client"
import React from 'react'

function footer() {
  return (
	<footer className="text-black w-full mb-2 text-sm mt-8 absolute bottom-0 left-0 text-center">
		<p> &copy; {new Date().getFullYear()} uLink Shortener. All rights reserved.</p>
	</footer>	
  )
}

export default footer