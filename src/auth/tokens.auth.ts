import jwt from 'jsonwebtoken';

export function generateTokens(sid: string, rid: string) {
	return {
		accesToken: jwt.sign({ sid }, String(process.env.JWT_ACCES), {
			expiresIn: '5m',
		}),
		refreshToken: jwt.sign({ rid }, String(process.env.JWT_REFRESH)),
	};
}

export function decodeTokens(token: string) {
	return jwt.decode(token);
}
