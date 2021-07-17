import chalk from 'chalk';
import { TLogger } from '../helpers/types.helpers';

const debug = console.log;
const separation = '';

export default function log(type: TLogger, log: string, info?: 'block' | 'start', t?: number) {
	let res: string = '';
	if (type == 'server') {
		res = `${chalk.bold.blueBright('[SERVER]')}${
			info == 'start' ? chalk.bold.green(' Started') : ''
		} ${chalk.white(log)}`;
	} else if (type == 'cors') {
		if (info == 'block') {
			res = `${chalk.magenta('[CORS]')}${separation}${chalk.red('[Block]')} ${chalk.white(log)}`;
		} else if (info == 'start') {
			res = `${chalk.magenta('[CORS]')} ${chalk.bold.green('Started')} ${chalk.white(log)}`;
		} else {
			res = `${chalk.magenta('[CORS]')}${separation}${chalk.white(log)}`;
		}
	} else if (type == 'database') {
		res = `${chalk.yellow.bgBlack('[Database]')} ${
			info == 'start' ? chalk.bold.green('Started') : ''
		} ${chalk.white(log)}`;
	} else if (type == 'error') {
		res = `${chalk.red('[ERROR]')}${
			info == 'start' ? chalk.bold.green(' Started') : ''
		} ${chalk.white(log)}`;
	} else if (type == 'log') {
		res = `${chalk.white('[LOG]')}${
			info == 'start' ? chalk.bold.green(' Started') : ''
		} ${chalk.white(log)}`;
	} else if (type == 'socket') {
		res = `${chalk.blueBright('[Server]')}${separation}${chalk.blueBright(
			'[Socket]'
		)} ${chalk.white(log)}`;
	}
	if (t || String(t) == '0') {
		t = Number(t);
		if (t <= 25) {
			res += ` ${chalk.bold.green(` +${t}ms`)}`;
		} else if (t > 25 && t < 1000) {
			res += ` ${chalk.bold.rgb(255, 125, 0).bgBlack(` +${t}ms`)}`;
		} else {
			res += ` ${chalk.bold.red(` +${t}ms`)}`;
		}
	}
	debug(res);
}
