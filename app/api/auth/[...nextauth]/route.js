import { query } from '@/lib/dbconnect';
import { compare, hash } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			async authorize(credentials) {
				const { email, password } = credentials;

				const { rows } = await query(
					'SELECT password FROM users WHERE email = $1',
					[email],
					(err) => {
						if (err) {
							return null;
						}
					}
				);
				const isPasswordValid = await compare(password, rows[0].password);

				if (isPasswordValid) {
					credentials.email = email;
					return credentials;
				} else {
					return null;
				}
			}
		})
	],
	callbacks: {
		async session({ session }) {
			const { email } = session.user;
			const { rows } = await query(
				'SELECT username, user_id FROM users WHERE email = $1',
				[email],
				(err) => {
					if (err) {
						return null;
					}
				}
			);

			session.user.username = rows[0].username;
			session.user.id = rows[0].user_id;
			return session;
		}
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt'
	},
	pages: {
		signIn: '/login',
		signOut: '/',
		error: '/'
	}
});

export { handler as GET, handler as POST };
