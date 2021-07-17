import { model, Schema } from 'mongoose';
import { ITasks } from '../helpers/interfaces.helpers';

const schema = new Schema(
	{
		tkId: {
			type: String,
			required: true,
			unique: true,
		},
		cId: {
			type: String,
			required: true,
			unique: false,
		},
		tId: {
			type: String,
			required: true,
			unique: false,
		},
		title: {
			type: String,
			required: true,
			unique: false,
		},
		description: {
			type: String,
			required: true,
			unique: false,
		},
		dueDate: {
			type: Date,
			required: true,
			unique: false,
		},
		checkList: {
			is: {
				type: Boolean,
				requried: true,
				unique: false,
			},
			list: {
				type: Array,
				required: false,
				unique: false,
			},
		},
		labels: {
			type: Array,
			required: false,
			default: [],
			unique: false,
		},
		sorting: {
			type: Number,
			required: false,
			unique: false,
			default: 0,
		},
	},
	{
		id: true,
		_id: true,
		timestamps: true,
	}
);

export default model<ITasks>('tasks', schema);
