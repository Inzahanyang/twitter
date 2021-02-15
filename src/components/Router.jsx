import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Auth } from 'routes/Auth';
import { Home } from 'routes/Home';
import { Profile } from 'routes/Profile';
import { Navigation } from './Navigation';

export const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                    </>
                ) : (
                    <>
                        <Route path="/">
                            <Auth />
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    );
};
