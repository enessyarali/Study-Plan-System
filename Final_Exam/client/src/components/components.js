import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Navbar,Container,Col, Button} from 'react-bootstrap'; 
import { useNavigate,Link } from 'react-router-dom';

function NavBar (props){
  return (
      <Navbar className='my-navbar' bg="primary" variant="dark"> 
          <Container fluid>     
              <Col align = 'left'><NavbarTitle/></Col>

          </Container>    
      </Navbar>
  );

}

function NavbarFIcon(){
  return(
      <button className='smybtn'><i className="bi bi-bell-fill"></i></button>
  );
}

function NavbarLIcon(){
  return(
      <button className='mybtn' size='lg'><i className="bi bi-person-circle"></i></button>
  );
}

function NavbarTitle (){
  return(
    <Col>
        <Navbar.Brand href="#home"><NavbarFIcon/>Study Plan System</Navbar.Brand> 
    </Col>
  );
}





function SideNavBar (props){
  return (
    <div className="sidenav">       
      <Container>
        <ul className="list-group list-group-flush">
            <NavbarLIcon></NavbarLIcon>
            <Col><i>{props.user.name}</i></Col>
            <br></br>
            <Button as={Link} to="/Create" variant="primary" active>Create Study Plan</Button>
          <br></br>
          <Button as={Link} to="/Edit" variant="primary" active>Edit Study Plan</Button>
          <br></br>
         <LogoutButton logout= {props.logout}> </LogoutButton>
        </ul>
       
      </Container>
    </div>
  );
}

function LogoutButton(props) {
  const navigate = useNavigate();
  return (
    <Button className='myuserbuttons' variant="danger"  onClick={async () => {await props.logout(); navigate('/login')}}>Logout</Button>
  )
}


export {NavBar,SideNavBar}
