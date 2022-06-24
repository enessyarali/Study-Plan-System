import './App.css';

import API from './API'
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FullRoute ,DefaultRoute,LoginRoute,CreateRoute,EditRoute } from './components/PageRoutes'


function App() {
  const [lectures,setLectures] = useState([]);
  const [message,setMessage] = useState('')
  const [loggedIn,setLoggedIn] = useState(false)
  const [User,setUserName] = useState('')
  const [currentstudyplan,setcurrentstudyplan] = useState([])
  const [student_id,setStudent_id] = useState('')
  const [temporary_list,settemporary_list] = useState([])
  const [passlock,setpasslock] = useState(false)
  const handlelogin = async (credentials) => {
      const user = await API.login(credentials);
      setLoggedIn(true);
      setUserName(user)
      setStudent_id(user.id)
      
  }
  // API HANDLERS   
  const createstudyplan = async(User) =>{
    await API.createstudyplan(User)
  }
  const getLectures = async () =>{ 
    const lectures = await API.getAllLectures()
    setLectures(lectures)
   } 

   const getcurrentstudyplan = async (student_id) =>{ 
    const currentlectures = await API.getcurrentstudyplan(student_id)
      setcurrentstudyplan(currentlectures)    

    } 

    const gettemporary_list = async (student_id) => {
      const temporary_list = await API.gettemporary_list(student_id);
      settemporary_list(temporary_list)
      console.log(temporary_list)
    }

    const getEnrolledStudents = (course_id) => {  //WRITE THE API FUNCTION 
      for(const lecture of lectures){
        if(lecture.course_id === course_id){
          console.log(lecture.enrolled_student)
        return lecture.enrolled_student}
      }
    }

    const getincompatible_with =  (course_id) => {
      for(const lecture of lectures){
        if(lecture.course_id === course_id)
        return lecture.incompatible_with
      }
    }

    const getprepatory_course =  (course_id) => {
     
      for(const lecture of lectures){
        if(lecture.course_id === course_id)
        {
          return lecture.prepatory_course
        }
      }
      
    }
    const getmax_students = (course_id) =>{
      console.log(course_id)
     for(const lecture of lectures){
       if(lecture.course_id === course_id){
         console.log(lecture.max_student)
         return lecture.max_student

       }
     }
    }

    const getonelecture = (course_id) => {
      for(const onelecture of lectures){
        if(onelecture.course_id === course_id){
          return onelecture.code;
        }
      }
    }

    const checkincompatiblewith =  (course_id) =>{
      let incompatiblefound = false
      for(const Lecture of temporary_list){
        if(Lecture.code === getincompatible_with(course_id)){
          incompatiblefound = true ;
          break
        }
      }
      return incompatiblefound
    } 

    const checkprepatory =  (course_id) => {
      let prepatoryfound = true
      if(getprepatory_course(course_id)=== null) return false 
      for(const lecture of temporary_list){
        if(lecture.code === getprepatory_course(course_id) ){
          prepatoryfound = false
          break;
         }
        return prepatoryfound
      }
    }
    const checkcoursealreadyexist =  (course_id) =>{
      for(const check of temporary_list){
        if(check.course_id === course_id){
          return true
        }
      }
      return false
    }
    const handleaddlecture = async (student_id,course_id) => {
      try{
          if(checkincompatiblewith(course_id)){
            setMessage({
              msg: "Can not add the lecture " + getonelecture(course_id) + " it is incompatible with  " +getincompatible_with(course_id) ,
              type: "warning"
          });
          setTimeout(() => setMessage(null), 15000);
          }else if(checkprepatory(course_id)){
            setMessage({
              msg: "Can not add the lecture " + getonelecture(course_id) + " it needs preapatory course  " +getprepatory_course(course_id),
              type: "warning"
          });
          setTimeout(() => setMessage(null), 15000);
          }else if(getmax_students(course_id) <= getEnrolledStudents(course_id) ){
            setMessage({
              msg: "Can not add the lecture because it exceeds  maximum number of students allowed to enroll",
              type: "warning"
          });
          setTimeout(() => setMessage(null), 15000);
          }else if(checkcoursealreadyexist(course_id)){
            setMessage({
              msg: "Can not add the lecture" + getonelecture(course_id) + "already is in the study plan" ,
              type: "warning"
          });
          setTimeout(() => setMessage(null), 15000);
          }
          
       else{
          await API.addlectureintotemporary(student_id,course_id)
          setMessage({
            msg: "Lecture succesfully added" ,
            type: "succes"
        });
        await API.incrementenrolled(course_id)
        gettemporary_list(student_id)
      } 
      }catch(err){}
      
    }
 
    const handledeletelecture = async (student_id,course_id) =>{
      await API.deletelecturetemp(student_id,course_id)
      await API.decrementenrolled(course_id)
      gettemporary_list(student_id)

    }
   const deletestudyplan = async (student_id) =>{
   await API.deletestudyplan(student_id)
     await getcurrentstudyplan(student_id)
   }

   const copytable = async (student_id) => {
     await API.copytable(student_id)
   }

   const cleartemporarylist = async () => {
     await API.cleartemporarylist();
   }
   
   const savesubmit = async (student_id) => {
    try {
      if (totalcredits() > getMaxCredits()) {
          setMessage({
              msg: "Can not save the study plan current credits exceed the maximum credits allowed",
              type: "warning"
          });
          setTimeout(() => setMessage(null), 15000);
      }
      else if (totalcredits() < getMinCredits()) {
          setMessage({
              msg: "Can not save the study plan because the current credits are lower then the minimum credits allowed",
              type: "warning"
          });
          setTimeout(() => setMessage(null), 15000);
      }
      else {    
        
        await API.clearprevious(student_id);
        await API.saveandmerge(student_id);
        await API.cleartemporarylist()
        getcurrentstudyplan(student_id);
              setMessage({
                  msg: "Study plan persistently saved successfully!",
                  type: "success"
              });
              setTimeout(() => setMessage(null), 15000);
          
      }
  }
  catch(err){}
}
   const cancel = async () => {
     await API.cleartemporarylist()
   }

   const settime = async (time,student_id) =>{
    await API.settime(time,student_id)
  }


  const logout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setLectures([]);
  };

  useEffect(() =>{
    getLectures()
   } ,[loggedIn])

  
   useEffect(() => {
    if(loggedIn)
    getcurrentstudyplan(student_id)
    cleartemporarylist()
    copytable(student_id)
    gettemporary_list(student_id)
  }, [loggedIn]);

