import { createContext, useContext } from "react";
import { app } from "./FireData";

const FirebaseContext = createContext(null);
let name='taurn'
export const useFirebase = () => useContext(FirebaseContext);// custom hook 

export const FirebaseProvider = (props) => {
    return (
        <FirebaseContext.Provider value={{name}} >
            {props.children}
        </FirebaseContext.Provider>
    );
};
