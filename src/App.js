
import './App.css';
import {getAuth,signInWithPopup, GoogleAuthProvider, GithubAuthProvider ,signOut} from "firebase/auth";

import initializeAuthentication from './Firebase/Firebase-Initialize';
import { useState } from 'react';
initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
function App() {
  const [user,setUser] =useState({})
  const auth = getAuth();

  const handalGoogleSignIn =() => {
 
    signInWithPopup(auth,googleProvider)
    .then(result => {
      const {displayName,email,photoURL}=result.user;
      const loingInUser = {
        name:displayName,
        email:email,
        photo:photoURL
      };
      setUser(loingInUser);
    })
     .catch( error =>{
       console.log(error.message);
     })
  }
const handalgitHubSignIn =() => {
  signInWithPopup(auth, gitHubProvider)
  .then(result=> {
    const {displayName,photoURL,email}= result.user;

    const loggedInuser = {
      name:displayName,
      email:email,
      photo:photoURL
    }
   setUser(loggedInuser)
  })
  .catch( error =>{
    console.log(error.message);
  })
 

}
const handalSignout = () => {
  signOut(auth)
  .then(()=>{
    setUser({})
  })
}
  return (
    <div className="App">
    { !user.name?
    <div>
     <button onClick={handalGoogleSignIn}>Google Sign in</button>
      <button onClick={handalgitHubSignIn}>GitHub Sign in</button>
     </div> :
      <button onClick={handalSignout}> Sign out</button>
    }
       <br/>
       {
         user.name&& <div>
           <h1>Welcome {user.name}</h1>
           <p>i Khnow your email {user.email}</p>
           <img src={user.photo} alt=""/> 
         </div>
       }
    </div>
  );
}

export default App;
