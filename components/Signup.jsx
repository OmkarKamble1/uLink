import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import Notification from '@/components/Notification';
import { signIn } from 'next-auth/react';


const Signup = ({ toggle }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEmail, setIsEmail] = useState(true);
  const [isUsername, setIsUsername] = useState(true);
  const [isFetching, setisFetching] = useState(false);
  const [notificationText, setNotificationText ] = useState('');

  const validateEmail = (email) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const valid = email.match(regex)
	if (valid && email !== '') {
		setIsEmail(true)
	} else {
		setIsEmail(false)
	}
  }

  function validateUsername(username) {
	const regex = /^[a-zA-Z0-9]+$/;
	const valid = username.match(regex)
	if (valid && username !== '') {
		setIsUsername(true)
	} else {
		setIsUsername(false)
	}
  }
  

  const handleSignup = async () => {
	if (isEmail && isUsername && email !== '' && username !== '' && password.length >= 8) {
		setisFetching(true)
		await axios.post('/api/signup', {
			email: email,
			username: username,
			password: password
		})
		.then(async (res) => {
			if (res.data.success == true) {
				if (res.data.message === 'EXISTS') {
					setisFetching(false);
					setNotificationText('Email already registered')
					document.getElementById('notification-div').classList.add('popup-active');
					setTimeout(() => {
						document.getElementById('notification-div').classList.remove('popup-active');
					}, 2000);
				} else {
					setisFetching(false);
					const res = await signIn('credentials', {
						email: email,
						password: password
					})
					if (res.error) {
						setisFetching(false);
						setNotificationText('Invalid credentials')
						document.getElementById('notification-div').classList.add('popup-active');
						setTimeout(() => {
							document.getElementById('notification-div').classList.remove('popup-active');
						}, 2000);
					} else {
						window.location.href = '/'
					}
				}
				
			}
		})
		.catch((err) => {
			setisFetching(false);
			setNotificationText('Signup error')
			document.getElementById('notification-div').classList.add('popup-active');
			setTimeout(() => {
				document.getElementById('notification-div').classList.remove('popup-active');
			}, 2000);
		});
	} else {
		setNotificationText('Invalid credentials')
		document.getElementById('notification-div').classList.add('popup-active');
		setTimeout(() => {
			document.getElementById('notification-div').classList.remove('popup-active');
		}, 2000);
	}
	return;
  };

  return (
      <div className="w-fit px-16 max-sm:px-7 py-4 bg-white rounded-lg shadow-md items-center flex flex-col">
		<Notification text={notificationText} />

        <h2 className="text-3xl font-bold my-4 max-sm:my-2 max-sm:text-2xl">Sign up</h2>
        <form className="space-y-2 my-6 max-sm:my-3">
          <div className='relative'>
            <label htmlFor="email" className="block text-lg max-sm:text-base">
              Email
            </label>
            <input
			required
              type="email"
              id="email"
              className={`w-full text-lg max-sm:text-base rounded-md outline-none p-1 shadow-sm ${isEmail ? 'focus:border-b-indigo-500 focus:border-b-2' : null}  mt-1  ${isEmail ? null  : 'border-red-700 border-[1px]'}`}
              value={email}
              onChange={(e) => {
				setEmail(e.target.value);
				validateEmail(e.target.value);
			}}
            />
			{ !isEmail &&
			<span className='absolute bg-red-500 w-full h-6 text-sm mt-[1px] rounded-bl-xl rounded-br-xl flex items-center justify-center z-20 opacity-90 text-white'>Enter valid email</span>}
          </div>
          <div className='relative '>
            <label htmlFor="username" className="block text-lg max-sm:text-base">
              Username
            </label>
            <input
			required
              type="text"
              id="username"
              className={`w-full text-lg max-sm:text-base rounded-md outline-none p-1 shadow-sm ${isUsername ? 'focus:border-b-indigo-500 focus:border-b-2' : null}  mt-1  ${isUsername ? null  : 'border-red-700 border-[1px]'}`}
              value={username}
              onChange={(e) => {
				setUsername(e.target.value);
				validateUsername(e.target.value);
			}}
            />
			{ !isUsername &&
			<span className='absolute bg-red-500 w-full h-6 text-sm mt-[1px] rounded-bl-xl rounded-br-xl flex items-center justify-center z-20 opacity-90 text-white'>Only 15 characters without symbols</span>}
          </div>
          <div className='relative'>
            <label htmlFor="password" className="block text-lg max-sm:text-base">
              Password
            </label>
            <input
			required
              type="password"
              id="password"
              className={`w-full text-lg max-sm:text-base rounded-md outline-none p-1 shadow-sm ${password.length <= 7 && password !== '' ? null : 'focus:border-b-indigo-500 focus:border-b-2'}  ${password.length <= 7  && password !== '' ? 'border-red-700 border-[1px]'  : null}  mt-1`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
			{ password.length <= 7 && password !== '' &&
			<span className='absolute bg-red-500 w-full h-6 text-sm mt-[1px] rounded-bl-xl rounded-br-xl flex items-center justify-center z-20 opacity-90 text-white'>Minimum 8 characters</span>}
          </div>
          <div>
            <button
              disabled={isFetching? true : false}
			  onClick={(e) => {
				e.preventDefault();
				handleSignup();
			  }}
			  className="z-20 py-3 px-10 max-sm:py-2 w-[300px] bg-gradient-to-br from-indigo-600 via-[#431992] to-[#260e52] hover:from-indigo-500 hover:to-[#301368] text-white font-semibold rounded-lg transition-all font-sans"
		  >
			  {isFetching ? <BeatLoader color='white' size={'10px'}/> : 'Sign up'}
            </button>
          </div>
        </form>
		<p className='cursor-pointer text-gray-600 hover:text-black' onClick={() => toggle(true)}>Already a member ?</p>
      </div>
  );
};

export default Signup;
