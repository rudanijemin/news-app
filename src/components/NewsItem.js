import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,discription,imageUrl,newsUrl}  = this.props;

    return (
      <div className="container my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl?"https://c.ndtvimg.com/indian-flag-tricolour-generic-pixabay_625x300_1529830758454.jpg":imageUrl} className="card-img-top" alt="..."/>
          {/* koi image n hoi to  */}
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{discription}</p>
            <a href={newsUrl} target="_blank" className="btn-btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>  
    )
  }
}

export default NewsItem
