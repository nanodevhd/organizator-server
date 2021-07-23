import { model, Schema } from 'mongoose';
import { ISockets } from '../helpers/interfaces.helpers';

const schema = new Schema(
	{
		skId: {
			type: String,
			required: true,
			unique: true,
		},
		sId: {
			type: Array,
			required: false,
			unique: false,
			default: [],
		},
		ida: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		id: true,
		_id: true,
		timestamps: true,
	}
);

export default model<ISockets>('sockets', schema);
