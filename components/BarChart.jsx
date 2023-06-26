import React, { useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	BarElement,
	Title,
	Tooltip,
	Legend
);

function BarChart({ clicks_data }) {
	// [{timestamp: 1687623419270, clicks: 4}]

	const [labels] = useState(
		clicks_data.map((obj) => {
			const date = new Date(obj.timestamp);

			const last_clicked = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
			return last_clicked;
		})
	);
	const [clicks] = useState(clicks_data.map((obj) => Math.abs(obj.clicks)));
	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Clicks by date'
			},
			scales: {
				x: {
					offset: true
				},

				xAxes: [
					{
						barPercentage: 0.2
					}
				]
			}
		}
	};

	const data = {
		labels,
		datasets: [
			{
				label: 'Clicks',
				data: clicks,
				backgroundColor: 'rgba(50,50,50, 0.5)'
			}
		]
	};
	return (
		<>
			{clicks_data.length > 0 ? (
				<Bar
					className='bg-white px-10 shadow-md rounded-3xl'
					data={data}
					options={options}
				/>
			) : (
				<div className='flex items-center justify-center h-full'>
					<p className='text-neutral-600 text-xl'>No data</p>
				</div>
			)}
		</>
	);
}

export default BarChart;
