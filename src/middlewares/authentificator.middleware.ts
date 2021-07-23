import { Request } from 'express';
import { decodeTokens } from '../auth/tokens.auth';
import codeStatus from '../helpers/code.status';
import Sessions from '../models/sessions.models';
import { getID } from '../auth/identifires.auth';
import { TReturnsAuthentificator } from './../helpers/types.helpers';

export default async function authentificator(req: Request): Promise<TReturnsAuthentificator> {
	if (!req.headers.authorization && !req.cookies.AT)
		return [Number(codeStatus['forbidden']), { ok: false, message: 'No token sended' }];

	let token: any;
	if (req.headers.authorization) {
		token = req.headers.authorization?.replace('Bearer ', '');
	} else if (req.cookies.AT) {
		token = req.cookies.AT;
	}
	let tokenData: any = decodeTokens(token);

	if (!tokenData.sid)
		return [codeStatus['token_invalid'], { ok: false, message: 'The token is invalid' }];

	let sessionContent: any;
	let sId = getID(tokenData.sid, 'uid');

	await new Promise(async (rs, rej) => {
		const k = await Sessions.findOne({ sId });

		if (k == null) sessionContent = false;
		else sessionContent = k;
		rs(true);
	});

	if (sessionContent == false)
		return [codeStatus['token_invalid'], { ok: false, message: 'Invalid SID' }];

	const uId = sessionContent.ida;

	return [1, { ok: true, message: 'OK', userData: { uId, sId } }];
}
