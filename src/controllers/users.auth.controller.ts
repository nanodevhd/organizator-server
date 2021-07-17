import { Request, Response } from 'express';
import codeStatus from '../helpers/code.status';
import { genIDs } from './../auth/identifires.auth';
import User from '../models/users.models';
import Settings from '../models/settings.models';
import { getFileContent } from '../utils/files.utils';
import Socket from '../models/sockets.models';

export async function signUp(req: Request, res: Response) {
	if (!req.body.email || !req.body.password || !req.body.username || !req.body.pin) {
		return res.status(codeStatus.bad_request).json({ ok: false, message: 'Missing Data' });
	}
	if (
		req.body.email == '' ||
		req.body.password == '' ||
		req.body.username == '' ||
		req.body.pin == ''
	) {
		return res.status(codeStatus.bad_request).json({ ok: false, message: "Data can't be empty" });
	}
	let ids = genIDs(['uId', 'setId']);
	let z = 0;

	// Users config
	await new Promise(async (fRes, fRej) => {
		do {
			await new Promise(async (pRes, pRej) => {
				let u = new User({
					email: req.body.email,
					password: req.body.password,
					username: req.body.username,
					pin: req.body.pin,
					uId: ids.uId[1],
					setId: ids.setId[1],
				});
				await new Promise(async (resolve, rej) => {
					await u.save(async (e: any) => {
						if (e) {
							const err: any = e;
							if (err.code == 11000) {
								let em = JSON.stringify(err.keyValue)
									.replace('{', '')
									.replace('}', '')
									.replace(/"/g, '')
									.split(':');
								if (em[0] != 'funcId' && em[0] != 'uid' && em[0] != 'sid' && em[0] != 'setId')
									return res
										.status(codeStatus.already_exists)
										.json({ ok: false, message: `The ${em[0]} already exists` });
							}
						} else {
							z++;
						}
					});
					resolve(true);
				});
				pRes(true);
			});
		} while (z == 0);
		fRes(true);
	});

	// Settings
	let defaultConfig = {};

	await new Promise(async (resolve, rej) => {
		const data = await getFileContent('/data/deafult-user.config.json');
		if (data) {
			defaultConfig = data;
			resolve(true);
		} else {
			return res.status(codeStatus.internal_server_error).json({ ok: false });
			rej(false);
		}
	});

	await new Promise(async (fRes, fRej) => {
		z = 0;
		do {
			let s = new Settings({
				setId: ids.setId[0],
				config: defaultConfig,
			});
			s.save((e: any) => {
				try {
					z++;
				} catch (e) {}
			});
		} while (z == 0);
		fRes(true);
	});

	// Socket Opening
	let sk = [];
	sk.push(genIDs('skId')['skId']);
	await new Promise(async (reoslve, rej) => {
		let s = new Socket({});
	});
}

export async function signIn(req: Request, res: Response) {}

export async function signOut(req: Request, res: Response) {}
