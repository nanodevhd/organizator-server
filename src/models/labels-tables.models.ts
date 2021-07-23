import { model, Schema } from 'mongoose';
import { ILabels } from '../helpers/interfaces.helpers';

const schema = new Schema(
	{
		lid: {
			type: String,
			required: true,
			unique: true,
		},
		tid: {
			type: String,
			required: true,
			unique: true,
		},
		title: {
			type: String,
			required: true,
			unique: true,
		},
		ida: {
			type: String,
			required: true,
			unique: true,
		},
		color: {
			type: String,
			required: true,
			unique: true,
			default: '#fff',
		},
	},
	{
		id: true,
		_id: true,
		timestamps: true,
	}
);

export default model<ILabels>('labels', schema);
