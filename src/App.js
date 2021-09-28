import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
// import Content from './components/content/Content';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './firebase';
// import Home from './components/posts/Home';
import HomePage from './page/HomePage';
// import Login from './components/login/Login';
// import Signup from './components/signup/Signup';
// import Posts from './components/posts/Posts';

function App() {
  const [user, setUser] = useState(null)
  // to track current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log(authUser);
      } else {
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
        <HomePage />
      </Router>
    </div>
  );
}

export default App;
