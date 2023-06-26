'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { HashLoader } from 'react-spinners';
import { FiExternalLink } from 'react-icons/fi';
import { TbClick } from 'react-icons/tb';
import axios from 'axios';
import BarChart from '@/components/BarChart';
import PieChart from '@/components/PieChart';

function LinkPage() {
	const link_id = useSearchParams().get('link');
	const [loading, isLoading] = useState(true);
	const [data, setData] = useState();

	const getLinkDetails = async () => {
		await axios
			.post('/api/getLinkStats', {
				link_id: link_id
			})
			.then((response) => {
				setData(response.data);
				isLoading(false);
			})
			.catch((error) => {});
	};

	useEffect(() => {
		isLoading(true);
		getLinkDetails();
	}, []);

	return (
		<div className='min-h-screen flex justify-center p-16 max-md:p-4 max-md:pt-16'>
			<div className='bg-white mb-10 relative w-full rounded-xl py-12 px-10 max-sm:px-3 max-sm:py-8 bg-opacity-70 backdrop-blur-sm'>
				{loading ? (
					<div className='flex w-full h-full'>
						<HashLoader color='#606060' className='m-auto' />
					</div>
				) : (
					<>
						<div className='grid grid-cols-2 gap-8 max-sm:gap-5'>
							<div className='bg-white bg-opacity-70 col-span-2 rounded-2xl py-5 px-10 max-sm2:px-5 flex flex-col'>
								<a
									className='w-fit'
									target='_blank'
									href={`http://${data.short_link}`}
								>
									<h2 className='text-black text-xl font-bold flex items-center gap-2'>
										{data.short_link}
										<FiExternalLink size={20} />
									</h2>
								</a>
								<div className='mt-3 flex gap-2 max-sm2:flex-col'>
									<span className='flex gap-2'>
										<div className='bg-white cursor-default shadow-md text-neutral-600 rounded-full flex gap-1 px-4 py-1 items-center text-[16px] max-sm2:text-[15px]  w-fit h-10 truncate text-ellipsis'>
											<div>
												<TbClick size={20} />
											</div>

											{data.views}
										</div>
										<div className='bg-white cursor-default shadow-md text-neutral-600 rounded-full flex gap-1 px-4 py-1 items-center text-[16px] max-sm2:text-[15px] w-fit h-10 truncate text-ellipsis'>
											created at: {data.created_at} (UTC)
										</div>
									</span>
									<div className='bg-white cursor-default shadow-md text-neutral-600 rounded-full flex gap-1 px-4 py-1 items-center text-[16px] max-sm2:text-[15px] w-fit h-10 truncate text-ellipsis'>
										{data.original_link}
									</div>
								</div>
							</div>
							<div className='bg-white col-span-2 h-[450px] max-sm:h-[300px] max-sm2:h-[380px] max-ssm:h-full flex justify-center items-center bg-opacity-70  rounded-2xl max-sm:rounded-xl p-7 max-sm2:p-5'>
								<BarChart clicks_data={data.clicks_data} />
							</div>
							<div className='bg-white max-sm2:col-span-2 max-sm:h-full flex justify-center items-center bg-opacity-70  rounded-2xl p-7 max-sm2:p-5 '>
								<div className='w-[300px] flex justify-center max-sm2:w-[250px]'>
									<PieChart Piedata={data.countries_data} />
								</div>
							</div>
							<div className='bg-white max-sm2:col-span-2 flex flex-col  bg-opacity-70  rounded-2xl p-7 max-sm2:p-5 '>
								<div className='bg-white text-lg max-sm2:text-[1rem] py-3 max-sm2:px-5  max-sm2:py-2 text-neutral-800 px-5 rounded-full shadow-md'>
									<p>
										Last clicked: {data.last_clicked ? data.last_clicked : '-'}
									</p>
								</div>
								<div className='bg-white text-lg max-sm2:text-[1rem] py-3 max-sm2:py-2 text-neutral-800 px-5 mt-5 rounded-full shadow-md'>
									<p>
										Top country:{' '}
										{data.top_country ? data.top_country.name : '-'}
									</p>
								</div>
								<div className='bg-white text-lg max-sm2:text-[1rem] py-3 max-sm2:py-2 text-neutral-800 px-5 mt-5 rounded-full shadow-md'>
									<p>
										Top state: {data.top_country ? data.top_country.state : '-'}
									</p>
								</div>
								<div className='bg-white text-lg max-sm2:text-[1rem] py-3 max-sm2:py-2 text-neutral-800 px-5 mt-5 rounded-full shadow-md'>
									<p>
										Top city: {data.top_country ? data.top_country.city : '-'}
									</p>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default LinkPage;
