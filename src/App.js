import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header/Header';
import Content from './components/content/Content';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null)
  // to track current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) =>{
      if (authUser){
        setUser(authUser);
        console.log(authUser);
      }else{
        setUser(null);
      }
    })
    return () => {
      unsubscribe(); //to avoid memory leak
    }
  }, [])
  return (
    <div className="App">
      <Router>
        <Header user={user} />
        <Content user={user}/>
      </Router>
    </div>
  );
}

export default App;
