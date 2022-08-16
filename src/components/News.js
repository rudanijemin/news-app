import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

  constructor(){
    super();
    this.state={
      articles : [],
      loading : false
    }
  }

  async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=e06dec00d91346d89993e9c7faee0e31"
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({articles:parseData.articles})
  }
  render() {
    return (
      <div className="container my-3">
        <h2>News Headlines</h2>
        <div className="row">
        {/* col md-3 means that medium divice */}
        {this.state.articles.map((element)=>{
            return  <div className="col md-4" key={element.url} >  
            <NewsItem title={element.title?element.title.slice(0,50):""} discription ={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}

       
        </div>
          
       

      </div>
    )
  }
}