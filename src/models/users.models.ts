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
	if (t.isModified('password')) {
		let salt = await bcrypt.genSalt(12);
		let hash = await bcrypt.hash(t.password, salt);
		t.password = hash;
	}
	next();
});

export default model<IUsers>('users', schema);
