import express from 'express';
const router = express.Router();
// import { createUser, loginUser, SignOut, forgot_pass, loginGoogle, readDb, selectUsrId, selectWh, updateDb, AddDb, DelUser } from '../controller/ExampleController.js';

import { LoginEmail, Login_Google, SignUp, forgetPass } from '../controller/AuthController.js';
import { GetPlant, GetAllPlant } from '../controller/PlantWeatherController.js';
import { TestEvent, CreateNewEvent, GetAllEvent, getOneEvent, UpdateOneEvent, DeleteOneEvent } from '../controller/EventController.js';
import { createNewHistory, getAllHistory } from '../controller/HistoryController.js';
// import { weatherData } from '../controller/WeatherController.js';
// import oa2 from '../utils/generateJwt.js';


/* GET home page. */
router.get('/', function (req, res, next) {
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
// for AUTH
router.post('/login-email', LoginEmail);
router.post('/login-google', Login_Google);
router.post('/sign-up', SignUp);
router.post('/forgot-pass', forgetPass);

//for Weather
router.get('/weather/:weather', GetPlant);
router.get('/getAllPlant', GetAllPlant);
// router.get('/weather', weatherData);

// for event
router.post('/create-event', CreateNewEvent);
router.get('/getOneEvent/:id', getOneEvent);
router.get('/getAllEvent', GetAllEvent);
router.put('/updateEvent', UpdateOneEvent);
router.delete('/deleteEvent/:id', DeleteOneEvent);

// for History
router.post('/create-history', createNewHistory);
router.get('/getAllHistory', getAllHistory);




export default router;
