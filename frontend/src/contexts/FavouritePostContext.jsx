import React, {createContext, useContext, useEffect, useState} from 'react';
import {addToFavourite, getFavouritePostsIdByUser, removeFromFavourite} from "../apiServices/favouritePost.js";
import AuthContext from "./AuthContext.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export const FavouritePostContext = createContext();

export const FavouritePostProvider = ({children}) => {
    const {user} = useContext(AuthContext);
    const [favouritePostIds, setFavouritePostIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if(user){
                const tmpFav = localStorage.getItem("favouritePostsId");
                if(tmpFav) setFavouritePostIds(JSON.parse(tmpFav));
                else{
                    try {
                        const response = await getFavouritePostsIdByUser();
                        localStorage.setItem("favouritePostsId", JSON.stringify(response));
                        setFavouritePostIds(response);
                    }catch(e){
                        console.log(e);
                    }
                }
            } else {
                setFavouritePostIds([]);
            }
        }
        fetchData();
    }, [])

    const heartButtonHandle = async (postId) => {
        if(!user) alert("Đăng nhập để sử dụng chức năng này");
        else{
            if(favouritePostIds.includes(postId)){
                const response = await removeFromFavourite(postId);
                if(response !== "Removed post from favourite") alert("Có lỗi xảy ra");
                else{
                    const newFavouritePostList = [...favouritePostIds].filter(id => id !== postId);
                    setFavouritePostIds(newFavouritePostList);
                    localStorage.setItem("favouritePostsId", JSON.stringify(newFavouritePostList));
                }
            }else{
                try{
                    const response = await addToFavourite(postId);
                    if(response !== "Added post to favourite") alert("Có lỗi xảy ra");
                    else{
                        const newFavouritePostList = [...favouritePostIds, postId];
                        setFavouritePostIds(newFavouritePostList);
                        localStorage.setItem("favouritePostsId", JSON.stringify(newFavouritePostList));
                    }
                }catch(e){
                    console.log(e);
                }
            }
        }
    }

    return (
        <FavouritePostContext.Provider value={{heartButtonHandle, favouritePostIds, setFavouritePostIds}}>
            {children}
        </FavouritePostContext.Provider>
    );
};

export default FavouritePostContext;
