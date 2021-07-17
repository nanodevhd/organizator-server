import { model, Schema } from 'mongoose';
import { IComments } from '../helpers/interfaces.helpers';

const schema = new Schema(
	{
		cId: {
			type: String,
			required: true,
			unique: true,
		},
		comment: {
			type: String,
			required: true,
			unique: false,
		},
		configId: {
			type: String,
			required: true,
			unique: true,
		},
		tkId: {
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

export default model<IComments>('comments', schema);
