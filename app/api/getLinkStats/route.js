import { query } from '@/lib/dbconnect';

export async function POST(request) {
	const result = await request.json();
	const { link_id } = result;

	const { rows } = await query(
		'SELECT * FROM links WHERE link_id = $1',
		[link_id],
		(err) => {
			if (err) {
				return new Response(
					JSON.stringify({
						success: false
					}),
					{
						status: 400
					}
				);
			}
		}
	);

	const aa = [
		{
			link_id: '938cfdbd-a45e-439c-abcf-6e79337cd5a4',
			user_id: '27d201c9-3781-4c19-b76a-1fc539ae0029',
			original_link: 'http://omkarkamble.tech',
			code: 'lc0it8',
			short_link: 'ulinkk.vercel.app/lc0it8',
			is_monitized: false,
			created_at: '24-5-2023 21:46',
			views: 4,
			stats: [
				{
					city: 'Mumbai',
					state: 'Maharashtra',
					country: 'India',
					timestamp: 1687623419270
				},
				{
					city: 'Mumbai',
					state: 'Maharashtra',
					country: 'India',
					timestamp: 1687623423821
				}
			]
		}
	];
	// if link found

	if (rows.length > 0) {
		const { original_link, short_link, created_at, views, stats } = rows[0];

		const countries = [];
		let top_country;
		let last_clicked;
		const click_dates = [];

		if (stats.length > 0) {
			const date = new Date(stats[stats.length - 1].timestamp);
			last_clicked = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
			// [{
			// 	name: 'India',
			// 	count: 1
			// }]

			await stats.forEach((obj) => {
				if (countries.length === 0) {
					countries.push({
						name: obj.country,
						state: obj.state,
						city: obj.city,
						count: 1
					});
				} else {
					countries.forEach((e) => {
						if (e.name === obj.country) {
							e.count += 1;
						} else {
							countries.push({
								name: obj.country,
								state: obj.state,
								city: obj.city,
								count: 1
							});
						}
					});
				}
			});

			// [{
			// 	name: 'India',
			// 	state: obj.state,
			// 	city: obj.city,
			// 	count: 1
			// }]

			top_country = countries[0];

			countries.forEach((country) => {
				if (country.count > top_country.count) {
					top_country = country;
				}
			});

			await stats.forEach((obj) => {
				if (click_dates.length === 0) {
					click_dates.push({ timestamp: obj.timestamp, clicks: 1 });
				} else {
					click_dates.forEach((e) => {
						if (Math.abs(e.timestamp - obj.timestamp) <= 86400000) {
							e.clicks += 1;
						} else {
							click_dates.push({ timestamp: obj.timestamp, clicks: 1 });
						}
					});
				}
			});
		}

		// [{
		// 	date: 1687623423821,
		// 	clicks: 1
		// }]

		return new Response(
			JSON.stringify({
				success: true,
				original_link: original_link,
				short_link: short_link,
				created_at: created_at,
				views: views,
				last_clicked: last_clicked,
				countries_data: countries,
				clicks_data: click_dates,
				top_country: top_country
			}),
			{
				status: 200
			}
		);
	} else {
		return new Response(
			JSON.stringify({
				success: false
			}),
			{
				status: 400
			}
		);
	}
}
