import Posts from "../components/posts/Posts"
import { Switch, Route } from 'react-router-dom';
import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";


const HomePage = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/'>
                    <Posts />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/signup'>
                    <Signup />
                </Route>
            </Switch>
        </div>
    )
}

export default HomePage
