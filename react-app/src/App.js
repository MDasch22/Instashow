import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar.js';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import HomePage from './components/Splash';
import ProfilePage from './components/ProfilePage/ProfilePage';
import EditPost from './components/EditPost';
import { thunkLoadAllPosts } from './store/posts';
import SinglePost from './components/SinglePost';
import EditProfile from './components/EditProfile';
import ExplorePage from './components/ExplorePage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)
  const posts = useSelector(state => Object.values(state.post))


  useEffect(() => {
    (async() => {
      if(sessionUser){
        await dispatch(thunkLoadAllPosts());
      }
      await dispatch(authenticate());
      setLoaded(true);
    }) ();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  if (!posts){
    return null
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
        <ProtectedRoute path='/explore/posts' exact={true}>
          <ExplorePage user={sessionUser} posts={posts}/>
        </ProtectedRoute>
        <ProtectedRoute path='/:username/edit' exact={true}>
          <EditProfile user={sessionUser}/>
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path='/post/:post_id' exact={true}>
          <SinglePost />
        </ProtectedRoute>
        <ProtectedRoute path='/post/:post_id/edit' exact={true}>
          <EditPost />
        </ProtectedRoute>
        <ProtectedRoute>
          <h1> Page Not Found.</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
