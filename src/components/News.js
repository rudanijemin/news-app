import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h2>News Headlines</h2>
        <div className="row">
        {/* col md-3 means that medium divice */}
          <div className="col md-4">  
          <NewsItem title="my title" discription ="dsc"/>
          </div>
          <div className="col md-4">
          <NewsItem title="my title" discription ="dsc"/>
          </div>
          <div className="col md-4">
          <NewsItem title="my title" discription ="dsc"/>
          </div>
        </div>
          
       

      </div>
    )
  }
}