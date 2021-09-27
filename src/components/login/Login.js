import { EmailOutlined, VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { useState } from 'react';
// import { signInWithGoogle } from '../util/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from "../../firebase";
import { getDoc, setDoc, doc } from '@firebase/firestore';
import { signInWithPopup, GoogleAuthProvider } from '@firebase/auth';
import { useHistory } from 'react-router-dom';




const provider = new GoogleAuthProvider();

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url('https://wallpaperaccess.com/full/5232974.jpg');
    background-size: cover;
    /* background: #212529;  */
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 30%;
    background-color: white;
    border-radius: 15px;

    @media only screen and (max-width: 728px) {
    width: 70%;
    }
`
const Title = styled.h1`
    font-size: 22px;
    font-weight: 300;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;

  
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
    border: none;
    outline: none;
    height: 20px;
`;
const Button = styled.button`
    border-radius: 70px;
    margin-top: 10px;
    width: 100%;
    height: 35px;
    border: none;
    padding: 10px 10px;
    background-color: #212529;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    background-color: #${props => props.color};
`
const ForgotPassword = styled.a`
    display: flex;
    justify-content: flex-end;
    margin: 3px 0;
    color: black;
    text-decoration: none;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    &:hover{
        color: black;
    }
`
const Link = styled.a`
    font-size: 13px;
    color: black;
    text-decoration: underline;
    cursor: pointer;
    
    &:hover{
        color: black;
    }

`
const InputWrapper = styled.div`
    border: 1px solid black;
    height: 40px;
    margin: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
`
const InputIcon = styled.div`
    padding: 5px;
`

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const history = useHistory();

    //Login with email
    const signInWithEmail = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then(_user => {
            history.push('/');
        }).catch(err => console.log(err));
    }

    //signInWithGoogle
    const signInWithGoogle = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider).then(result => {
            const user = result.user
            const docRef = doc(db, 'users', user.uid);
            getDoc(docRef).then(docSnap => {
                if (!docSnap.exists()) {
                    setDoc(docRef, {
                        username: user.displayName,
                        avatar: user.photoURL
                    }).catch(err => console.log(err));
                }
            }).catch(err => console.log(err));
            history.push('/')
        }).catch(err => console.log(err));
    }


    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <InputWrapper>
                        <InputIcon>
                            <EmailOutlined style={{ paddingLeft: '5px' }} />
                        </InputIcon>
                        <Input
                            type='text'
                            placeholder='Email'
                            value={email}
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <InputIcon onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOffOutlined style={{ paddingLeft: '5px' }} /> : <VisibilityOutlined />}

                        </InputIcon>

                        <Input
                            type={showPassword ? 'password' : 'text'}
                            placeholder='password'
                            value={password}
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </InputWrapper>

                    <Button onClick={signInWithEmail} color='FF0000'>SIGN IN</Button>
                    <Button color='212529' onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</Button>
                    <ForgotPassword>Forgot your password?</ForgotPassword>
                    <Link>Not registered yet? Create an account</Link>

                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login
