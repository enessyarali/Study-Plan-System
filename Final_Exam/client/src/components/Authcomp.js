import { useState} from "react";
import {Button, Form} from 'react-bootstrap'

function LoginForm(props){
    const [username, setUserName ] = useState('');
    const  [password, setPassword] = useState('');
const UserName = username;
    const handlesubmit = (event) => {
        event.preventDefault();
        const credentials = {username,password}
        props.login(credentials);
    } 
    return(
        <Form onSubmit={handlesubmit}>
            <Form.Group controlId="username">
                <Form.Label >email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" value={username} onChange={ev => setUserName(ev.target.value)} required={true}></Form.Control>
            </Form.Group>
       
            <Form.Group controlId="password">
                <Form.Label >Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password"  value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={8}></Form.Control>
            </Form.Group>

            <Button type="submit">Login</Button>
        </Form>

       
    )

}

export {LoginForm};

