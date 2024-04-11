import { createContext, useContext, useEffect, useState } from "react";
import { app } from "./FireData";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged } from "firebase/auth";



// Storage Store and retrieve user-generated files like images, audio, and video without server-side code

import { getStorage,ref,uploadBytes } from "firebase/storage";
// ref import and uploadBytes for upload data 

import { addDoc, collection, getFirestore } from "firebase/firestore"; // first import collection impoort it provide empty collection


const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);// custom hook 

const firebaseAuth = getAuth(app);
const Googleprovider=new GoogleAuthProvider()
const firestore=getFirestore(app)
const Storage=getStorage(app)


export const FirebaseProvider = (props) => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log(user)    //  👿 imp hai esme se liya

const handleCreateNewListing=async(name,isbn, price,cover)=>{
  const imageRef=ref(Storage,`uploads/images/${Date.now}-${cover.name}`)
// yeah pe imageRef ke under storage banya usko apna path diya  custom path  uploads/images  wala

const  uploadResult=await uploadBytes(imageRef,cover)   // yah pe imageref and cover (means file upload kaary storage me )
  // storge ka kaam hai audio,video and pic yeh leta hai here we send photo

  // 👿 now above logic se image upload ho gayi hai bss abbh es data ko firestore me rakhana hai  for this timpoort fire store 



 return await addDoc(collection(firestore,'books'),{
  name,
  isbn,
  price,
  imageURl:uploadResult.ref.fullPath,
  userID:user.uid,
displayName:user.displayName,
photoURL:user.photoURL

})


}

  return (
    <FirebaseContext.Provider value={{ handleCreateNewListing,signupUserEmailAndPass, createsignInWithEmailAndPassword,signINwithGoggle,isLoogedIN }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};