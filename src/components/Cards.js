import React from 'react';
import { MDBCardBody, MDBCol } from 'mdbreact';

class Card extends React.Component {
    render() {
        return (
            <MDBCol md='6' sm='12' lg='4' style={{ display: 'inline-flex' }}>
                {/* <MDBCard style={{ width: "22rem" }}> */}
                {/* <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves /> */}
                <MDBCardBody>

                    <div className="cardOfArticle">
                        <div className="contentOfArticle">
                            <h2>{this.props.title}</h2>
                            <p>{this.props.publishedHour}, {this.props.publishedDate}</p>
                            <span>{this.props.author}, </span>
                            <span style={{ fontStyle: 'italic' }}>{this.props.sourceName}</span>
                            {/* <h3>{this.props.description}</h3> */}
                        </div>
                        <div className="imageOfArticle">
                            <a href={this.props.url_article} target="_blank" title={this.props.urlToImage}>
                                <img src={this.props.urlToImage} alt='api image'></img>
                            </a>
                            <h5> <a href={this.props.url_article} target="_blank">Read more</a></h5>
                            <br />
                            <i className="fas fa-trash-alt fa-3x"
                                title='splice'
                                onClick={() => this.props.removeArticle(this.props.indexOfArticle)}
                            ></i>
                        </div>
                    </div>

                </MDBCardBody>
                {/* </MDBCard> */}
            </MDBCol>
        )
    }
}
export default Card;