import { model, Schema } from 'mongoose';
import { ISections } from './../helpers/interfaces.helpers';

// Sections like for the marks
const schema = new Schema(
	{
		sId: {
			type: String,
			required: true,
			unique: true,
		},
		sType: {
			type: String,
			requried: true,
			unique: false,
		},
		sTitle: {
			type: String,
			required: true,
			unique: false,
		},
		ida: {
			type: String,
			required: true,
			unique: true,
		},
		sDescription: {
			type: String,
			required: false,
			unique: false,
			defulat: 'default',
		},
		isTable: {
			type: Boolean,
			required: false,
			unique: false,
			default: true,
		},
	},
	{
		id: true,
		_id: true,
		timestamps: true,
	}
);

export default model<ISections>('sections', schema);
