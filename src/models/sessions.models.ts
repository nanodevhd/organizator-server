import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { ISessions } from './../helpers/interfaces.helpers';

const schema = new Schema(
	{
		sId: {
			type: String,
			required: true,
			unique: true,
		},
		ida: {
			type: String,
			required: true,
			unique: false,
		},
		inUse: {
			type: Boolean,
			default: false,
			required: false,
			unique: false,
		},
		rId: {
			type: String,
			required: true,
			unique: true,
			default: 'Default RID',
		},
		i: {
			type: String,
			required: true,
			unique: false,
		},
		can: {
			type: Boolean,
			required: false,
			unique: false,
			default: true,
		},
	},
	{
		id: true,
		_id: true,
		timestamps: true,
	}
);

schema.pre<ISessions>('save', async function (next) {
	let salt: string;
	let hash: string;

	if (this.isModified('i')) {
		salt = await bcrypt.genSalt(11);
		hash = await bcrypt.hash(this.i, salt);
		this.i = hash;
	}

	next();
});

schema.methods.compareI = async function (pass: any) {
	const t: any = this;
	return await bcrypt.compare(t.i, pass);
};

export default model<ISessions>('sessions', schema);
