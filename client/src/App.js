import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Content from './features/Main/Content';
import Dashboard from './features/Dashboard/Dashboard';
import './App.scss';

function App() {
    return (
        <>
        <Provider store={store} >
            <BrowserRouter>
                <Switch>
                    <Route exact path='/dashboard/'>
                    <Redirect to='/dashboard/home' />
                    </Route>
                    <Route exact path='/dashboard/:slug'>
                        <Dashboard />
                    </Route>

                    <Route exact path='/:slug/*'>
                        <Content />
                    </Route>
                    
                    <Route exact path='/:slug'>
                        <Content />
                    </Route>

                    <Route exact path='/'>
                        <Redirect to='/home' />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
        </>
    );
}

export default App;
