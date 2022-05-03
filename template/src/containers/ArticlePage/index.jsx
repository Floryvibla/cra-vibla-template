import React, { useEffect, Fragment } from 'react'
import Article from "./../../components/Article"
import ArticleSkeleton from "./../../components/Loaders/Article"
import { useDispatch, useSelector } from "react-redux"
import { articleAction } from "./../../actions"
import { useLocation } from "react-router-dom";
import { socialUserActions } from "../../actions/"
import { toast } from 'react-toastify';
 
export const ArticlePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, article, error } = useSelector(state => state.article)
  const slug = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(socialUserActions.isFollowAuthor())
    dispatch(socialUserActions.isLikePost())
    dispatch(articleAction.getArticle(slug))
  }, [location.pathname, dispatch])

 useEffect(() => {
  if (error) {
    toast.info("Unable to load this article. Please, reload this page.")
    dispatch(articleAction.clearErrors())
  }
 }, [error, dispatch])

  return (
    loading ? <ArticleSkeleton /> : <Article article={article} /> 
  )
}