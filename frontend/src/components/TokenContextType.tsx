import React, { FC } from "react";
import { useState } from "react";
import Person from "../classes/Person";

type TokenContextType = {
  token: string;
  me: Person;
  setToken: (token: string) => void;
  setMe: (me: Person) => void;
};

export const TokenContext = React.createContext<Partial<TokenContextType>>({});
export const TokenProvider: FC = ({ children }) => {
    const [token, setToken] = useState<string>("");
    const [me, setMe] = useState<Person>();
    return (
        <TokenContext.Provider value={{
            token,
            me,
            setToken,
            setMe,
        }}>
            {children}
        </TokenContext.Provider>
    );
};
//////////////////////////////////////////////////////////////////////////////////////////////////

type UserContextType = {
    user: Person;
    setUser: (user: Person) => void;
};

export const UserContext = React.createContext<Partial<UserContextType>>({});
export const UserProvider: FC = ({ children }) => {
    const [user, setUser] = useState<Person>();
    return (
        <UserContext.Provider value={{
            user,
            setUser,
        }}>
            {children}
        </UserContext.Provider>
    );
};
