import { model, Schema } from 'mongoose';
import { ISummariesCategories } from '../helpers/interfaces.helpers';

const schema = new Schema(
	{
		sumCatId: {
			type: String,
			required: true,
			unique: true,
		},
		lId /* Label ID */: {
			type: String,
			required: true,
			unique: false,
		},
		parentsIds: {
			type: Array,
			required: true,
			unique: true,
		},
		title: {
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

export default model<ISummariesCategories>('summariesCategories', schema);
