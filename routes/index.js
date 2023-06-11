import express from 'express';
const router = express.Router();
// import { createUser, loginUser, SignOut, forgot_pass, loginGoogle, readDb, selectUsrId, selectWh, updateDb, AddDb, DelUser } from '../controller/ExampleController.js';

import { CheckJwt, LoginEmail, Login_Google, SignUp, forgetPass, getUserInfo, getUserLoaction, updateUserInfo } from '../controller/AuthController.js';
import { GetPlant, GetAllPlant } from '../controller/PlantWeatherController.js';
import { TestEvent, CreateNewEvent, GetAllEvent, getOneEvent, UpdateOneEvent, DeleteOneEvent } from '../controller/EventController.js';
import { createNewHistory, getAllHistory } from '../controller/HistoryController.js';
import { GetOneTipsTrick, GetTipsTrick } from '../controller/TipsTrickController.js';
// import { weatherData } from '../controller/WeatherController.js';
// import oa2 from '../utils/generateJwt.js';


/* GET home page. */
router.get('/Express', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/create-user', createUser);
// router.get('/login-user', loginUser);
// router.post('/sign-out', SignOut);
// router.post('/forgots-pass', forgot_pass);
// router.get('/login-google', loginGoogle);
router.get('/testevent', TestEvent);
router.get('/testevent2/:id', GetAllEvent);
// router.get('/gen-token', oa2);
//basic CRUD

//for real
// check token
router.get('/checkJwt', CheckJwt);

// for AUTH
router.post('/login-email', LoginEmail);
router.post('/login-google', Login_Google);
router.post('/sign-up', SignUp);
router.post('/forgot-pass', forgetPass);
router.get('/user-info', getUserInfo);
router.put('/user-info', updateUserInfo);
router.get('/user-location', getUserLoaction);

//for Weather
router.get('/weather/:weather', GetPlant);
router.get('/getAllPlant', GetAllPlant);

// for event
router.post('/event', CreateNewEvent);
router.get('/event/:id', getOneEvent);
router.get('/getAllEvent', GetAllEvent);
router.put('/event', UpdateOneEvent);
router.delete('/event/:id', DeleteOneEvent);

// for History
router.post('/history', createNewHistory);
router.get('/history', getAllHistory);

//for tips trick
router.get('/tips-trick', GetTipsTrick);
router.get('/tips-trick/:id', GetOneTipsTrick);



export default router;
