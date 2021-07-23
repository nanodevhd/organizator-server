import { Application } from 'express';
import cors from 'cors';
import log from '../utils/logger.utils';

export default class Cors {
	private options: cors.CorsOptions;
	constructor(private app: Application, private hosts: any, private time: number, private p: any) {
		this.options = {
			methods: ['POST', 'PUT', 'DELETE', 'OPTIONS'],
			credentials: true,
		};
		this.data();
		this.setup();
	}
	private data() {
		this.options.origin = (origin: any, callback) => {
			if (this.hosts.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(null, false);
			}
		};
	}
	private setup() {
		this.app.use(cors(this.options));
		this.p.res(true);
		log('cors', 'CORS initializated', 'start', Date.now() - this.time);
	}
}
