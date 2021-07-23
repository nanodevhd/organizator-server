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

const lengths: any = {
	'uId': 2,
	'sId': 3,
	'none': 2,
};

function getLengthOfId(isSid: boolean, isUid: boolean): number {
	if (isSid && isUid) return 0;
	if (isSid) return Number(lengths['sId']);
	else if (isUid) return Number(lengths['uId']);
	else return Number(lengths['none']);
}

export function genID(isSid: boolean, isUid: boolean): [string, string] {
	let s: string[] = [];
	let b: any[] = [];
	let j: any[] = [];
	let e: any[] = [];
	let m: string[] = [];
	let x: any[] = [];
	let r: string[] = [];
	const l = getLengthOfId(isSid, isUid);
	if (l == 0) return ['false', 'false'];
	for (var i = 0; i < Number(l ? l : 1); i++) {
		s.push(genUUID());
		b.push(UUIDParser(s[i]));
		j.push([...b[i]].map((v) => v.toString(16).padStart(2, '0')));
		e.push([]);
		r.push('');
		for (var n = 0; n < j[i].length; n++) e[i].push('');
		for (var k = 0; k < j[i].length; k++) {
			let a = k + 9;
			while (a > 15 || a < 0) {
				if (a > 15) {
					a -= 16;
				} else {
					a += 16;
				}
			}
			e[i][k] = j[i][a];
		}
		m.push(e[i].toString().replace(/,/g, ''));
		x.push([
			m[i].substring(0, 8),
			m[i].substring(8, 12),
			m[i].substring(12, 16),
			m[i].substring(16, 20),
			m[i].substring(20, 32),
		]);
		for (var p = 0; p < x[i].length; p++) {
			r[i] += x[i][p];
		}
	}

	let pub: string = '';
	// if (isSid) {
	// 	pub = `${nanoid(16)}${r.toString().replace(/,/g, '').replace(/-/g, '')}${nanoid(40)}`;
	// } else if (isUid) {
	// 	pub = `${nanoid(32)}${r.toString().replace(/,/g, '').replace(/-/g, '')}${nanoid(15)}`;
	// } else pub = r.toString().replace(/,/g, '').replace(/-/g, '');
	pub = r.toString().replace(/,/g, '').replace(/-/g, '');
	let id: [string, string] = [
		String(pub),
		String(s.toString().replace(/,/g, '').replace(/-/g, '')),
	];
	return id;
}

export function genIDs(config: string | string[]) {
	var result: any = {};
	if (typeof config == 'string') {
		result[config] = genID(config === 'uId', config === 'sId');
		if (result[config] == ['false', 'false']) return 'error';
	} else {
		for (var i = 0; i < config.length; i++) {
			result[config[i]] = genID(config[i] === 'uId', config[i] === 'sId');
			if (result[config[i]] == ['false', 'false']) return 'error';
		}
	}
	return result;
}

function fromIdToUUID(id: string) {
	let j = id.split('');
	let t = 0;
	let r = '';
	for (var i = 0; i < j.length; i++) {
		if (i == 8 || i == 12 || i == 16 || i == 20) {
			r += '-';
		}
		r += j[i];
	}
	return r;
}
export function regenId(ID: string) {
	let s: string[] = [];
	let b: any[] = [];
	let j: any[] = [];
	let e: any[] = [];
	let m: string[] = [];
	let x: any[] = [];
	let r: string[] = [];
	if (ID.includes('-')) ID = ID.replace(/-/g, '');
	let t: any = ID.match(/.{1,32}/g);
	for (var i = 0; i < t.length; i++) {
		s.push(fromIdToUUID(t[i]));
		b.push(UUIDParser(s[i]));
		j.push([...b[i]].map((v) => v.toString(16).padStart(2, '0')));
		e.push([]);
		r.push('');
		for (var n = 0; n < j[i].length; n++) e[i].push('');
		for (var k = 0; k < j[i].length; k++) {
			let a = k + 9;
			while (a > 15 || a < 0) {
				if (a > 15) {
					a -= 16;
				} else {
					a += 16;
				}
			}
			e[i][k] = j[i][a];
		}
		m.push(e[i].toString().replace(/,/g, ''));
		x.push([
			m[i].substring(0, 8),
			m[i].substring(8, 12),
			m[i].substring(12, 16),
			m[i].substring(16, 20),
			m[i].substring(20, 32),
		]);
		for (var p = 0; p < x[i].length; p++) {
			r[i] += x[i][p];
		}
	}
	let id: [string, string] = [
		String(r.toString().replace(/,/g, '').replace(/-/g, '')),
		String(s.toString().replace(/,/g, '').replace(/-/g, '')),
	];
	return id;
}

export function getID(id: string, type: 'sid' | 'uid' | 'other'): string {
	if (id == '' || id == 'null' || !id || id == null) return 'false';
	let len: number = id.length;
	let n;
	let a;
	let r = '';
	if (type == 'sid') {
		a = id.substring(16, 80);
		n = a.match(/.{1,32}/g);
	} else if (type == 'uid') n = id.match(/.{1,32}/g);
	else if (type == 'other') {
		a = id.substring(32, 96);
		n = a.match(/.{1,32}/g);
	} else return 'error';
	if (!n || !n.length) return 'error';
	for (var m = 0; m < n.length; m++) {
		let e: any = n[m].match(/.{1,2}/g);
		let z = [];
		let k: number;
		for (var p = 0; p < e.length; p++) z.push('');
		for (var i = 0; i < e.length; i++) {
			k = i - 7;
			while (k > 15 || k < 0) {
				if (k > 15) {
					k -= 16;
				} else {
					k += 16;
				}
			}
			z[k] = e[i];
		}
		r += z.toString().replace(/,/g, '');
	}
	return r;
}
