import express from 'express';
const router = express.Router();
import { createUser, loginUser, SignOut, forgot_pass, loginGoogle, readDb, selectUsrId, selectWh, updateDb, AddDb, DelUser } from '../controller/ExampleController.js';

import { LoginEmail } from '../controller/AuthController.js';


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create-user', createUser);
router.get('/login-user', loginUser);
router.post('/sign-out', SignOut);
router.post('/forgot-pass', forgot_pass);
router.get('/login-google', loginGoogle);

//basic CRUD

router.get('/readdb', readDb);
router.get('/selwh', selectWh);
router.get('/seluid', selectUsrId);
router.get('/update', updateDb);
router.get('/add', AddDb);
router.get('/deluser', DelUser);

//for real
router.post('/login-email', LoginEmail);




export default router;
