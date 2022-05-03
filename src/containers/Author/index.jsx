import React, { useState, useEffect } from 'react'
import { ContentInstance } from "./../../config/HttpGhost";
import Author from '../../components/Author'
import AuthorLoader from '../../components/Loaders/Author'
import { useSelector, useDispatch } from "react-redux"
import { authorActions, socialUserActions } from "./../../actions"


export function AuthorPage() {
    const dispatch = useDispatch();
    const { loading, articles, error } = useSelector(state => state.author)
    const quantidadeLoaders = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"]

    const slugAuthor =  window.location.pathname.split("/")[2];

    useEffect(() => {
      dispatch(socialUserActions.isFollowAuthor())
      dispatch(socialUserActions.isLikePost())
      dispatch(authorActions.loadArticlesByAuthor(slugAuthor))
      
    }, [])

    return (
      articles.length > 0 ? <Author item={articles} idAuthor={articles[0].authors[0]?.id} /> : <AuthorLoader item={quantidadeLoaders} />
    )
}