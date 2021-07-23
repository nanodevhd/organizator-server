import { model, Schema } from 'mongoose';
import { IMarks } from '../helpers/interfaces.helpers';

const schema = new Schema(
	{
		mid /* Mark ID */: {
			type: String,
			required: true,
			unique: true,
		},
		ida: {
			type: String,
			required: true,
			unique: true,
		},
		amount: {
			type: String,
			required: true,
			unique: true,
		},
		scid /* Section ID */: {
			type: String,
			required: true,
			unique: true,
		},
		fid: {
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

export default model<IMarks>('marks', schema);
