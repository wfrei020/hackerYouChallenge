import React, { Component } from 'react';
import _                    from 'lodash';
import './App.css';
import Popup from "reactjs-popup";
import ProductInfo from './ProductInfo.js'

class LcboProductApi extends Component{
    
    constructor(){
        super();
        this.state = {
               products: [],
           stores: [],
                 };
    }
   
    

    
    componentDidMount(){
      const ACCESS_KEY = 'MDphNjhjNGUxZS01Yjc1LTExZTgtYjkzMy01M2EwZDBjMGQ1NDM6ako4YTU4RDRvU2tVanBHR0NjYmM5VGFUZzI3YVJ2QXBLbkw5'
    fetch(`https://lcboapi.com/products?q='Beau's All Natural Brewing'&where=is_seasonal&per_page=30&access_key&access_key=${ACCESS_KEY}`, {
    method: 'GET',
    })
    .then(response => response.json())
    .then((data) => {
        this.setState({
        products: data.result}) ; console.log(data);})
    .catch(e => console.error('parsing error', e)) // End Fetch

    }

    
onClickElement(id , name){
    console.log("i entered this ufnction");
    var modal = document.getElementById('myProductInfo');
     modal.display = "block";
    
    }
    render() {
      

      
        var products = _.map(this.state.products, (product) => {
            
                
            
            if(product.image_thumb_url != null){
        
            return <div key={product.id}>
            
         <div align="center">  
         <Popup 
             trigger={<input type="image" width="30%" src={product.image_thumb_url} name={product.name} alt={product.name}></input>}
             modal
             closeOnDocumentClick > 
             <span> 
            <ProductInfo product={product} />
             </span>
         </Popup> 
               </div><div valign = "middle">{product.name}</div>
               
               
            
            
            
            </div>
            
            
            
            }
        });
        

        return(
     
    <div>

     {products}

     </div>
     
    
  
        )
        
    }
    
    
}


    
export default LcboProductApi;

