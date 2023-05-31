// import * as pg from 'pg';

// const { Pool } = pg.default;

// if (!global.db) {

// 	global.db = { pool: null };

// }

// export const query = async (q, params) => {

// 	if (!global.db.pool) {

// 		global.db.pool = await new Pool({
// 				user: process.env.PGUSER,
// 				host: process.env.PGHOST,
// 				database: process.env.PGDATABASE,
// 				password: process.env.PGPASSWORD,
// 				port: process.env.PGPORT,
// 				max: 10
// 		});

// 		global.db.pool.on('error', (err) => {
	
// 			throw Error("Postgres connection error: " + err);
	
// 		});

// 	}
	
// 	const { rows, rowCount } = await global.db.pool.query(q, params);
	
// 	return { rows, rowCount };
// }

import * as pg from 'pg';

const client = new pg.Client(process.env.DBURL);
client.connect()

export const query = async (q, params) => {
	
	const { rows, rowCount } = await client.query(q, params);
	
	return { rows, rowCount };
	
}

