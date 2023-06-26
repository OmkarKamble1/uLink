import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ Piedata }) {
	// [{name: 'India', count: 5}]
	const [colors] = useState(
		Piedata.map(() => {
			const r = Math.floor(Math.random() * 256);
			const g = Math.floor(Math.random() * 256);
			const b = Math.floor(Math.random() * 256);
			return `rgba(${r}, ${g}, ${b}, 0.6)`;
		})
	);
	const [labels] = useState(Piedata.map((obj) => obj.name));
	const [countryData] = useState(
		Piedata.map((obj) => obj.count / Piedata.length)
	);

	const data = {
		labels: labels,
		datasets: [
			{
				data: countryData,
				label: 'clicks',
				backgroundColor: colors,
				borderWidth: 0
			}
		]
	};

	return (
		<>
			{Piedata.length > 0 ? (
				<Pie className='bg-white shadow-md rounded-3xl p-1' data={data} />
			) : (
				<div className='flex items-center justify-center h-full'>
					<p className='text-neutral-600 text-xl'>No data</p>
				</div>
			)}
		</>
	);
}
