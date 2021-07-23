export type TLogger = 'server' | 'error' | 'socket' | 'cors' | 'log' | 'database';

export type userDataReturnsAuthentificatorOnStatus1 = {
	uId: string;
	sId: string;
};

type TReturnsObjAuthentificator = {
	ok: boolean;
	message: string;
	userData?: userDataReturnsAuthentificatorOnStatus1;
};

export type TReturnsAuthentificator = [number, TReturnsObjAuthentificator];
