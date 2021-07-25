import React, { useEffect, useState } from 'react'
import Cards from './Cards';
import axios from "axios";
import moment from 'moment'
import { MDBRow } from 'mdbreact'

function LoadApi() {
    const [articles, setArticles] = useState([])
    const [loadData, setLoadData] = useState(true)
    useEffect(() => {
        axios
            .get(`https://newsapi.org/v2/everything?q=Apple&from=2021-07-25&sortBy=popularity&apiKey=04fa289ca9a047bba41bbeadfc22b364`)
            .then(res => {
                // console.log(res.data.articles)
                setArticles(res.data.articles)
                setLoadData(false)
            })
            .catch(e => console.log('error ', e))

    }, [])

    const load = articles.sort((a, b) => a.title - b.title).map((article, index) => {
        let dateOfArticle = new Date(article.publishedAt).toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit' })
        let hourOfArticle = moment(article.publishedAt).format('HH:mm')
        return (
            <Cards key={index}
                title={article.title}
                publishedDate={article.publishedA}
                author={article.author}
                sourceName={article.source.name}
                publishedDate={dateOfArticle}
                publishedHour={hourOfArticle}
                description={article.description}
                content={article.content}
                url_article={article.url}
                urlToImage={article.urlToImage}
            >
            </Cards>


            // <div key={index}>
            //     <h2>{article.title}</h2>
            //     <p>{new Date(article.publishedAt).toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit' })},   {moment(article.publishedAt).format('HH:mm')}</p>
            //     <span>{article.author}, </span>
            //     <span style={{ fontStyle: 'italic' }}>{article.source.name}</span>
            //     <h3>{article.description}</h3>
            //     {/* <p>{article.content}</p> */}
            //     <a href={article.url} target="_blank">
            //         <img width='300' height='inherit' style={{ textAlign: 'center', margin: 'auto' }} src={article.urlToImage}></img>
            //     </a>

            // </div>
        )
    })

    return (
        <div>
            <MDBRow className="col-sm-12">
                {
                    !loadData ?
                        load
                        : <h2 className="text-center">Loading...</h2>
                }
            </MDBRow>

        </div>
    )
}
export default LoadApi