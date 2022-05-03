import React, { useEffect, Fragment } from "react";
import { getCategoryNameBySlug } from "./../../utils/functions"
import ArticleCardLoader from "./../../components/Loaders/ArticleCard"
import ArticleCard from "./../../components/ArticleCard"
import CategoryDivision from "./../../components/Home/CategoryDivision"
import { useWindowSize } from "../../components/useWindowSize"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { useLocation } from "react-router-dom";
import { articleCategoryActions, socialUserActions } from "./../../actions"
const quantidadeLoaders = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"]

export function CategoryPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, articles, error, category } = useSelector(state => state.articleCategory)
  const { totalLike, followAuthor, postLike, dataFollow } = useSelector(state => state.socialUser)
  const windowSize= useWindowSize().width
  const isMobile= windowSize <= 768 ? true : false

  useEffect(() => {
    console.log(location);
    const slugCategory =  location.pathname.split("/")[2];
    const slugSubcategory = location.search.split("=")[1];
    dispatch(articleCategoryActions.loadArtcles(slugCategory, slugSubcategory, 1))
  }, [location.pathname, location.search])

  useEffect(() => {
    dispatch(socialUserActions.isFollowAuthor())
    dispatch(socialUserActions.isLikePost())
    // console.log("Loading aqui" ,articles);
  }, [])

  useEffect(() => {
    if (error) {
      dispatch(articleCategoryActions.clearErrors());
      toast.error("Articles load error.")
    }
  }, [error, dispatch])

  return (
    <div className="flex flex-col w-full" style={{ minHeight: "calc(100vh - 96px)"}}>
      <CategoryDivision categoryName={ getCategoryNameBySlug(category) } categorySlug={category} />
      <div className="grid grid-cols-12 col-span-12 pt-4 gap-6">
        { loading ? (
          <Fragment>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 col-span-12">
              { quantidadeLoaders.map((item, key) => (
                <div className={key % 3 === 0 ? "col-span-2 lg:col-span-1" : "col-span-1 lg:col-span-1"}>
                  <ArticleCardLoader key={key} />
                </div>
              ))}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {articles.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 col-span-12">
                {articles.map((item, key) => {
                  return(
                    <Fragment>
                      {key % 3 === 0 ?
                        <div className="col-span-2 lg:col-span-1">
                          <ArticleCard isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } key={key} item={item} secondCard={isMobile}/>
                        </div>
                        :
                        <div className={"col-span-1 lg:col-span-1"}>
                        <ArticleCard isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } key={key} item={item}/>
                      </div>
                      }
                    </Fragment>
              )
                })}
            </div>)

           : (
              <div className="col-span-12 p-8 flex items-center justify-center"> 
                <p className="text-md text-center text-gray-600">No articles found</p>
              </div>
            )}
          </Fragment>
        ) }
      </div>
    </div>
  )
}