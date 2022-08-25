import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";



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
  Capitalize= (str) =>{
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

  constructor(props){
    super(props);
    this.state={
      articles : [],
      loading : false,
      page:1,
      totalResults: 0
    }
    document.title=`${this.Capitalize(this.props.category)}-News`;
  }
  async updateNews(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e06dec00d91346d89993e9c7faee0e31&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({articles:parseData.articles  , 
        totalResults:parseData.totalResults,
        loading:false
      })
  }
  async componentDidMount(){
    this.updateNews();
  } 
  handlepre=async()=>{
    // console.log("previous click")
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e06dec00d91346d89993e9c7faee0e31&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parseData = await data.json()
    // console.log(parseData);
    // this.setState({
    //   page:this.state.page-1,
    //   articles:parseData.articles,
    //   loading:false
    // })
    this.setState({page:this.state.page-1})
    this.updateNews();
  }
  handlenext=async()=>{

  //   console.log("next click")
  //   if(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)){

  //   }
  //   else{
  //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e06dec00d91346d89993e9c7faee0e31&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //     this.setState({loading:true});
  //     let data = await fetch(url);
  //     let parseData = await data.json()
      
  //     this.setState({
  //       page:this.state.page+1,
  //       articles:parseData.articles,
  //       loading:false
  //     })
  // }
  this.setState({page:this.state.page-1})
  this.updateNews();

}
fetchMoreData = async() => {
  this.setState({page:this.state.page+1})
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e06dec00d91346d89993e9c7faee0e31&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  let parseData = await data.json()
  console.log(parseData);
  this.setState({
     articles:this.state.articles.concat(parseData.articles) , 
      totalResults:parseData.totalResults,
      loading:false
    })
  
};
  
  render(){
    return (
      <>
        <h2 className="text-center">News - Top {this.Capitalize(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {/* col md-3 means that medium divice */}
        {this.state.articles.map((element)=>{
            return  <div className="col md-4" key={element.url}>  
            <NewsItem title={element.title?element.title.slice(0,50):""} discription ={element.description?element.description.slice(0,80):""}
             imageUrl={element.urlToImage} newsUrl={element.url}author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>

      </>
    )
  }
}