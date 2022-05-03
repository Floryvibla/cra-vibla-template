import React, { useEffect, useState } from 'react'
import User from '../../components/User'
import { loadSelfPost, loadUsers, loadAllLikesByUser } from '../../actions/social.actions'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from "react-router-dom";
import PostCard from '../../components/Loaders/PostCard';

export function SelfPost() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { selfPost, likes, error, users } = useSelector(state => state.social)
    const slug = location.pathname.split("/")[3];
    const [comments, setComments] = useState(null)
    const [answerComments, setAnswerComments] = useState(null)

    const id= document.querySelector('#observer')

    useEffect( () => {
        dispatch(loadSelfPost(slug))
        dispatch(loadUsers())
    }, [selfPost])

    useEffect( () => {
        dispatch(loadAllLikesByUser())
    }, [likes])

    // useEffect(() => {
    //   if (selfPost) {
    //     const mapAnswer= selfPost.comments?.map(i => selfPost.comments.filter(c => c.id === i.parent_id))
    //     const ex= mapAnswer?.filter(i => i.length > 0)
    //     const ex2= ex?.map(i => i)
    //     // ex2 && setAnswerComments([...ex2])
    //     console.log(answerComments);
    //   }
    // }, [selfPost])
    

    // console.log(selfPost);

    return (
        <div className="w-full">
            {selfPost && Object.keys(selfPost).length > 0 && users && users.items 
                ? (
                    <User 
                        users={users.items} 
                        item={selfPost} 
                        page= "selfPost"
                        likes={likes}
                    />
                ) 
                : (
                    <PostCard/>
                )
            }
        </div>
    )
}