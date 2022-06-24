
'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const dao = require('./dao'); // module for accessing the DB
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const session = require('express-session')
const UserDao = require('./user-dao')
const {check, validationResult} = require('express-validator'); // validation middleware
// init express
const app = express();
const PORT = 3001;

// set up the middlewares
app.use(morgan('dev'));
app.use(express.json()); // for parsing json request body
 
// set up and enable cors
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials : true
};
app.use(cors(corsOptions));
//Setup the localstrategy
passport.use(new LocalStrategy(async function verify(username,password,cb){
  const user = await UserDao.getUser(username,password)       
  if(!user){
    return(cb(null,false,'Incorrect Username and/or Password'))
  } 
  return(cb(null,user))
}))

passport.serializeUser(function(user,cb){
  cb(null,user);
})
 

passport.deserializeUser(function(user,cb){ 
  return cb(null,user)
})
 
//Setup the session

app.use(session({ 
  secret : 'super secret',
  resave : false,
  saveUninitialized:false ,
}))
app.use(passport.authenticate('session'))


const isLoggedIn = (req, res, next) => { //Only used in the Edit and Create Study Page otherwise it doesnt allow to show Lecturelist on the main page 
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}


 
/********************* API's ************************ */

app.get ('/api/AllLectures',(request,response)=>{
    dao.getlectures()
    .then(lectures => response.json(lectures).status(200))
    .catch(()=> response.status(500).end());
});

app.get ('/api/currentstudyplan/:student_id',isLoggedIn,(request,response)=>{
  const student_id = request.params.student_id
  dao.getcurrentstudyplan(student_id)
  .then(lectures => response.json(lectures).status(200))
  .catch(()=> response.status(500).end());
}); 

app.get ('/api/temp/:student_id',isLoggedIn,(request,response)=>{
  const student_id = request.params.student_id
  dao.gettemporary_list(student_id)
  .then(lectures => response.json(lectures).status(200))
  .catch(()=> response.status(500).end());
}); 


 app.post('/api/edit/copytable/:student_id',isLoggedIn,async(request,response)=>{  
  
  const student_id = request.params.student_id
  try{
   await dao.copytable(student_id)
   return response.status(200).json({message: 'OK'});
  }catch(err){
    return response.status(500).json({error: 'DB error'})
  }
}
);


app.post ('/api/create/:student_id',isLoggedIn,(request,response)=>{  
  
  const student_id = request.params.student_id
  dao.createstudyplan()
  .then.status(200)    
  .catch(()=> response.status(500).end());   
});

 
app.post('/api/edit/addtemp/:student_id/:course_id',isLoggedIn,async (request,response)=>{
 
  const student_id = request.params.student_id;
  const course_id = request.params.course_id;
  try{
    await  dao.addlectureintotemporary(student_id ,course_id)  
    return response.status(200).json({message: 'OK'});  
  }catch(err){
    console.log(err);
    return response.status(500).json({error: 'DB error'})
  }
});

app.post('/api/edit/mergetemp',isLoggedIn,async (request,response)=>{
  try{
    await  dao.mergetemporarytable()  
    return response.status(200).json({message: 'OK'});  
  }catch(err){
    console.log(err);
    return response.status(500).json({error: 'DB error'})
  }
});

app.post('/api/edit/incrementenrolled/:course_id',isLoggedIn,async (request,response)=>{
  const course_id = request.params.course_id;
  try{
    await  dao.incrementenrolled(course_id)  
    return response.status(200).json({message: 'OK'});  
  }catch(err){ 
    console.log(err);
    return response.status(500).json({error: 'DB error'})
  }
});


app.post('/api/edit/decrementenrolled/:course_id',isLoggedIn,async (request,response)=>{
  const course_id = request.params.course_id;
  try{
    await  dao.decrementenrolled(course_id)  
    return response.status(200).json({message: 'OK'});  
  }catch(err){
    console.log(err);
    return response.status(500).json({error: 'DB error'})
  }
});
  
app.put('/api/create/settime/:time/:student_id',isLoggedIn,async (request,response)=>{
 
  const time = request.params.time;
  const student_id = request.params.student_id;
  
  try{
    await  dao.settime(time ,student_id)  
    return response.status(200).json({message: 'OK'});  
  }catch(err){
    console.log(err);
    return response.status(500).json({error: 'DB error'})
  }
});


app.delete('/api/edit/deletetemp/:student_id/:course_id',isLoggedIn,async (request,response)=>{
  const student_id = request.params.student_id;
  const course_id = request.params.course_id;
  try{
  await dao.deletelecturetemp(student_id,course_id)
  return response.status(200).json({message: 'OK'});
  }catch(err){
    console.log(err);
    return response.status(500).json({error: 'DB error'})
  }
  
});  

app.delete('/api/edit/cleartemp/',isLoggedIn,async (request,response)=>{
  try{
  await  dao.cleartemporarylist()
  return response.status(200).json({message: 'OK'});
  }catch(err){
    console.log(err);
    return response.status(500).json({error: 'DB error'})
  }
});

app.delete('/api/edit/clearprevious/:student_id',isLoggedIn,async (request,response)=>{
  const student_id = request.params.student_id;
  try{
  await  dao.clearpreviouslectures(student_id)
  return response.status(200).json({message: 'OK'});
  }catch(err){
    console.log(err);
    return response.status(500).json({error: 'DB error'})
  }
});
 


app.delete('/api/edit/deletestudyplan/:student_id',isLoggedIn,async (request,response)=>{
  const student_id = request.params.student_id;
  try{
  await  dao.deletestudyplan(student_id)
  return response.status(200).json({message: 'OK'});
  }catch(err){
    console.log(err);
    return response.status(500).json({error: 'DB error'})
  }
});







/********************* User API ************************ */

app.post('/api/sessions',passport.authenticate('local'), (req,res) => {
    res.status(201).json(req.user);
})

app.delete('/api/logout', (req, res) => {
  req.logout(() => {
      res.end();
  });
});


app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}`));