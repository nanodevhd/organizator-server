import { Request, Response } from 'express';
import codeStatus from '../helpers/code.status';
import Boards from '../models/boards.models';
import authentificator from '../middlewares/authentificator.middleware';
import { userDataReturnsAuthentificatorOnStatus1 } from '../helpers/types.helpers';
import { genIDs } from '../auth/identifires.auth';
import Settings from '../models/settings.models';

export async function createBoard(req: Request, res: Response) {
	var userData: userDataReturnsAuthentificatorOnStatus1 = { uId: '', sId: '' };
	let r;
	let z = 0;
	await new Promise(async (rs, rj) => {
		r = await authentificator(req);
		if (String(r[0]) != '1' && !r[1].ok && r[1].message != 'OK') return res.status(r[0]).json(r[1]);
		rs(true);
	});

	if (!req.body.bname)
		return res.status(codeStatus.bad_request).json({ ok: false, message: 'No data sent' });

	let ids = genIDs(['bId']);
	await new Promise(async (rs, rj) => {
		z = 0;
		let isd;
		do {
			isd = genIDs(['setId']);
			const s = new Settings({
				setId: isd.setId[1],
				config: {},
			});

			await s.save((e: any) => {
				if (!e) z++;
			});
		} while (z == 0);
		ids['setId'] = isd.setId;
		rs(true);
	});
	await new Promise(async (rs, rj) => {
		do {
			let b = new Boards({
				bId: ids.bId[1],
				title: req.body.bname,
				configId: ids.setId,
				ida: userData.uId,
			});
			await new Promise(async (rrs, rjj) => {
				await b.save((e: any) => {
					if (!e) z++;
				});
				rrs(true);
			});
			rs(true);
		} while (z == 0);
	});
}
