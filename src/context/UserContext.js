import React, { createContext, useState, useMemo } from "react";

const UserContext = createContext({
    authUser: {},
    setAthUser: () => {},
});

const UserContextProvider = ({ children }) => {
    
    const [authUser, setAthUser] = useState({
        "nombre":"",
        "email":"",
        "usuario":"",
        "password":"",
        "perfil":"",
        "estado":"  "
      });
    const value = useMemo(() => ({ authUser, setAthUser }), [authUser]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

const UserContextConsumer = UserContext.Consumer;
export { UserContext, UserContextProvider, UserContextConsumer };