/////////////////////////////////////////
  const totalcredits = () => {
    let sum = 0
      const reducer = (accumulator, curr) => accumulator + curr;
     sum = temporary_list.map(line => line.credit).reduce(reducer)
    return sum;
  }

  const getMaxCredits = () => {
    if (User.partfull !== 1) {
        return 40;
    }
    else {
        return 80;
    }
}

const getMinCredits = () => {
  if (User.partfull !== 1){
    return 20;
  }else{
    return 40
  }
}
  
////////////////////////////////////
   

  
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path='/login' element= { loggedIn ?<Navigate to={'/'} replace/> : <LoginRoute  login = {handlelogin} lectures = {lectures}/>}></Route>
        <Route path='/' element={ loggedIn ? <FullRoute user={User}  currentstudyplan= {currentstudyplan} logout={logout} lectures = {lectures}  /> : <Navigate to={'/login'} replace/>  } />  
        <Route path='/Create' element={ loggedIn ? <CreateRoute user={User} currentstudyplan= {currentstudyplan} settime={settime} createstudyplan={createstudyplan} lectures = {lectures} student_id={student_id}/> : <Navigate to={'/login'} replace/>  } />    
        <Route path='/Edit' element={ loggedIn ? <EditRoute totalcredits={totalcredits} handledeletelecture={handledeletelecture} handleaddlecture={handleaddlecture} cancel={cancel}  passlock={passlock}
                      checkprepatory={checkprepatory} checkincompatiblewith={checkincompatiblewith}  savesubmit={savesubmit} student_id={student_id} user={User} currentstudyplan={currentstudyplan} message={message} setMessage={setMessage}
                       checkcoursealreadyexist ={checkcoursealreadyexist} temporary_list={temporary_list} lectures = {lectures} deletestudyplan={deletestudyplan} /> : <Navigate to={'/login'} replace/>  } />    
        <Route path='*' element={ <DefaultRoute/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
