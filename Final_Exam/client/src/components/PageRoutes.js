import { Row, Container,Col,Button,Form } from "react-bootstrap";
import {NavBar,SideNavBar,fullparttime} from './components';
import {LectureTable,AddLectureTable,DeleteLectureTable} from './lecturetable'
import {LoginForm} from './Authcomp'
import {Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import {Alert} from 'react-bootstrap'
function FullRoute (props){
  // console.log('here');
  
  return(
    <Container className="App" fluid> 
      <Row>
        <NavBar/>
      </Row>
      <SideNavBar  user={props.user} logout={props.logout} />
     
        <h2>Your Study Plan</h2>
        <Row>
            <LectureTable  lectures = {props.currentstudyplan} > </LectureTable>
        </Row>
        <h2>All Available Lectures</h2>
        <Row>
            <LectureTable  lectures = {props.lectures} > </LectureTable>
        </Row>
    

    </Container>
    );
}



function CreateRoute(props){
  //Integrate the Part time Full time here 
  const  [time,settime] = useState('');
  const navigate = useNavigate('')
  return(
    <Container fluid> 
      <Row>
        <NavBar/>
      </Row>
        
     
      <h2>Available Lectures</h2>
        <Row>
            <LectureTable  lectures = {props.lectures} > </LectureTable>
        </Row>
        <Row>
          <Col> 
          <br></br>
        <Form.Select aria-label="Default select example" value={time}  onChange={e => settime(e.target.value)} >
            <option>Select Type of Enrollment</option>
            <option value="1">Full Time</option>
            <option value="0">Part Time</option>
        </Form.Select>
          </Col>
        </Row>
        <br></br>
        <Button  variant="success" onClick={async() =>{await props.settime(time,props.student_id);navigate('/')}} >Save</Button> 
        <Button  variant="danger" onClick={() =>{navigate('/')}}>Cancel</Button>

    </Container>
    );
  
}


function EditRoute(props){
  //Integrate the Part time Full time here 

  const navigate = useNavigate('/')
  return(
    <Container className="App" fluid> 

      <Row>
        <NavBar/>
      </Row>

      
      <SideNavBar  user={props.user} logout={props.logout} />
      
      <Alert variant={props.message.type} onClose={() => props.setMessage('')} dismissible>{props.message.msg}</Alert>
      
      <h2>Available Lectures</h2>
    
        <Row>
            <AddLectureTable  checkprepatory={props.checkprepatory} checkcoursealreadyexist={props.checkcoursealreadyexist} checkincompatiblewith={props.checkincompatiblewith} lectures = {props.lectures} student_id={props.student_id} handleaddlecture={props.handleaddlecture}> </AddLectureTable> {/*Make a new table with a plus button that adds the lecture to the study plan*/}
        </Row>
       
        <h3>Your Current Study Plan</h3>
        <Row>
           <DeleteLectureTable temporary_list={props.temporary_list} lectures={props.currentstudyplan} student_id={props.student_id} handledeletelecture={props.handledeletelecture} > </DeleteLectureTable>  {/*make a new table with a minus button that deletes the lecture from the study plan*/}
        </Row>  
        <Row> 
          <h4>Total Credits : "{props.totalcredits()}"</h4>
        </Row>
        <Button  variant="success" onClick={async() =>{await props.savesubmit(props.student_id);navigate('/')}} >Save</Button> 
        <Button  variant="danger" onClick={async() =>{await props.cancel();navigate('/')}}>Cancel</Button>
        <Button  variant="danger" onClick={async() =>{ await props.deletestudyplan(props.student_id)}}>Delete Study Plan</Button>
    </Container>
    );
  
}

function DefaultRoute() {
  return(
    <Container className='App'>
      <h1>No data here...</h1>
      <h2>This is not the route you are looking for!</h2>
    </Container>
  );
}
function LoginRoute(props) {
  return(
    <>
    <Container className="App" fluid>
     <Row>
        <NavBar/>
      </Row>

      <Row>
        <Col>
          <h1>Login</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <LoginForm login={props.login} />
        </Col>
      </Row>
      <br></br>
      <Row>
        <Row>
          <Col>
          <h2>Available Lectures</h2>
          </Col>
        </Row>
        <br></br>
       <Row>
          <Col>
          <LectureTable className='loginpagetable' lectures = {props.lectures} > </LectureTable>
          </Col>
        </Row>
      </Row>
      </Container>
    </>
  );
}


export { FullRoute,DefaultRoute,LoginRoute,CreateRoute,EditRoute};