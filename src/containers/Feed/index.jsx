import React, { useEffect, useState, useRef } from 'react'
import User from '../../components/User'
import { loadPosts, loadAllLikesByUser, loadUsers } from '../../actions/social.actions'
import { useSelector, useDispatch } from 'react-redux'
import PostCard from '../../components/Loaders/PostCard';
import { useLocation } from 'react-router-dom';

export function Feed() {
    const dispatch = useDispatch();
    const { posts, sucessCreatePost, myPost, users, sucess, sucessDeletePost, likes } = useSelector(state => state.social)
    const [totalPage, setTotalPage] = useState(1)
    const [indexPost, setIndexPost] = useState('')
    const [page, setPage] = useState(1)
    const [finalPage, setFinalPage] = useState(false)
    const [dataPosts, setDataPosts] = useState([])
    const [myPosts, setMyPosts] = useState([])

    const loaderCard= [1, 2, 3, 4]
    const id= document.querySelector('#observer')
    

    useEffect( () => {
        dispatch(loadPosts(page))
        dispatch(loadUsers())
        setTotalPage(posts && posts._meta && posts._meta.total_pages)
    }, [page])

    useEffect( () => {
        dispatch(loadAllLikesByUser())
    }, [likes])
    

    useEffect(() => {
        if (sucess && posts) {
            dataPosts && setDataPosts(posts && [...dataPosts, ...posts?.items])
//             const newData= [...dataPosts, ...posts?.items]
//             const uniqIds = arr.reduce((ids, el) => ids.add(el.id), new Set());
// // Filter out uniq elements.
//             const uniqElements = arr.filter((el) => uniqIds.delete(el.id));
            // console.log([...new Set(dataPosts)]);
        }
    }, [sucess, posts])
    
    useEffect(() => {
        if (sucessCreatePost) {
            setMyPosts([...myPosts, myPost])
        }
    }, [sucessCreatePost])

    useEffect(() => {
        let newData= dataPosts && dataPosts.filter(i => i.id !== indexPost)
        let newMyPost= myPosts && myPosts.filter(i => i.id !== indexPost)
        if (sucessDeletePost) {
            setDataPosts(newData)
            setMyPosts(newMyPost)
        }
    }, [sucessDeletePost])
    // 
    
    

    useEffect(() => {
        if (posts && posts.items && id) {
            const intersectionObserver = new IntersectionObserver((entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    if (page >= totalPage) {
                        setFinalPage(true)
                    } else {
                        setPage((current) => current + 1)
                    }
                }
            })

            intersectionObserver.observe(document.querySelector('#observer'))

            // console.log(document.querySelector('#observer'));

            return () => intersectionObserver.disconnect()
        }
    }, [id])

    // console.log(users);
    
    

    return (
        <div className="w-full h-full">
            {dataPosts && users && users.items  ? (
                    <User 
                        users={users.items} 
                        item={dataPosts} 
                        page="feed" 
                        finalPage={finalPage}
                        myPosts= {myPosts && myPosts.sort(function(a, b){return b.id - a.id})}
                        indexPost={(e) => setIndexPost(e)}
                        likes={likes}
                        // ex= {dataPosts}
                        // followings={followings && followings.items}
                    />
                ) 
                : (
                    <>
                        <div className={`w-full lg:w-600px h-70px border px-2 my-4 rounded flex items-center justify-between `}>
                            <div className='w-40px h-40px rounded-full bg-blue-200'/>
                            <div className='w-535px h-35px lg:rounded bg-blue-200'/>
                        </div>
                        {loaderCard.map(i => (
                            <PostCard
                                post={true}
                            />
                        ))}
                    </>
                )
            }
        </div>
    )
}