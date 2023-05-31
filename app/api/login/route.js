import { query } from '@/lib/dbconnect';

export async function POST(request) {
	console.log("Called the login method")
	const result = await request.json();
	const { email, password } = result;

	const { rows } = await query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (err) => {
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

	if (rows[0]){
		return new Response(JSON.stringify({
			success: true,
			id: rows[0].user_id,
			username: rows[0].username
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
			status: 401
		}
		);
	}
	 
};

