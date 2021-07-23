import { Request, Response } from 'express';
import codeStatus from '../helpers/code.status';
import { genIDs, getID, regenId } from './../auth/identifires.auth';
import User from '../models/users.models';
import Settings from '../models/settings.models';
import { getFileContent } from '../utils/files.utils';
import Socket from '../models/sockets.models';
import { generateTokens } from '../auth/tokens.auth';
import Sessions from '../models/sessions.models';
import { Session } from 'node:inspector';
import { userInfo } from 'os';

export function signUp(req: Request, res: Response) {
	if (
		!req.body.email ||
		!req.body.password ||
		!req.body.username ||
		!req.body.pin ||
		!req.socket?.remoteAddress
	)
		return res.status(codeStatus.bad_request).json({ ok: false, message: 'Missing Data' });

	setTimeout(async () => {
		let config: any;
		let iSet: any;
		let iSid: any;
		let iSck: any;
		let ids = genIDs(['uId', 'setId', 'skId', 'sId', 'rId']);
		let z = 0;
		let s = 0;

		do {
			const u = new User({
				email: req.body.email,
				password: req.body.password,
				username: req.body.username,
				pin: req.body.pin,
				uId: ids.uId[1],
				setId: ids.setId[0],
			});

			await new Promise(async (rs, rj) => {
				await u.save((e: any) => {
					if (e) {
						if (e.code == 11000) {
							let em = JSON.stringify(e.keyValue)
								.replace('{', '')
								.replace('}', '')
								.replace(/"/g, '')
								.split(':');

							if (em[0] == 'email' || em[0] == 'username')
								return res
									.status(codeStatus.already_exists)
									.json({ ok: false, message: `The ${em[0]} already exists.` });
							else rs(true);
						}
					} else {
						z++;
						rs(true);
					}
				});
			});
		} while (z == 0);

		await new Promise(async (rs, rej) => {
			config = await getFileContent('/data/deafult-user.config.json');
			rs(true);
		});

		z = 0;
		s = 0;

		do {
			if (s != 0) iSet = genIDs(['setId']);
			else iSet = ids;

			let settings = new Settings({
				setId: iSet.setId[1],
				config,
			});
			await new Promise(async (rs, rej) => {
				await settings.save((e: any) => {
					if (!e) {
						if (s != 0) {
							ids.setId = iSet.setId;
						}
						z++;
						rs(true);
					} else s++;
				});
			});
		} while (z == 0);

		z = 0;
		s = 0;

		do {
			if (s != 0) iSck = genIDs(['skId']);
			else iSck = ids;
			let sock = new Socket({
				skId: iSck.skId[1],
				ida: ids.uId[1],
			});
			await new Promise(async (rs, rej) => {
				await sock.save((e: any) => {
					if (!e) {
						if (s != 0) {
							ids.skId = iSck.skId;
						}
						z++;
						rs(true);
					} else s++;
				});
			});
		} while (z == 0);

		z = 0;
		s = 0;

		do {
			if (s != 0) iSid = genIDs(['sId', 'rId']);
			else iSid = ids;
			let ses = new Sessions({
				sId: iSid.sId[1],
				ida: ids.uId[1],
				inUse: false,
				rId: iSid.rId[1],
				i: req.socket?.remoteAddress,
			});
			await new Promise(async (rs, rej) => {
				ses.save((e: any) => {
					if (!e) {
						if (s != 0) {
							ids.sId = iSid.sId;
							ids.rId = iSid.rId;
						}
						z++;
						rs(true);
					}
				});
			});
		} while (z == 0);

		return res
			.cookie('sId', `${ids.sId[1]}`)
			.status(codeStatus.succes)
			.json({ ok: true, dev: true });
	}, 0);
}

export async function signIn(req: Request, res: Response) {
	if ((!req.body.username && !req.body.email) || !req.body.password)
		return res.status(codeStatus.bad_request).json({ ok: false, message: 'Missing Data' });

	if ((req.body.email == '' && req.body.username == '') || req.body.password == '')
		return res.status(codeStatus.bad_request).json({ ok: false, message: "Data can't be empty" });

	let inputs = [
		req.body.email && req.body.email.includes('@') && !req.body.username
			? req.body.email
			: req.body.username,
		req.body.password,
		req.cookies.sId,
	];
	let user: any;
	let tokens: any;
	let z = 0;
	let iSid: any;
	let ids: any = {};
	let sren = 0;

	const userExists = await new Promise(async (resolve, rej) => {
		if (inputs[0].includes('@')) {
			user = await User.findOne({ email: String(inputs[0]) });
			console.log(user);
		} else {
			user = await User.findOne({ email: String(inputs[0]) });
		}
		if (user) resolve(true);
		else resolve(false);
	});

	if (!userExists)
		return res.status(codeStatus.succes).json({ ok: false, message: 'No user found' });

	ids['uId'] = regenId(user.uId);
	let passMatch: any;
	await new Promise(async (rs, rj) => {
		passMatch = await user.comparePassword(inputs[1]);
		if (passMatch)
			return res.status(codeStatus.forbidden).json({ ok: false, message: 'Incorrect Password' });
		else rs(true);
	});

	let sId = req.cookies.sId;
	let sessionData: any;

	if (sId) {
		const ses: any = await Sessions.findOne({ sId });
		if (ses == null)
			return res.status(codeStatus.not_found).json({ ok: false, message: 'Not found SID' });
		else sessionData = ses;
	} else {
		const ses: any = await Sessions.findOne({ uId: ids['uId'] });
		if (ses == null)
			return res.status(codeStatus.not_found).json({ ok: false, message: 'No sessions found' });
		else sessionData = ses;
	}

	let iMatch: any;
	await new Promise(async (rs, rj) => {
		iMatch = await sessionData.compareI(req.socket?.remoteAddress);
		if (iMatch) rs(true);
		else {
			sren++;
			z = 0;
			do {
				iSid = genIDs(['sId', 'rId']);
				let ses = new Sessions({
					sId: iSid.sId[1],
					ida: user.uId,
					inUse: false,
					rId: iSid.rId[1],
					i: req.socket?.remoteAddress,
				});
				await new Promise(async (rs, rej) => {
					ses.save((e: any) => {
						if (!e) {
							ids['sId'] = iSid.sId[0];
							ids['rId'] = iSid.rId[0];

							z++;
							rs(true);
						}
					});
				});
			} while (z == 0);
			rs(true);
		}
	});

	tokens = generateTokens(ids.sId, ids.rId);

	if (sren == 0) ids.sId = req.cookies.sId;
	if (req.cookies.sId != ids.sId) res.cookie('sId', ids.sId);

	return res
		.cookie('AT', tokens.accesToken)
		.cookie('RT', tokens.refreshToken)
		.status(codeStatus.succes)
		.json({ ok: true, dev: true });
}

export async function signOut(req: Request, res: Response) {}
