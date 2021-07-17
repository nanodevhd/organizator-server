import { Router } from 'express';

const r = Router();

r.post('/boards/create')
	.post('/boards/delete')
	.post('/boards/edit')
	.post('/comments/add')
	.post('/comments/delete')
	.post('/comments/modify')
	.post('/labels/create')
	.post('/labels/modify')
	.post('/labels/delete')
	.post('/marks/add')
	.post('/marks/modify')
	.post('/sections/create')
	.post('/sections/modify')
	.post('/sections/get')
	.post('/sections/delete')
	.post('/tables/create')
	.post('/tables/modify')
	.post('/tables/delete')
	.post('/tables/get')
	.post('/task/create')
	.post('/task/modify')
	.post('/task/delete')
	.post('/task/addComment');
//  .post('/sections/allow'); || This Route is to allow other users to view the content of this section. Currently is going to be desactivated

export default r;
