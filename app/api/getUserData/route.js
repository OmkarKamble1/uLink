import { query } from '@/lib/dbconnect';

export async function POST(request) {
	console.log("Called the user data method")
	const result = await request.json();
	const { id } = result;

	const { rows: user } = await query('SELECT * FROM users WHERE user_id = $1', [id], (err) => {
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

	if ( rows.length <= 0) {
		return new Response(JSON.stringify({
			success: true,
			userData: 'USERNOTFOUND'
		}),
		{
			status: 200
		}
		);
	}


	const { rows } = await query('SELECT * FROM links WHERE user_id = $1', [id], (err) => {
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

	if ( rows.length > 0 ) {
		return new Response(JSON.stringify({
			success: true,
			userData: rows
		}),
		{
			status: 200
		}
		);
	} else {
		return new Response(JSON.stringify({
			success: true,
			userData: 'LINKSNOTFOUND'
		}),
		{
			status: 200
		}
		);
	}
	
};

