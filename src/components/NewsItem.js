import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,discription,imageUrl,newsUrl,author,date,source}  = this.props;

    return (
      <div className="container my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl?"https://c.ndtvimg.com/indian-flag-tricolour-generic-pixabay_625x300_1529830758454.jpg":imageUrl} className="card-img-top" alt="..."/>
          {/* koi image n hoi to  */}
          <div className="card-body">
          <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger">{source}</span>
            
            <h5 className="card-title">{title}</h5>
          
            <p className="card-text">{discription}</p>
           

            <p class="card-text"><small className="text-muted">By{!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl}  className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>  
    )
  }
}

export default NewsItem
