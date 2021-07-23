import { Document } from 'mongoose';

export interface IBoards extends Document {
	bId: string;
	ida: string;
	title: string;
	configId: string;
}

export interface IComments extends Document {
	cId: string;
	comment: string;
	configId: string;
	tkId: string;
}

export interface ILabels extends Document {
	lid: string;
	tid: string;
	title: string;
	ida: string;
	color: string;
}

export interface IMarks extends Document {
	mid: string;
	ida: string;
	amount: string;
	scid: string;
	fid: string;
}

export interface ISettings extends Document {
	setId: string;
	config: Object;
}

export interface ISockets extends Document {
	skId: String;
	sId: string;
	ida: string;
}

export interface ISummaries extends Document {
	sumId: string;
	content: string;
	sumCatId: string;
}

export interface ISummariesCategories extends Document {
	sumCatId: string;
	lId: string;
	parentsIds: string[];
	title: string;
}

export interface ITables extends Document {
	tId: string;
	bId: string;
	tkId: string;
	title: string;
	configId: string;
}

export interface ITasks extends Document {
	tkId: string;
	cId: string;
	tId: string;
	title: string;
	description: string;
	dueDate: string;
	checkList: {
		is: true;
		list: any[];
	};
	commentsId: string;
	labels: string[];
	sorting: number;
}

export interface IUsers extends Document {
	uId: string;
	email: string;
	username: string;
	password: string;
	userType?: number;
	setId: string;
	pin: string;
	comparePassword(password: string): Promise<boolean>;
}

export interface IVocabulary extends Document {
	vId: string;
	word: string;
	definition: string;
	synonymes: string[];
	antonymes: string[];
	examples: string[];
}

export interface ISections extends Document {
	sId: string;
	sType: string;
	sTitle: string;
	ida: string;
	sDescription: string;
	isTable: boolean;
}

export interface ISessions extends Document {
	sId: string;
	ida: string;
	inUse: boolean;
	rId: string;
	i: string;
	compareI(ia: string): Promise<boolean>;
}
