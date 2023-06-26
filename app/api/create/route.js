import { customAlphabet } from 'nanoid';
import { query } from '@/lib/dbconnect';

export async function POST(request) {
	const result = await request.json();
	let { link, id: uuid } = result;

	if (link.indexOf('http://') == 0 || link.indexOf('https://') == 0) {
	} else {
		link = `http://${link}`;
	}

	const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz');
	let id = nanoid(6);
	if (id === 'create' || id === 'login') {
		id = nanoid(6);
	}
	const shortLink = `ulinkk.vercel.app/${id}`;

	const now = new Date();
	const created_at = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

	const { rows } = await query(
		'INSERT INTO public.links (original_link, code, short_link, is_monitized, created_at, user_id) VALUES ($1, $2, $3, $4, $5, $6)',
		[link, id, shortLink, false, created_at, uuid],
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

	await query('UPDATE users SET total_links = total_links + 1');

	return new Response(
		JSON.stringify({
			success: true,
			shortLink,
			id
		}),
		{
			status: 200
		}
	);
}
