import mongoose, { ConnectOptions } from 'mongoose';
import log from '../utils/logger.utils';

export default class {
	private options = {};
	private connection: any;

	constructor(private time: number, private pro: any) {
		this.init();
		this.connect();
		this.handler();
	}

	private async init() {
		mongoose.Promise = global.Promise;
		this.options = {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		};
	}
	private connect() {
		mongoose.connect(`${process.env.MONGO_BASE_URI}${process.env.MONGO_DB_NAME}`, this.options);

		this.connection = mongoose.connection;
	}
	private handler() {
		this.connection.on('open', () => {
			log('database', 'MongoDB Database initializated', 'start', Date.now() - this.time);
			this.pro.res(true);
		});

		this.connection.on('error', (err: Error) => {
			log('error', 'MongoDB Error');
			this.pro.rej(err);
			process.exit(0);
		});
	}
}
