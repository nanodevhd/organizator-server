import { model, Schema } from 'mongoose';
import { IUsers } from '../helpers/interfaces.helpers';
import bcrypt from 'bcrypt';

const schema = new Schema(
	{
		uId: {
			type: String,
			unique: true,
			required: false,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			unique: true,
		},
		userType: {
			type: Number,
			required: false,
			unique: false,
			default: 0,
		},
		setId: {
			type: String,
			required: false,
			unique: true,
		},
		pin: {
			type: String,
			required: true,
			unique: false,
		},
	},
	{
		id: true,
		_id: true,
		timestamps: true,
	}
);

schema.pre('save', async function (next) {
	const t: any = this;
	let salt;
	let hash;
	if (t.isModified('password')) {
		salt = await bcrypt.genSalt(12);
		hash = await bcrypt.hash(t.password, salt);
		t.password = hash;
	}
	if (t.isModified('pin')) {
		salt = await bcrypt.genSalt(10);
		hash = await bcrypt.hash(t.pin, salt);
		t.pin = hash;
	}
	next();
});

schema.methods.comparePassword = async function (pass: any) {
	const t: any = this;
	return await bcrypt.compare(t.password, pass);
};

export default model<IUsers>('users', schema);
