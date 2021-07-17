import express from 'express';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import log from '../utils/logger.utils';
import MongoDB from '../databases/mongo.databases';
import Cors from '../security/cors.security';
import { EventEmitter } from 'events';
import morgan from 'morgan';
import router from './../router/router';

class EventsEmiter extends EventEmitter {}

export default class App {
	private time: number;
	private app: express.Application;
	private corsHosts: string[];
	private pCount: number;

	constructor(private portNum?: number) {
		log('server', 'Initializating the server ...', 'start', 0);
		this.app = express();
		this.corsHosts = [];
		this.time = Date.now();
		this.pCount = 0;
		this.init();
	}

	private async init() {
		var count = 0;
		await new Promise(async (pResolve, pReject) => {
			await new Promise(async (res, rej) => {
				await this.config({ res, rej });
			});
			await new Promise(async (res, rej) => {
				await this.databases({ res, rej });
			});
			await new Promise(async (res, rej) => {
				await this.security({ pRes: res, pRej: rej });
			});
			await new Promise(async (res, rej) => {
				await this.middlewares({ pRes: res, pRej: rej });
			});
			await new Promise(async (res, rej) => {
				await this.router({ pRes: res, pRej: rej }, Date.now());
			});
			count++;
			pResolve(true);
		});
		if (count == 1) this.run(Date.now());
	}

	private async config({ res, rej }: any) {
		this.app.set('port', this.portNum || process.env.PORT);
		this.time = Date.now();
		await fs.readFile(
			path.join(
				_.initial(__dirname.split('\\')).toString().replace(/,/g, '/') + '/data/hosts.json'
			),
			async (e, data) => {
				try {
					let j: any = JSON.parse(data.toString());
					j.cors.forEach((h: string) => {
						this.corsHosts.push(h.toString());
					});
					log('server', 'Geted the hosts for CORS', 'start', Date.now() - this.time);
					if (j.cors.length == this.corsHosts.length) {
						res(true);
					}
				} catch (e) {
					log('error', 'Error opening the hosts.');
					rej(e);
					process.exit(0);
				}
			}
		);
	}

	private async databases({ res, rej }: any) {
		await new MongoDB(Date.now(), { res, rej });
	}

	private async security({ pRes, pRej }: any) {
		var count = 0;
		await new Promise(async (resolve, reject) => {
			await new Cors(this.app, this.corsHosts, Date.now(), { res: resolve, rej: reject });
			count++;
		});
		await new Promise(async (res, rej) => {
			// TODO: Helmet Intergration
			// Here goes all the config and setup of helmet security
			count++;
			res(true);
		});
		if (count == 2) {
			pRes(true);
		} else {
			pRej(false);
		}
	}

	private async middlewares({ pRes, pRej }: any) {
		var count = 0;
		var middlewaresCount = 3;
		await new Promise(async (res, rej) => {
			this.app.use(express.urlencoded({ extended: false }));
			count++;
			res(true);
		});
		await new Promise(async (res, rej) => {
			this.app.use(express.json());
			count++;
			res(true);
		});
		await new Promise(async (res, rej) => {
			this.app.use(morgan('dev'));
			count++;
			res(true);
		});
		if (count == middlewaresCount) pRes(true);
	}

	private router({ pRes, pRej }: any, time: number) {
		this.app.use(router);
		log('server', 'Routes initializated', 'start', Date.now() - time + 1);
		pRes(true);
	}

	private socket() {}

	private run(time: number) {
		this.app.listen(5000, () => {
			log('server', 'Listening on port 5000', 'start', Date.now() - time);
		});
	}
}
