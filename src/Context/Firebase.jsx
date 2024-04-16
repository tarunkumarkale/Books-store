import { createContext, useContext, useEffect, useState } from "react";
import { app } from "./FireData";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";// storage we only share audio ,pic,video
import { addDoc, collection, getFirestore,getDocs,getDoc,doc,where,query } from "firebase/firestore";

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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// here we take a id as a argument when btn click on view  the product detail apper by

  const getById=async(id)=>{
    const docRef=doc(firestore,"books",id)  //firestore ke under books collection ke under id catch kr
const result =await getDoc(docRef)  // fore single data getDoc
return result
  }
//////////////////////////////////////////////////////////////////////////////////////////////
//order first we add data in order collection then fetch order data
const placeOrder=async(bookId,qty)=>{
  const collectionRef=collection (firestore,"books",bookId,"order")  // firstore ke under books collection ke under bookid ke under make order collection create
  const result=await addDoc(collectionRef,{
    userID:user.uid,
    userEmail:user.email,
    dislplayName:user.displayName,
    photoURL:user.photoURL,
    qty:Number(qty)
  }
)
return result;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// here we fetch my books mens we call book again  after clicking this  one of book we seee its order
const fetchMyBooks=async(userId)=>{

  const collectionRef=collection(firestore,"books");
  const q=query(collectionRef,where("userID","==",userId))
  const result=await getDocs(q)
  console.log(result)
  return result
}

//////////////////////////////////////now we collect data from orders

const getOrders=async(bookId)=>{
   const collectionRef=collection(firestore,"books",bookId,"order")
   const result= await getDocs(collectionRef)
   return result
   
}

  return (
    <FirebaseContext.Provider value={{ handleCreateNewListing, signupUserEmailAndPass, createsignInWithEmailAndPassword, signINwithGoogle, isLoogedIN,ListallBooks,getImageUrl,getById,placeOrder,fetchMyBooks,user,getOrders}}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
