import { useState } from 'react';
import {BeatLoader} from 'react-spinners';
import Notification from '@/components/Notification';
import { signIn, useSession } from 'next-auth/react';


const Login = ({ toggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmail, setIsEmail] = useState(true);
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
  
  const handlerLogin = async () => {
    if (isEmail && email !== '') {
		setisFetching(true)
		const res = await signIn('credentials', {
			email: email,
			password: password,
			redirect: false,
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

	} else {
		setNotificationText('Check your email address')
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

        <h2 className="text-3xl font-bold my-4 max-sm:my-2 max-sm:text-2xl">Log in</h2>
        <form className="space-y-4 my-6 max-sm:my-3">
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
          <div className='relative'>
            <label htmlFor="password" className="block  text-lg max-sm:text-base">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full text-lg max-sm:text-base rounded-md outline-none p-1 shadow-sm focus:border-b-indigo-500 focus:border-b-2 mt-1`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
				disabled={isFetching ? true : false}
				onClick={handlerLogin}
				className="z-20 py-3 max-sm:py-2 px-10 w-[300px] bg-gradient-to-br from-indigo-600 via-[#431992] to-[#260e52] hover:from-indigo-500 hover:to-[#301368] text-white font-semibold rounded-lg transition-all  font-sans" 
			>
				{isFetching ? <BeatLoader color='white' size={'10px'}/> : 'Login'}
            </button>
          </div>
        </form>
		<p className='cursor-pointer text-gray-600 hover:text-black' onClick={() => toggle(false)}>Dont have an account ?</p>
      </div>
  );
};

export default Login;
