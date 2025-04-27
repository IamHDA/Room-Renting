import React, {createContext, useContext, useState} from 'react';
import {addToFavourite, removeFromFavourite} from "../apiServices/favouritePost.js";
import AuthContext from "./AuthContext.jsx";

export const FavouritePostContext = createContext();

export const FavouritePostProvider = ({children}) => {
    const {user} = useContext(AuthContext);
    const [favouritePostIds, setFavouritePostIds] = useState([]);

    const heartButtonHandle = async (postId) => {
        if(!user) alert("Đăng nhập để sử dụng chức năng này");
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

    return (
        <FavouritePostContext.Provider value={{heartButtonHandle, favouritePostIds, setFavouritePostIds}}>
            {children}
        </FavouritePostContext.Provider>
    );
};

export default FavouritePostContext;
