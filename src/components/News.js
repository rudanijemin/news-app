import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:8
  }
  static propType={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }

  constructor(){
    super();
    this.state={
      articles : [],
      loading : false,
      page:1
    }
  }

  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e06dec00d91346d89993e9c7faee0e31&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({articles:parseData.articles  , 
        totalResults:parseData.totalResults,
        loading:false
      })
  } 
  handlepre=async()=>{
    console.log("previous click")
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e06dec00d91346d89993e9c7faee0e31&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      page:this.state.page-1,
      articles:parseData.articles,
      loading:false
    })
  }
  handlenext=async()=>{

    console.log("next click")
    if(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e06dec00d91346d89993e9c7faee0e31&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json()
      
      this.setState({
        page:this.state.page+1,
        articles:parseData.articles,
        loading:false
      })
  }
}

  
  render(){
    return (
      <div className="container my-3">
        <h1 className="text-center">News - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {/* col md-3 means that medium divice */}
        {!this.state.loading && this.state.articles.map((element)=>{
            return  <div className="col md-4" key={element.url} >  
            <NewsItem title={element.title?element.title.slice(0,50):""} discription ={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark"onClick={this.handlepre}>&larr;Previous</button>
        <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark"onClick={this.handlenext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}