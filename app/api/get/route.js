import { query } from '@/lib/dbconnect';

export async function POST(request) {
	const result = await request.json();
	const { id, stats } = result;

	/// stats example
	// {
	// 	timestamp: 1687618438164,
	// 	country: 'India',
	// 	state: 'Maharashtra',
	// 	city: 'Mumbai'
	//	}

	const { rows } = await query(
		'UPDATE links SET views = views + 1, stats = stats || $1 WHERE code = $2 RETURNING original_link',
		[stats, id],
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
	// if link found
	if (rows.length > 0) {
		const original_link = rows[0].original_link;
		return new Response(
			JSON.stringify({
				success: true,
				link: original_link
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
