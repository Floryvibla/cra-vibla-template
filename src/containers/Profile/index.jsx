import React, { useEffect } from 'react'
import User from '../../components/User'
import { loadPostsByUser, loadUsersByUsername, loadFollower, loadFollowing, loadUsers, loadAllLikesByUser } from '../../actions/social.actions'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from "react-router-dom";
import PostCard from '../../components/Loaders/PostCard';
import ProfileCard from '../../components/Loaders/ProfileCard';

export function Profile() {
    const dispatch = useDispatch();
    const location =  useLocation()
    const { postsByUser, followings, followers, user, users, likes } = useSelector(state => state.social)
    const loaderCard= [1, 2, 3, 4, 5, 6, 7]
    const slug = location.pathname.split("/")[2];

    useEffect( () => {
        dispatch(loadPostsByUser(slug))
        // console.log(users);
        dispatch(loadUsers())
        dispatch(loadUsersByUsername(slug))
        dispatch(loadFollower(slug))
        dispatch(loadFollowing(slug))
    }, [slug, followings, followers])

    useEffect( () => {
        dispatch(loadAllLikesByUser())
    }, [likes])

    // console.log(user);
    

    return (
        <div className="w-full">
            {postsByUser && user && postsByUser.items && likes
                ? (
                    <User 
                        users={user} 
                        userComments= {users}
                        item={postsByUser.items.sort(function(a, b){return b.id - a.id})} 
                        page= "profile"
                        followers={followers && followers.items}
                        likes={likes}
                    />
                ) 
                : (
                    <>
                        <ProfileCard/>

                        {loaderCard.map(i => (
                            <PostCard />
                        ))}
                    </>
                )
            }
        </div>
    )
}