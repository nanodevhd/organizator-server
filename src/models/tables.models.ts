import { model, Schema } from 'mongoose';
import { ITables } from '../helpers/interfaces.helpers';

const schema = new Schema(
	{
		tId: {
			type: String,
			required: true,
			unique: true,
		},
		bId: {
			type: String,
			required: true,
			unique: false,
		},
		tkId /* Task ID */: {
			type: String,
			required: true,
			unique: true,
		},
		title: {
			type: String,
			required: true,
			unique: false,
		},
		configId: {
			type: String,
			required: true,
			unique: true,
		},
		columns: {
			type: Array,
			unique: false,
			required: true,
		},
	},
	{
		id: true,
		_id: true,
		timestamps: true,
	}
);

export default model<ITables>('tables', schema);
