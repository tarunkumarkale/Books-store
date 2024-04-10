import { createContext, useContext, useEffect, useState } from "react";
import { app } from "./FireData";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged } from "firebase/auth";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);// custom hook 

const firebaseAuth = getAuth(app);
const Googleprovider=new GoogleAuthProvider()
export const FirebaseProvider = (props) => {

    const [user,setuser]=useState(null)
useEffect(()=>{
onAuthStateChanged(firebaseAuth,(user)=>{
    if(user) setuser(user)
    else setuser(null)
})
},[])


const isLoogedIN=user?true:false

  const signupUserEmailAndPass = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  }

  const createsignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  const signINwithGoggle=()=>{
    return signInWithPopup(firebaseAuth,Googleprovider)
  }

  return (
    <FirebaseContext.Provider value={{ signupUserEmailAndPass, createsignInWithEmailAndPassword,signINwithGoggle,isLoogedIN }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};