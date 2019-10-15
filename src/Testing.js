import React,{ Component } from 'react';
import {FormGroup} from 'react-bootstrap';
import {sortBy} from 'lodash';
import Header from './Header'

const DEFAULT_QUERY='react';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP =100;
const PARAM_HPP ='hitsPerPage='
const PATH_BASE ='https://hn.algolia.com/api/v1';
const PATH_SEARCH ='/search';
const PARAM_SEARCH ='query=';
const PARAM_PAGE = 'page=';
const SORTS  = {
  NONE : list => list,
  TITLE:list => sortBy(list,'title'),
  AUTHOR: list => sortBy(list,'author'),
  COMMENTS: list => sortBy(list,'num_comments').reverse(),
  POINTS: list => sortBy(list,'points').reverse()
} 
const URL=`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}&${PARAM_HPP}${DEFAULT_HPP}`;
console.log(URL);


/*function letMeSearch(searchTerm){
    return function(item){
        return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
}*/


class Testing extends Component{
    constructor(props){
        super(props);
        this.state = {
            results:null,    
            searchKey:'',      
            searchTerm: DEFAULT_QUERY,
            isLoading:false,
            sortKey:'NONE'
        }
        
        this.removeItem = this.removeItem.bind(this);
        this.searchField =this.searchField.bind(this);
        this.fetchTopStories=this.fetchTopStories.bind(this);
        this.setTopStories=this.setTopStories.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
        this.onSort = this.onSort.bind(this);
    }
    onSort(sortKey){
     this.setState({sortKey});
    }
    fetchTopStories(searchTerm,page)
    {
      this.setState({isLoading:true});
     fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
     .then(response => response.json())
     .then(result=>this.setTopStories(result))
     .catch(e => e);     
    } 
    checkTopStories(searchTerm)
    {
     return !this.state.results[searchTerm];
    }
    setTopStories(result)
    {
        const {hits,page} = result;
        const {searchKey,results} = this.state;
        //const oldHits = page !== 0 ? this.state.result.hits:[];
        const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
        const updatedHits  = [...oldHits,...hits];
        this.setState({results: {...results,[searchKey]:{hits:updatedHits,page}},isLoading:false});
        
    }
    removeItem(A)
    {        
        const {searchKey,results} = this.state;
        const {hits,page} = results[searchKey];
        const updatedList = hits.filter(item => item.objectID !== A);        
        //this.setState({result:updatedList}); 
        //this.setState({result: {...this.state.result},hits: updatedList}); 
        //this.setState({result: Object.assign({},this.state.result,{hits: updatedList})});
         this.setState({results: {...results,[searchKey]: {hits: updatedList,page}}});
    }
    searchField(event){
        this.setState({searchTerm: event.target.value})
    }
    componentDidMount(){
      
      const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        this.fetchTopStories(searchTerm, DEFAULT_PAGE);
    }
    onSubmit(event){
      const {searchTerm} = this.state;
      if(this.checkTopStories(searchTerm)){
        this.fetchTopStories(this.state.searchTerm,DEFAULT_PAGE);
      }
      this.setState({searchKey: searchTerm});
      
      event.preventDefault(); 
    }
    render(){ 
           const{results,searchTerm,searchKey,isLoading,sortKey} = this.state;
           const page = (results && results[searchKey] && results[searchKey].page) || 0 ;
           const list = (results && results[searchKey] && results[searchKey].hits) || [] ;
           //if (!result){return null;}
           return (
               
               <div className="btns" >
                 <Header />
                  <div className="jumbotron fluid">
                  <Search
                    onChange={ this.searchField } 
                    value={ searchTerm }
                    onSubmit={this.onSubmit}
                  >NEWSAPP</Search>      
                  </div> 
              { results && <Table 
                              list={ list }
                              sortKey = {sortKey}
                              onSort = {this.onSort}
                              searchTerm={ searchTerm }
                              removeItem={ this.removeItem }
                           />
              }
           
            {isLoading ? <Loading/> :
            <Button
            className= 'btn btn-success'
            onClick={() => this.fetchTopStories(searchTerm,page + 1)}
            >Load more</Button>}
            </div>
          )
    }
}
class Search extends Component{
    componentDidMount(){
      this.input.focus();
    }
    render(){
        const {onChange,value,children,onSubmit} = this.props;
       
        return  (<form onSubmit={onSubmit}>
                 <FormGroup>
                 <h1 style={{textAlign: "center",fontWeight:'bold'}}>{ children }</h1><hr  style={{border:'2px solid black',width:'100px'}}/>
                 <div  >

                 <input  className='searchBtn' onChange={onChange} ref={(node) => {this.input=node}}  value={value} />
                 <span className='input-group-btn' style={{align:'center'}}>
                   <Button 
                     className="btn btn-primary"
                     type="submit"
                   >Search
                   </Button>
                 </span>

                 </div>
                 </FormGroup>                
                 </form>)
    }
}
const Table = ({ list, searchTerm, removeItem,sortKey,onSort }) => {
    return(
      
        <div>
          <div>
      <Sort sortKey={'TITLE'} onSort={onSort}>
         Title
      </Sort>
      <Sort sortKey={'AUTHOR'} onSort={onSort}>
         Author
      </Sort>
      <Sort sortKey={'COMMENTS'} onSort={onSort}>
         Comments
      </Sort>
      <Sort sortKey={'POINTS'} onSort={onSort}>
         Points
      </Sort>
      
      </div>
          {
              //list.filter(letMeSearch(searchTerm) ).map(item =>   
                SORTS[sortKey](list).map(item =>  
                <div key={ item.objectID }>
                  <h1>
                    <a target='_blank' href={ item.url }>
                      { item.title }</a> 
                  </h1>
                  <h4>
  
                    { item.author } | { item.num_comments } Comments | { item.points } Points
                  
                  <Button    
                    className='btn btnleft'                
                    type="button"
                    onClick={ () => removeItem(item.objectID) }>
                      Remove me
                  </Button>
  
                  </h4> <hr />
  
                </div>
              )
            }
        </div>
      )
  }
class Button extends Component{
    render(){  
        const {onClick,button,children,className} = this.props;
        return (          
            <button 
            className={className}
            onClick={ onClick } 
            type={button}>
            {children}
            </button>
               )
            }
}
const Sort = ({sortKey,onSort,children}) => <Button
onClick = {()=>onSort(sortKey)}
>
  {children}
</Button> 
const Loading = ()=> <div><h2>Loading...</h2></div>
export default Testing;