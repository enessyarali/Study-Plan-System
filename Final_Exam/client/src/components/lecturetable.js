
import { Table ,Accordion, Button, Row} from 'react-bootstrap';


function LectureTable(props){
    return(
        <>
       
        <Table className='lecturetable' striped>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Code</th>
              <th>Lecture name</th>
              <th>CFU</th>
              <th>Max Students / Enrolled</th>
              <th>Extra Information</th>
            </tr>
          </thead>
          <tbody>
            {
              props.lectures.map((lecture) =>                
                <LectureRow lecture={lecture} key={lecture.code}/>)    
            }
          </tbody>
        </Table>
      </>
    )
}

function AddLectureTable(props){
  return(
      <>
     
      <Table className='lecturetable' striped>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Code</th>
            <th>Lecture name</th>
            <th>CFU</th>
            <th>Max Students / Enrolled</th>
            <th>Extra Information</th>
          </tr>
        </thead>
        <tbody>
          {
            props.lectures.map((lecture) =>                
              <AddLectureRow lecture={lecture} checkcoursealreadyexist={props.checkcoursealreadyexist} checkincompatible={props.checkincompatiblewith} checkprepatory={props.checkprepatory} course_id={lecture.course_id} student_id={props.student_id} handleaddlecture={props.handleaddlecture} key={lecture.code}/>)    
          }
        </tbody>
      </Table>
    </>
  )
}

function DeleteLectureTable(props){
  return(
      <>
     
      <Table className='lecturetable' striped>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Code</th>
            <th>Lecture name</th>
            <th>CFU</th>
            <th>Max Students/Enrolled Students</th>
            <th>Extra Information</th>
          </tr>
        </thead>
        <tbody>
          {
            props.temporary_list.map((lecture) =>                
              <DeleteLectureRow student_id={props.student_id}  handledeletelecture={props.handledeletelecture} lecture={lecture} key={lecture.course_id}/>)    
          }
        </tbody>
      </Table>
          <Row>
          
          </Row>
    </>
  )
}
function LectureRow(props) {
    return(
      <tr>
        <LectureData lecture={props.lecture}  />
      </tr>
    );
  }

  function AddLectureRow(props) {
    let valid = true;
     if(props.checkincompatible(props.lecture.course_id)) valid=false;
     //if(!props.checkprepatory(props.lecture.course_id))  valid=false; Due to the null check this returns a lot of false and almost all of the lectures turn red
    if(props.checkcoursealreadyexist(props.lecture.course_id)) valid=false;
    return(
      <tr bgcolor={valid ? "#FBFCFC" : "#E74C3C"} >
        <LectureData lecture={props.lecture}/><Addbutton   student_id={props.student_id} course_id={props.lecture.course_id} handleaddlecture={props.handleaddlecture}></Addbutton>
      </tr>
    );
  }

  function DeleteLectureRow(props) {
    return(
      <tr>
        <LectureData lecture={props.lecture}/><Deletebutton  lecture={props.lecture}  student_id={props.student_id} course_id={props.lecture.course_id} handledeletelecture={props.handledeletelecture}></Deletebutton>
      </tr>
    );
  }

function LectureData(props) {
    return(
      <>
        <td width={'10%'}>{props.lecture.course_id}</td>
        <td width={'10%'}>{props.lecture.code}</td>
        <td width={'10%'}>{props.lecture.name}</td>
        <td width={'10%'}>{props.lecture.credit}</td>
        <td width={'10%'}>{props.lecture.max_student}/{props.lecture.enrolled_student}</td>
        <td> <Accordion>
            <Accordion.Item eventKey="0">
            <Accordion.Header>Click to see</Accordion.Header>
              <Accordion.Body>
            Incompatible with :  {props.lecture.incompatible_with}
            <br></br>
           Prepatory Course  :  {props.lecture.prepatory_course}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          </td>
      </>
    );
  }

  function Addbutton(props){
    return(
      <td><Button className='addbutton' variant='Succes' onClick={()=> { props.handleaddlecture(props.student_id,props.course_id)}}>+</Button></td>
    )
  }
  
  function Deletebutton(props){
    return(
      <td><Button className='deletebutton' variant='Danger' onClick={ ()=>{ props.handledeletelecture(props.student_id,props.course_id)}} >-</Button></td>
    )
  }
  
export {LectureTable,AddLectureTable,DeleteLectureTable}