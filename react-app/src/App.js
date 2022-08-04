import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import CreatePost from './components/CreatePost';
import HomePage from './components/Splash';
import ProfilePage from './components/ProfilePage/ProfilePage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/:username' exact={true} >
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>Instashow</h1>
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path='/post/new' exact={true}>
          <CreatePost/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
