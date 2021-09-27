
import { EmailOutlined, VisibilityOutlined, VisibilityOffOutlined, PersonOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { useState } from 'react';
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { setDoc, doc, getDoc } from '@firebase/firestore';
import { useHistory } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from '@firebase/auth';




const provider = new GoogleAuthProvider();

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url('https://media.istockphoto.com/photos/man-using-dating-app-on-mobile-phone-picture-id1049719266?k=20&m=1049719266&s=612x612&w=0&h=WMwTdlY5nPGGyrGtb1DmRGKKsBjjq36JhLzE2nXRai4=');
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
// const ForgotPassword = styled.a`
//     display: flex;
//     justify-content: flex-end;
//     margin: 3px 0;
//     color: black;
//     text-decoration: none;
//     font-size: 12px;
//     font-weight: bold;
//     cursor: pointer;
//     &:hover{
//         color: black;
//     }
// `
// const Link = styled.a`
//     font-size: 13px;
//     color: black;
//     text-decoration: underline;
//     cursor: pointer;

//     &:hover{
//         color: black;
//     }

// `
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


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const history = useHistory();

    //random number conversion
    const getRandomIntBetween = (min, max)=>{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random()*(max - min + 1 )) + min;
    }

    //Signup with email
    const signUpWithemail = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
             //after getting the user
             setDoc(doc(db, 'users', result.user.uid), {
                 username: name,
                 avatar: `https://randomuser.me/api/portraits/lego/${getRandomIntBetween(
                     0,
                     8
                 )}.jpg`,
             }).catch(err => console.log(err));
             history.push('/')
            })
            .catch(err => console.log(err));
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
                    history.push('/')
                }
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    return (
        <Container>
            <Wrapper>
                <Title>SIGN UP</Title>
                <Form>
                    <InputWrapper>
                        <InputIcon>
                            <PersonOutlined style={{ paddingLeft: '5px' }} />
                        </InputIcon>
                        <Input
                            type='text'
                            placeholder='Name'
                            value={name}
                            name='name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputWrapper>
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
                            placeholder='Password'
                            value={password}
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </InputWrapper>
                    <Button color='FF0000' onClick={signUpWithemail}>SIGN UP</Button>
                    <Button color='212529' onClick={signInWithGoogle}>SIGN UP GOOGLE</Button>
     
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Signup
