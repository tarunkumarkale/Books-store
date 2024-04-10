import { createContext, useContext } from "react";
import { app } from "./FireData";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);// custom hook 

export const FirebaseProvider = (props) => {
    return (
        <FirebaseContext.Provider >
            {props.children}
        </FirebaseContext.Provider>
    );
};
