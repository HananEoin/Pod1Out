import React, { useState, createContext, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const Context = createContext();

const AppContext = ({
    children
                        }) => {

    const [episodeId, setEpisodeId] = useState(null);

    const [episode, setEpisode] = useState({
        title: null,
        id: null,
        record_date: "",
        file_location:"",
        participants: "",
    });

    const [user, setUser] = useState({
        name: "",
        id: "",
    });


    const readCookie = () =>{
        const cookie = Cookies.get("user");
        if (cookie) {
            setUser(JSON.parse(cookie));
        }
    }

    useEffect(()=> {
        readCookie()
    }, [])


    return (
        <Context.Provider value={{
            episodeId,
            setEpisodeId,
            user,
            setUser,
            episode,
            setEpisode
        }}>
            {children}
        </Context.Provider>
    )
};


export const useAppContext = () => {
    return useContext(Context);
}

export default AppContext;
