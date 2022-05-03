import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "./../../actions"
import { socialUserActions } from "../../actions/"
import ArticleCardLoader from "../../components/Loaders/ArticleCard"
import ArticleCard from "../../components/ArticleCard"
import CategoryDivision from "../../components/Home/CategoryDivision"
import HomeTopBanners from "../../components/TopBanners/HomeTopBanners"
import { getCategoryNameBySlug } from "../../utils/functions"
import { useWindowSize } from "../../components/useWindowSize"
import CenterMenu from "../../components/TopMenu/MenuTop"
import { authActions } from "../../actions/"


const quantidadeLoaders = ["1", "2", "3", "4"]

function HomePage() {
  const dispatch = useDispatch();
  const { 
    forex, 
    cryptos, 
    stockandetfs, 
    commodities, 
    brokers, 
    banks, 
    personal_finance,
    error,
  } = useSelector(state => state.home)
  const { postLike, dataFollow } = useSelector(state => state.socialUser || {})
  const { resetPassToken } = useSelector(state => state.auth)
  const windowSize= useWindowSize().width
  
  useEffect(() => {
    dispatch(homeActions.getArticlesByCategory("forex"));
    dispatch(homeActions.getArticlesByCategory("cryptos"));
    dispatch(homeActions.getArticlesByCategory("stockandetfs"));
    dispatch(homeActions.getArticlesByCategory("commodities"));
    dispatch(homeActions.getArticlesByCategory("brokers"));
    dispatch(homeActions.getArticlesByCategory("banks"));
    dispatch(homeActions.getArticlesByCategory("personal_finance"))
  }, [])

  useEffect(() => {
    dispatch(socialUserActions.isFollowAuthor())
    dispatch(socialUserActions.isLikePost())
  }, [])

  useEffect(() => {
    if (error) {
      console.log(error);
    }
   /*  if (router.query.pass_token) {
      dispatch(setPassToken(router.query.pass_token))
      dispatch(setPassEmail(router.query.email))
      router.push("/")
    } */
  }, [])
  

  useEffect(() => {
    if (resetPassToken) {
      dispatch(authActions.oepnModal("resetPassword"))
    }
  }, [resetPassToken])


  return (
    <div className="flex flex-col w-full">
      <CenterMenu/>
      <HomeTopBanners />
      <div className="grid grid-cols-12 col-span-12 pt-4 gap-6">
        <CategoryDivision categoryName={getCategoryNameBySlug("forex")} categorySlug="forex" />
        { forex ? (
          <Fragment>
            {windowSize <= 768 
              ?
                <Fragment>
                  {forex.slice(0, 1).map((item, key) => (
                    <ArticleCard 
                      isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                      //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                      isFollow={false}
                      dataFollow={dataFollow} 
                      key={key} 
                      item={item} 
                      principal={true} 
                      secondCard={true} 
                    />
                  ))}
                  <div className="col-span-12 gap-4 flex">
                    {forex.slice(1, forex.length - 1).map((item, key) => (
                      <ArticleCard 
                        isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                        //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item?.authors[0]?.id).length > 0 } 
                        isFollow={false}
                        dataFollow={dataFollow} 
                        key={key} 
                        item={item}
                      />
                    )) }
                  </div>
                </Fragment>
              :
              forex.map((item, key) => {
                return (
                  <ArticleCard 
                    isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                    //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item?.authors[0]?.id).length > 0 }
                    isFollow={false}
                    key={key} 
                    item={item} 
                    dataFollow={true}
                  />
                )})
            }
          </Fragment>
        ) : (
          <Fragment>
            {windowSize <= 768 
              ?
                <Fragment>
                {quantidadeLoaders.slice(0, 1).map((item, key) => (
                  <ArticleCardLoader 
                    key={key} 
                    item={item} 
                    principal={true} 
                    secondCard={true}
                  />
                ))}
                <div className="col-span-12 gap-4 flex">
                  {quantidadeLoaders.slice(1, quantidadeLoaders.length - 1).map((item, key) => (
                    <ArticleCardLoader 
                      key={key} 
                      item={item}
                    />
                  ))}
                </div>
                </Fragment>
              :
                quantidadeLoaders.map((item, key) => (
                  <ArticleCardLoader key={key} />
                ))
            }
          </Fragment>
        
        )}

        <CategoryDivision categoryName={getCategoryNameBySlug("cryptos")} categorySlug="cryptos" />
        { cryptos ? (
          <Fragment>
            {windowSize <= 768 
              ?
                <Fragment>
                {cryptos.slice(0, 1).map((item, key) => (
                  <ArticleCard 
                    isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                    //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                    isFollow={false}
                    dataFollow={dataFollow} 
                    key={key} 
                    item={item} 
                    principal={true}
                    secondCard={true}
                  />
                ))}
                <div className="col-span-12 gap-4 flex">
                  {cryptos.slice(1, cryptos.length - 1).map((item, key) => (
                    <ArticleCard 
                      isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                      //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                      isFollow={false}
                      dataFollow={dataFollow} 
                      key={key} 
                      item={item}
                    />
                  ))}
                </div>
                </Fragment>
              :
                cryptos.map((item, key) => (
                  <ArticleCard 
                    isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                    //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                    isFollow={false}
                    dataFollow={dataFollow} 
                    key={key} 
                    item={item} 
                  />
                ))
            }
          </Fragment>
        ) : (
          <Fragment>
            {windowSize <= 768 
              ?
                <Fragment>
                {quantidadeLoaders.slice(0, 1).map((item, key) => (
                  <ArticleCardLoader 
                    key={key} 
                    item={item} 
                    principal={true} 
                  />
                ))}
                <div className="col-span-12 gap-4 flex">
                  {quantidadeLoaders.slice(1, quantidadeLoaders.length - 1).map((item, key) => (
                    <ArticleCardLoader key={key} item={item}/>
                  )) }
                </div>
                </Fragment>
              :
                quantidadeLoaders.map((item, key) => (
                  <ArticleCardLoader key={key} />
                ))
            }
          </Fragment>
        )}

        <CategoryDivision categoryName={getCategoryNameBySlug("stockandetfs")} categorySlug="stockandetfs" />
        { stockandetfs ? (
          <Fragment>
            {windowSize <= 768 
              ?
                <Fragment>
                {stockandetfs.slice(0, 1).map((item, key) => (
                  <ArticleCard 
                    isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                    //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                    isFollow={false}
                    dataFollow={dataFollow} 
                    key={key} 
                    item={item} 
                    principal={true} 
                    secondCard={true}
                  />
                ))}
                <div className="col-span-12 gap-4 flex">
                  {stockandetfs.slice(1, stockandetfs.length - 1).map((item, key) => (
                    <ArticleCard 
                      isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                      //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                      isFollow={false}
                      dataFollow={dataFollow}
                      key={key}
                      item={item}
                    />
                  )) }
                </div>
                </Fragment>
              :
                stockandetfs.map((item, key) => (
                  <ArticleCard 
                    isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0}
                    //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                    isFollow={false}
                    dataFollow={dataFollow} 
                    key={key}
                    item={item} 
                  />
                ))
            }
          </Fragment>
        ) : (
          <Fragment>
            {windowSize <= 768 
              ?
                <Fragment>
                {quantidadeLoaders.slice(0, 1).map((item, key) => (
                  <ArticleCardLoader key={key} item={item} principal={true} />
                ))}
                <div className="col-span-12 gap-4 flex">
                  {quantidadeLoaders.slice(1, quantidadeLoaders.length - 1).map((item, key) => (
                      <ArticleCardLoader key={key} item={item}/>
                  )) }
                </div>
                </Fragment>
              :
                quantidadeLoaders.map((item, key) => (
                  <ArticleCardLoader key={key} />
                ))
            }
          </Fragment>
        )}

        <CategoryDivision categoryName={getCategoryNameBySlug("commodities")} categorySlug="commodities" />
        { commodities ? (
          <Fragment>
            {windowSize <= 768 
              ?
                <Fragment>
                {commodities.slice(0, 1).map((item, key) => (
                  <ArticleCard 
                    isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                    //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                    isFollow={false}
                    dataFollow={dataFollow} 
                    key={key} 
                    item={item} 
                    principal={true} 
                    secondCard={true}
                  />
                ))}
                <div className="col-span-12 gap-4 flex">
                  {commodities.slice(1, commodities.length - 1).map((item, key) => (
                    <ArticleCard 
                      isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                      //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                      dataFollow={dataFollow} 
                      key={key} 
                      item={item}
                    />
                  )) }
                </div>
                </Fragment>
              :
                commodities.map((item, key) => (
                  <ArticleCard 
                    isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                    //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                    isFollow={false}
                    dataFollow={dataFollow} 
                    key={key} 
                    item={item}
                  />
                ))
            }
          </Fragment>
        ) : (
          <Fragment>
            {windowSize <= 768 
              ?
                <Fragment>
                {quantidadeLoaders.slice(0, 1).map((item, key) => (
                  <ArticleCardLoader key={key} item={item} principal={true} />
                ))}
                <div className="col-span-12 gap-4 flex">
                  {quantidadeLoaders.slice(1, quantidadeLoaders.length - 1).map((item, key) => (
                      <ArticleCardLoader key={key} item={item}/>
                  )) }
                </div>
                </Fragment>
              :
                quantidadeLoaders.map((item, key) => (
                  <ArticleCardLoader key={key} />
                ))
            }
          </Fragment>
        )}

        <CategoryDivision categoryName={getCategoryNameBySlug("brokers")} categorySlug="brokers" />
        { brokers ? (
          <Fragment>
            {windowSize <= 768 
              ?
                <Fragment>
                {brokers.slice(0, 1).map((item, key) => (
                  <ArticleCard 
                    isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                    //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                    isFollow={false}
                    dataFollow={dataFollow} 
                    key={key} 
                    item={item} 
                    principal={true} 
                    secondCard={true}
                  />
                ))}
                <div className="col-span-12 gap-4 flex">
                  {brokers.slice(1, brokers.length - 1).map((item, key) => (
                    <ArticleCard 
                      isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                      //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                      isFollow={false}
                      dataFollow={dataFollow} 
                      key={key} 
                      item={item}
                    />
                  )) }
                </div>
                </Fragment>
              :
                brokers.map((item, key) => (
                  <ArticleCard 
                    isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                    //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                    isFollow={false}
                    dataFollow={dataFollow}
                    key={key} 
                    item={item} 
                  />
                ))
            }
          </Fragment>
        ) : (
          <Fragment>
            {windowSize <= 768 
              ?
                <Fragment>
                {quantidadeLoaders.slice(0, 1).map((item, key) => (
                  <ArticleCardLoader key={key} item={item} principal={true} />
                ))}
                <div className="col-span-12 gap-4 flex">
                  {quantidadeLoaders.slice(1, quantidadeLoaders.length - 1).map((item, key) => (
                      <ArticleCardLoader key={key} item={item}/>
                  )) }
                </div>
                </Fragment>
              :
                quantidadeLoaders.map((item, key) => (
                  <ArticleCardLoader key={key} />
                ))
            }
          </Fragment>
        )}

        <CategoryDivision categoryName={getCategoryNameBySlug("banks")} categorySlug="banks" />
        { banks ? (
          <Fragment>
            {windowSize <= 768 
              ?
                <Fragment>
                {banks.slice(0, 1).map((item, key) => (
                  <ArticleCard 
                    isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                    //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                    isFollow={false}
                    dataFollow={dataFollow} 
                    key={key} 
                    item={item} 
                    principal={true} 
                    secondCard={true}
                  />
                ))}
                <div className="col-span-12 gap-4 flex">
                  {banks.slice(1, banks.length - 1).map((item, key) => (
                    <ArticleCard 
                      isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                      //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                      isFollow={false}
                      dataFollow={dataFollow} 
                      key={key} 
                      item={item}
                    />
                  ))}
                </div>
                </Fragment>
              :
                banks.map((item, key) => (
                  <ArticleCard 
                    sLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                    //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                    isFollow={false}
                    dataFollow={dataFollow} 
                    key={key} 
                    item={item} 
                  />
                ))
            }
          </Fragment>
        ) : (
          <Fragment>
            {windowSize <= 768 
              ?
                <Fragment>
                {quantidadeLoaders.slice(0, 1).map((item, key) => (
                  <ArticleCardLoader key={key} item={item} principal={true} />
                ))}
                <div className="col-span-12 gap-4 flex">
                  {quantidadeLoaders.slice(1, quantidadeLoaders.length - 1).map((item, key) => (
                      <ArticleCardLoader key={key} item={item}/>
                  )) }
                </div>
                </Fragment>
              :
                quantidadeLoaders.map((item, key) => (
                  <ArticleCardLoader key={key} />
                ))
            }
          </Fragment>
        )}

        <CategoryDivision categoryName={getCategoryNameBySlug("personal_finance")} categorySlug="personal_finance" />
        { personal_finance ? (
          <Fragment>
            {windowSize <= 768 
              ?
                <Fragment>
                {personal_finance.slice(0, 1).map((item, key) => (
                  <ArticleCard 
                    isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                    //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                    isFollow={false}
                    dataFollow={dataFollow} 
                    key={key} 
                    item={item} 
                    principal={true} 
                    secondCard={true}
                  />
                ))}
                <div className="col-span-12 gap-4 flex">
                  {personal_finance.slice(1, personal_finance.length - 1).map((item, key) => (
                    <ArticleCard 
                      isLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                      //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                      isFollow={false}
                      dataFollow={dataFollow} 
                      key={key} 
                      item={item}
                    />
                  )) }
                </div>
                </Fragment>
              :
                personal_finance.map((item, key) => (
                  <ArticleCard 
                    sLike={postLike && postLike.filter(i => i.post_id === item.id).length > 0} 
                    //isFollow={dataFollow && dataFollow.filter( i => i.author_id === item.authors[0]?.id).length > 0 } 
                    isFollow={false}
                    dataFollow={dataFollow} 
                    key={key} 
                    item={item} 
                  />
                ))
            }
          </Fragment>
        ) : (
          <Fragment>
            {windowSize <= 768 
              ?
                <Fragment>
                {quantidadeLoaders.slice(0, 1).map((item, key) => (
                  <ArticleCardLoader key={key} item={item} principal={true} />
                ))}
                <div className="col-span-12 gap-4 flex">
                  {quantidadeLoaders.slice(1, quantidadeLoaders.length - 1).map((item, key) => (
                      <ArticleCardLoader key={key} item={item}/>
                  )) }
                </div>
                </Fragment>
              :
                quantidadeLoaders.map((item, key) => (
                  <ArticleCardLoader key={key} />
                ))
            }
          </Fragment>
        )}
      </div>
    </div> 
  )
}

export { HomePage }