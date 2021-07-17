import { model, Schema } from 'mongoose';
import { ISummaries } from '../helpers/interfaces.helpers';

const schema = new Schema(
	{
		sumId: {
			type: String,
			required: true,
			unique: true,
		},
		content: {
			type: String,
			required: true,
			unique: false,
		},
		sumCatId: {
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

export default model<ISummaries>('summaries', schema);
