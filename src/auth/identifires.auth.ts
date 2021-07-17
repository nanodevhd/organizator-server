// O: Public | 1: Private
import log from '../utils/logger.utils';
import { v4 as genUUID, parse as UUIDParser } from 'uuid';
import { nanoid } from 'nanoid';

function changeUUID(k: any): string[] {
	k = k.toString().replace(/,/g, '');
	let x = [
		k.substring(0, 8),
		k.substring(8, 12),
		k.substring(12, 16),
		k.substring(16, 20),
		k.substring(20, 32),
	];
	return x;
}

function genID(isUid: boolean): [string, string] {
	let id: string = '';
	let pId: string = '';
	let bytes: any;
	let j: any;
	let k: any;
	let e: string[];
	let aId: [string, string, string];

	aId = [genUUID(), 'P', genUUID()];
	id = `${aId[0]}${aId[1]}${aId[2]}`;
	bytes = UUIDParser(id);
	j = [...bytes].map((v) => v.toString(16).padStart(2, '0'));
	k = j;
	for (var i = 0; i < j.length; i++) {
		let a = i + 9;
		while (a > 15 || a < 0) {
			if (a > 15) {
				a -= 16;
			} else {
				a += 16;
			}
		}
		k[i] = j[a];
	}
	e = changeUUID(k);

	if (isUid) {
		pId = `${nanoid(25)}#${aId[0]}${aId[1]}${nanoid(16)}${aId[1]}${aId[2]}&${nanoid(75)}`;
	} else {
		pId = `${nanoid(36)}${id}${aId[1]}${nanoid(5)}`;
	}

	return [pId, id];
}

export function genIDs(config: string | string[]) {
	var result: any = {};
	if (typeof config == 'string') {
		result[config] = genID(config === 'uId');
	} else {
		for (var i = 0; i < config.length; i++) {
			result[config[i]] = genID(config[i] === 'uId');
		}
	}
	return result;
}

export function regenID(id: string, isUid: boolean = false) {
	let pId: string = '';
	if (isUid) {
		let s = id.split('P');
		pId = `${nanoid(25)}#${s[0]}P${nanoid(16)}${s[1]}&${nanoid(75)}`;
	} else {
		pId = `${nanoid(36)}${id}${nanoid(5)}`;
	}
	return pId;
}

export function getID() {}
