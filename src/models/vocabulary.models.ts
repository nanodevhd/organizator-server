import { model, Schema } from 'mongoose';
import { IVocabulary } from '../helpers/interfaces.helpers';

const schema = new Schema(
	{
		vId /* Vocabulary ID */: {
			type: String,
			required: true,
			unique: true,
		},
		word: {
			type: String,
			required: true,
			unique: true,
		},
		definition: {
			type: String,
			required: true,
			unique: false,
		},
		synonymes: {
			type: Array,
			required: false,
			unique: false,
			default: [],
		},
		antonymes: {
			type: Array,
			required: false,
			unique: false,
			default: [],
		},
		examples: {
			type: Array,
			required: false,
			unique: false,
			default: [],
		},
	},
	{
		id: true,
		_id: true,
		timestamps: true,
	}
);

export default model<IVocabulary>('vocabulary', schema);
