import path from 'path';
import fs from 'fs';
import _ from 'lodash';

/**
 *
 * @param location The location is where it's located the file out of the src folder
 */
export async function getFileContent(location: string, inSrc: boolean = true) {
	var brackets: any;
	var d = '';
	if (inSrc) {
		new Promise(async (res, rej) => {
			await fs.readFile(
				path.join(_.initial(__dirname.split('\\')).toString().replace(/,/g, '/') + location),
				async (e, data) => {
					try {
						d = data.toString();
						brackets = [d.includes('{'), d.includes('}'), d.includes('"')];
						res(true);
					} catch (e) {
						rej(false);
					}
				}
			);
		});
	} else {
		await new Promise(async (res, rej) => {
			await fs.readFile(
				path.join(
					_.initial(_.initial(__dirname.split('\\')))
						.toString()
						.replace(/,/g, '/') + location
				),
				async (e, data) => {
					try {
						d = data.toString();
						brackets = [d.includes('{'), d.includes('}'), d.includes('"')];
					} catch (e) {
						return false;
					}
				}
			);
		});
	}
	if (
		(brackets[0] && brackets[1] && brackets[2]) ||
		location.split('/')[location.length - 1].split('.')[
			location.split('/')[location.length - 1].split('.').length - 1
		] == 'json'
	)
		return JSON.parse(d);
	else return d;
}
