import express from 'express';
const router = express.Router();

import { CheckJwt, CheckJwtEditor, CountUser, EnableUser, LoginEmail, LoginEmailEditor, Login_Google, MakeItEditor, MakeItUser, SignUp, deleteUser, disableUser, forgetPass, getAllUsers, getUserInfo, getUserLoaction, updateUserInfo, updateUserPass } from '../controller/AuthController.js';
import { GetPlant, GetAllPlant, CreatePlant, UpdatePlant, DeletePlant, CountPlant } from '../controller/PlantWeatherController.js';
import { TestEvent, CreateNewEvent, GetAllEvent, getOneEvent, UpdateOneEvent, DeleteOneEvent } from '../controller/EventController.js';
import { createNewHistory, getAllHistory } from '../controller/HistoryController.js';
import { CountTips, CreateTips, DeleteTips, GetOneTipsTrick, GetTipsTrick, UpdateTips } from '../controller/TipsTrickController.js';


/* GET home page. */
router.get('/Express', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testevent', TestEvent);
router.get('/testevent2/:id', GetAllEvent);

//for real
// check token
router.get('/checkJwt', CheckJwt);
router.get('/checkJwtEditor', CheckJwtEditor);

// for AUTH
router.post('/login-email', LoginEmail);
router.post('/login-google', Login_Google);
router.post('/sign-up', SignUp);
router.post('/forgot-pass', forgetPass);
router.get('/user-info', getUserInfo);
router.put('/user-info', updateUserInfo);
router.put('/user-update-password', updateUserPass);
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


//Editor route
router.get('/e/AllUser', getAllUsers);
router.put('/e/EnableUser/:uid', EnableUser);
router.put('/e/DisableUser/:uid', disableUser);
router.delete('/e/Deleteuser/:uid', deleteUser);

router.post('/e/CreatePlant', CreatePlant);
router.put('/e/UpdatePlant/:id', UpdatePlant);
router.delete('/e/DeletePlant/:id', DeletePlant);

router.post('/e/CreateTips', CreateTips);
router.put('/e/UpdateTips/:id', UpdateTips);
router.delete('/e/DeleteTips/:id', DeleteTips);

router.get('/e/CountUser', CountUser);
router.get('/e/CountPlant', CountPlant);
router.get('/e/CountTips', CountTips);

router.put('/e/MakeEditor/:uid', MakeItEditor);
router.put('/e/MakeUser/:uid', MakeItUser);

router.post('/e/login-email-editor', LoginEmailEditor);



export default router;
