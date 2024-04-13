import { createContext, useContext, useEffect, useState } from "react";
import { app } from "./FireData";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";// storage we only share audio ,pic,video
import { addDoc, collection, getFirestore,getDocs } from "firebase/firestore";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

const firebaseAuth = getAuth(app);
const Googleprovider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const Storage = getStorage(app);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);



  const isLoogedIN =  user ? true : false;

  const signupUserEmailAndPass = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const createsignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signINwithGoogle = () => {
    return signInWithPopup(firebaseAuth, Googleprovider);
  };

  const handleCreateNewListing = async (name, isbn, price, cover) => {
    const imageRef = ref(Storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes(imageRef, cover);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const ListallBooks=()=>{
    return getDocs(collection(firestore,"books"))
  }


  const getImageUrl = (path) => {
return getDownloadURL(ref(Storage,path)) // Return the download URL of the file
  }


  return (
    <FirebaseContext.Provider value={{ handleCreateNewListing, signupUserEmailAndPass, createsignInWithEmailAndPassword, signINwithGoogle, isLoogedIN,ListallBooks,getImageUrl}}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
