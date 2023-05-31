"use client";

import { useState, useEffect } from 'react';
import { MdErrorOutline } from 'react-icons/md'


const Popup = ({ text }) => {


  return (

        <div id='notification-div' className="notification-div z-50 absolute top-20 w-[18rem] min-h-[2.5rem] rounded-full bg-white backdrop-blur bg-opacity-80 right-5 flex items-center flex-row justify-start px-2 py-2">
          <MdErrorOutline className='mr-2' color='red' size={'20px'}/>
			<p className="text-black text-base">
				{text}
			</p>
        </div>

  );
};

export default Popup;
