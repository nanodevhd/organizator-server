import { model, Schema } from 'mongoose';
import { ISettings } from '../helpers/interfaces.helpers';

const schema = new Schema(
	{
		setId: {
			type: String,
			required: true,
			unique: true,
		},
		config: {
			type: Object,
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

export default model<ISettings>('settings', schema);
