import { Container, Nav, Navbar } from "react-bootstrap";
import { addDoc, collection, doc, getDoc } from "@firebase/firestore";
import Logo from '../../images/logo.png'
import '../header/Header.css';
import Login from '../login/Login';
import { Link, useHistory } from 'react-router-dom';
import { Modal, Card, CardContent, Button, TextField, Box } from '@mui/material';
import { useState, useRef } from "react";
import { auth, db, storage } from "../../firebase";
import { uploadBytes, ref } from '@firebase/storage';
import { signOut } from "@firebase/auth";


const Header = ({ user }) => {
    const [open, setOpen] = useState(false);
    const [caption, setCaption] = useState('');
    const history = useHistory();
    const inputRef = useRef(null);

    //create post logic
    const createPost = () => {
        setOpen(true)
    }

    // upload file handler
    const uploadFile = (e) => {
        const image = e.target.files[0];
        uploadBytes(
            ref(storage, `${Date.now()}.${image?.type?.split("/")[1]}`),
            image
        )
            .then((snapshot) => {
                console.log(snapshot.ref.fullPath);
                getDoc(doc(db, "users", user.uid)).then((doc_) => {
                    const { username, avatar } = doc_.data();
                    addDoc(collection(db, "posts"), {
                        caption,
                        content_img: snapshot.ref.fullPath,
                        username,
                        avatar,
                    });
                    setOpen(false);
                });
            })
            .catch((err) => console.log(err));
    };
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand><img src={Logo} alt="logo" onClick={()=> history.push('/')} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav style={{ marginLeft: 'auto'}}>
                        {user && (
                            <>
                                <Button style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    width: '100px',
                                }} onClick={createPost}>Add Post</Button>
                                <Button style={{
                                    color: 'white',
                                    width: '100px'
                                }} onClick={() => signOut(auth)}>Logout</Button>
                            </>
                        )}
                        {!user && (
                            <>
                                <Link to='/'>Home</Link>
                                <Link to='/login' >Login</Link>
                                <Link to='/signup'>Signup</Link>
                            </>
                        )}
                        <Modal style={{ display: 'flex', justifyContent: 'center', paddingTop: '15em' }} open={open} onClose={() => setOpen(false)}
                        ><Box
                            component="form"
                            sx={{ width: '100%', p: 5, my: 0.5 }} maxWidth="md"
                            noValidate

                        >
                                <Card>
                                    <CardContent>
                                        <input
                                            style={{ display: "none" }}
                                            type="file"
                                            accept="image/jpeg,image/png"
                                            ref={inputRef}
                                            onChange={uploadFile}
                                        />
                                        <TextField
                                            label="What do you have in mind?"
                                            id="filled-multiline-flexible"
                                            multiline
                                            maxRows={4}
                                            value={caption}
                                            onChange={(e) => setCaption(e.target.value)}
                                            variant="filled"
                                            style={{ width: "100%" }}
                                        />
                                        <Button
                                            onClick={() => {
                                                inputRef.current.click();
                                            }}
                                        >
                                            Upload
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Modal>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
