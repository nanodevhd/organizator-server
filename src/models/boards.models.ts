import { model, Schema } from 'mongoose';
import { IBoards } from '../helpers/interfaces.helpers';

const schema = new Schema(
	{
		bId: {
			type: String,
			required: true,
			unique: true,
		},
		ida: {
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
	},
	{
		id: true,
		_id: true,
		timestamps: true,
	}
);

export default model<IBoards>('boards', schema);
