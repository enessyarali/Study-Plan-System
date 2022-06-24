import { Lecture } from './components/Lecture.js';
const ServerURL='http://localhost:3001';



const login =  async (credentials) => {
  const response = await fetch(ServerURL+ '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type' :'application/json'
    },
    credentials : 'include',
    body: JSON.stringify(credentials),
  })
  if(response.ok){
    const user = response.json();
    return user;
  }else{
    const errdetails = await response.text() 
    throw errdetails ;
  }
}

const getUserInfo = async () => {
  const response = await fetch(ServerURL + '/api/sessions/current', {
    credentials: 'include',
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user;  
  }
};

const logOut = async() => {
  const response = await fetch(ServerURL + '/api/logout', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}


// STUDY PLAN APIS

const getAllLectures = async () => {
  const response = await fetch(ServerURL +'/api/AllLectures',{
    credentials : 'include'
  });
  const LectureJson = await response.json();
  if(response.ok) {
    return LectureJson.map(ex => new Lecture(ex.course_id ,ex.code, ex.name, ex.credit, ex.max_student, ex.incompatible_with,ex.prepatory_course,ex.enrolled_student));
  }
  else
    throw LectureJson;
};
const getcurrentstudyplan = async (student_id) => { 
  const response = await fetch(ServerURL +`/api/currentstudyplan/${student_id}`,{
    credentials : 'include'
  });
  const LectureJson = await response.json();
  if(response.ok) {
    return LectureJson.map(ex => new Lecture(ex.course_id,ex.code, ex.name, ex.credit, ex.max_student, ex.incompatible_with,ex.prepatory_course,ex.enrolled_student));
  }
  else
    throw LectureJson;  

    
};


const gettemporary_list = async (student_id) => { 
  const response = await fetch(ServerURL +`/api/temp/${student_id}`,{
    credentials : 'include'
  });
  const LectureJson = await response.json();
  if(response.ok) {
    return LectureJson.map(ex => new Lecture(ex.course_id,ex.code, ex.name, ex.credit, ex.max_student, ex.incompatible_with,ex.prepatory_course,ex.enrolled_student));
  }
  else
    throw LectureJson;  

    
};


const addlectureintotemporary = async (student_id,course_id) => {
  const response = await fetch(ServerURL +`/api/edit/addtemp/${student_id}/${course_id}`,{
    method: 'POST',
    credentials : 'include'
  });
  const LectureJson = await response.json();
  if(response.ok) {
    return null  }
  else
    throw null;//Put error message
};

const copytable = async (student_id) => {
  const response = await fetch(ServerURL +`/api/edit/copytable/${student_id}`,{
    method: 'POST',
    credentials : 'include'
  });
  const LectureJson = await response.json();
  if(response.ok) {
    return null  }
  else
    throw null;//Put error message
};

const saveandmerge = async (student_id,course_id) => {
  const response = await fetch(ServerURL +`/api/edit/mergetemp`,{
    method: 'POST',
    credentials : 'include'
  });
  const LectureJson = await response.json();
  if(response.ok) {
    return null  }
  else
    throw LectureJson;//Put error message
};

const cleartemporarylist = async () => {
  const response = await fetch(ServerURL +`/api/edit/cleartemp/`,{
    method: 'DELETE',
    credentials : 'include'
  });
  if(response.ok) {
    return null  }
  else
    throw null;//put error message
};

const clearprevious = async (student_id) => {
  const response = await fetch(ServerURL +`/api/edit/clearprevious/${student_id}`,{
    method: 'DELETE',
    credentials : 'include'
  });
  if(response.ok) {
    return null  }
  else
    throw null;//put error message
};

const deletelecturetemp = async (student_id,course_id) => {
  const response = await fetch(ServerURL +`/api/edit/deletetemp/${student_id}/${course_id}`,{
    method: 'DELETE',
    credentials : 'include'
  }); 
  if(response.ok) {
    return null  }
  else
    throw null; //put error message
};

const settime = async (time,student_id) => {
  const response = await fetch(ServerURL +`/api/create/settime/${time}/${student_id}`,{
    method: 'PUT',
    credentials : 'include'
  });
  const LectureJson = await response.json();
  if(response.ok) {
    return null  }
  else
    throw null;//Put error message
};


const incrementenrolled = async (course_id) => {
  const response = await fetch(ServerURL + `/api/edit/incrementenrolled/${course_id}`,{
    method :'POST',
    credentials : 'include'
  })
  if(response.ok){
    return null
  }else throw null
}

const decrementenrolled = async (course_id) => {
  const response = await fetch(ServerURL + `/api/edit/decrementenrolled/${course_id}`,{
    method :'POST',
    credentials : 'include'
  })
  if(response.ok){
    return null
  }else throw null
}

const deletestudyplan = async (student_id) => {
  const response = await fetch(ServerURL +`/api/edit/deletestudyplan/${student_id}`,{
    method: 'DELETE',
    credentials : 'include'
  });
  if(response.ok) {
    return null  }
  else
    throw null;//put error message
};


const API = {getAllLectures,login,getUserInfo,logOut,
  getcurrentstudyplan,deletestudyplan,addlectureintotemporary,deletelecturetemp,
  saveandmerge,cleartemporarylist,gettemporary_list,copytable,clearprevious,settime,incrementenrolled,decrementenrolled}

export default API; 