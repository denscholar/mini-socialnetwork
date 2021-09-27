import { Switch, Route } from 'react-router-dom';
import Home from '../home/Home'
import Login from '../login/Login'
import Signup from '../signup/Signup'


const Content = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/'>
                    <Home />
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

export default Content
