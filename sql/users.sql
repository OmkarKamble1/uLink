CREATE TABLE users (
	user_id uuid DEFAULT uuid_generate_v4(),
	email VARCHAR(255) NOT NULL UNIQUE,
	username VARCHAR(15) NOT NULL,
	password VARCHAR(255) NOT NULL,
	created_at VARCHAR(30)
);