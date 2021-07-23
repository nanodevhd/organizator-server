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
		await new Promise(async (res, rej) => {
			await fs.readFile(
				path.join(_.initial(__dirname.split('\\')).toString().replace(/,/g, '/') + location),
				async (e, data) => {
					try {
						d = data.toString();
						brackets = [d.includes('{'), d.includes('}'), d.includes('"')];
						res(true);
					} catch (e) {
						return false;
					}
				}
			);
		});
		return brackets[0] && brackets[1] && brackets[2] ? JSON.parse(d) : d;
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
						res(true);
					} catch (e) {
						return false;
					}
				}
			);
		});
		return brackets[0] && brackets[1] && brackets[0] ? JSON.parse(d) : d;
	}
}
