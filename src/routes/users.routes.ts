import { Router } from 'express';
import { signUp, signIn, signOut } from './../controllers/users.auth.controller';

const r = Router();

r.post('/signup', signUp);
r.post('/signin', signIn);
r.post('/signout', signOut);

export default r;
