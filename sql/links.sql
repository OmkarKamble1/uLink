CREATE TABLE links (
	link_id uuid DEFAULT uuid_generate_v4(),
	user_id uuid NOT NULL,
	original_link VARCHAR(500) NOT NULL,
	code VARCHAR(15) NOT NULL,
	short_link VARCHAR(50),
	is_monitized BOOLEAN,
	created_at VARCHAR(30)
);

