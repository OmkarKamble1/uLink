import { query } from '@/lib/dbconnect';
import { hash } from 'bcrypt';

export async function POST(request) {
	console.log("Called the signup method")
	const result = await request.json();
	const { email, username, password } = result;

	const now = new Date();
	const created_at = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
	
	const hashedPassword = await hash(password, 10);
	
	try {
		const { rows } = await query('INSERT INTO public.users (email, username, password, created_at) VALUES ($1, $2, $3, $4) RETURNING user_id', [email, username, hashedPassword, created_at], (err) => {
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
	
		return new Response(JSON.stringify({
			success: true,
			id: rows[0].user_id,
			username: username
		}),
		{
			status: 200
		}
		);
	} catch {
		return new Response(JSON.stringify({
		success: true,
		message: 'EXISTS'
	}),
	{
		status: 200
	}
	);
	}
	
	
};

