import React, { useEffect, useState } from 'react'
import Cards from './Cards';
import axios from "axios";
import moment from 'moment'
import { MDBRow, MDBCol, MDBCard } from 'mdbreact'

function LoadApi() {
    const [articles, setArticles] = useState([])
    const [articlesStatic, setArticlesStatic] = useState([])
    const [loadData, setLoadData] = useState(true)
    const [authors, setAuthors] = useState([])
    const [today, SetToday] = useState(null)
    const [isTodaySelected, setIsTodaySelected] = useState(false)
    const [display, setDisplay] = useState('none')
    useEffect(() => {
        getDataFromApi();

        let today = new Date();
        let currentDate = today.toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit' })
        SetToday(currentDate)

    }, []);

    const getDataFromApi = () => {
        const proxyUrl = "https://cors-anywhere.herokuapp.com/"
        const url = `${proxyUrl}https://news-api-server.netlify.app/.netlify/functions/api`;
        const request = new Request(url);

        fetch(`${proxyUrl}https://news-api-server.netlify.app/.netlify/functions/api`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then((res) => {
                console.log(res);
                setArticles(res.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)))
                setArticlesStatic(res.articles)
                setLoadData(false)
            })
            .catch(error => {
                console.log(error);
            });

        // axios
        //     .get(`https://newsapi.org/v2/everything?q=Apple&from=2021-07-25&sortBy=popularity&apiKey=${process.env.REACT_APP_API_KEY}`)
        //     .then(res => {
        //         console.log(res.data.articles)
        //         setArticles(res.data.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)))
        //         setArticlesStatic(res.data.articles)
        //         setLoadData(false)
        //     })
        //     .catch(e => console.log('error ', e))

    }

    const load = () => articles.map((article, index) => {
        if (authors.indexOf(article.author) == -1)
            authors.push(article.author)

        let dateOfArticle = new Date(article.publishedAt).toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit' })
        let hourOfArticle = moment(article.publishedAt).format('HH:mm')
        return (
            <Cards key={index}
                indexOfArticle={index}
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
                removeArticle={removeArticle}
            >
            </Cards >
        )
    })

    const sortData = (e) => {
        const { value } = e.target

        let sortedArticles = []
        switch (value) {
            case "1":
                // setArticles(articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)))
                sortedArticles = [...articles].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
                break;
            case "2":
                // setArticles(articles.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)))
                sortedArticles = [...articles].sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))
                break;
            default:
                break;
        }
        console.log("sortedArticles", sortedArticles)
        setArticles(sortedArticles)
    }

    const filterOnlyToday = (e) => {
        setIsTodaySelected(!isTodaySelected)
        if (!isTodaySelected) {
            const filteredArticles = articles.filter(article => {
                return e.target.value == new Date(article.publishedAt).toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit' })
            })
            setArticles(filteredArticles)
        }
        else
            setArticles(articlesStatic)
    }

    const filterByAuthor = (e) => {
        const { value } = e.target

        if (value == 0)
            setArticles(articlesStatic)
        else {
            const findAuthor = articlesStatic.filter(a => {
                return a.author == e.target.value
            })
            setArticles(findAuthor)
        }
    }

    const filterByText = e => {
        console.log(e.target.value)
        const query = e.target.value


        const find = articlesStatic.filter(a => {
            try {
                return a.author.toLowerCase().includes(query.toLowerCase())
                    || a.title.toLowerCase().includes(query.toLowerCase())
                    || a.author.toLowerCase().includes(query.toLowerCase())
                    || a.sourceName.toLowerCase().includes(query.toLowerCase())
                    || a.description.toLowerCase().includes(query.toLowerCase())
                    || a.content.toLowerCase().includes(query.toLowerCase())
            } catch (error) {

            }
        })
        setArticles(find)
    }

    const removeArticle = index => {
        console.log(index)

        articles.splice(index, 1)
        console.log('articles', articles)
        setArticles([...articles])
    }
    return (
        <div>
            {
                !loadData ?
                    <>
                        <br />
                        <MDBRow className="col-sm-12">
                            <div className="col-sm-12 text-center">
                                <input type="search"
                                    title='filter'
                                    className="col-sm-12 text-center form-control"
                                    placeholder="Type to search"
                                    onChange={e => filterByText(e)}>
                                </input>
                            </div>
                            <br /><br />
                            <MDBCol md='4' className='form-control'>
                                <label className='col-md-6'>Sort by Date:
                                </label>
                                <select className='col-md-6' onChange={e => sortData(e)} title='sort'>
                                    <option value="1" selected={true}>New to old</option>
                                    <option value="2">Old to new</option>
                                </select>
                            </MDBCol>
                            <MDBCol md='4' className='form-control'>
                                <label title='filter' className='col-md-12'>Filter articles of today:&nbsp;
                                    <input type="checkbox" onChange={(e) => filterOnlyToday(e)} value={today}></input>&nbsp;
                                </label>

                            </MDBCol>

                            {/* <button onClick={() => load()}>Sort</button> */}

                            <MDBCol md='4' className='form-control'>
                                <label className='col-md-6'>Filter by Author:
                                </label>
                                <select className='col-md-6' onChange={e => filterByAuthor(e)} title='filter'>
                                    <option value={'0'}>Not filtered</option>
                                    {
                                        authors.map((element, index) => {
                                            return (
                                                <option value={element}>
                                                    {element}
                                                </option>
                                            )
                                        })
                                    }
                                </select>

                            </MDBCol>
                            <br /> <br />
                            <div className="col-sm-12 text-center">
                                <span className="col-md-12 text-center">Total - {articles.length}/20</span>
                            </div>
                            <br />
                            <hr />
                            {load()}



                        </MDBRow>
                    </>
                    : <>


                        <h2 className="text-center">
                            <div className='text-left col-md-8 font-weight-bolder' style={{ margin: 'auto' }, { fontSize: '14pt' }}>

                                <p>To load this website please do the next QUICK steps:&nbsp;<i className="far fa-smile fa-2x"></i>
                                </p>
                                <br />
                                <p>
                                    1.<a href='https://cors-anywhere.herokuapp.com/' target='_blank'>click here </a>
                                    <span>  and then click on: <strong>"Request temporary access to the demo server"</strong></span>
                                </p>


                                <p>2. Refresh Website&nbsp;
                                    <a href='/'>
                                        <i class="fas fa-sync-alt fa-2x"></i>
                                    </a>
                                </p>
                                <p><i className="fas fa-question-circle fa-2x" title='Why?'
                                    onClick={() => display == 'none' ? setDisplay('block') : setDisplay('none')
                                    }

                                ></i></p>
                                <div style={{ display }}>
                                    <h2>Why?</h2>

                                    <p>This site used API who isn't a third party library.</p>
                                    <p>To enable this API (without using a server) - we are using a free proxy</p>
                                </div>
                            </div>

                            <i className="fas fa-hand-point-up"></i>&nbsp;
                            Follow the instructions above
                        </h2>
                    </>
            }
        </div>
    )
}
export default LoadApi