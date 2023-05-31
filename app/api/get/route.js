import { query } from '@/lib/dbconnect';

export async function POST(request) {
	console.log("Called the redirect method")
	const result = await request.json();
	const { id } = result;

	const { rows } = await query('SELECT original_link FROM links WHERE code = $1', [id], (err) => {
		if (err) {
			return new Response(JSON.stringify({
				success: false
			}),
			{
				status: 400
			}
			);
		}}
	);

	if (rows.length > 0) {
		const original_link = rows[0].original_link;
		return new Response(JSON.stringify({
			success: true,
			link: original_link
		}),
		{
			status: 200
		}
		);
	} else {
		return new Response(JSON.stringify({
			success: false
		}),
		{
			status: 400
		}
		);
	}
	
};

