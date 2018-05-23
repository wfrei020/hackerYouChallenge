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
   /*
    *
    *   make the api call once the component has mounted, for two reasons
    *   makes it clear that the data won't be loaded until after the initial render
    *   and ensure that the data is only fetched from the client
    *
    *   fetch :
    *         returns products whith the company name : 
    *               Beau's All Natural Brewing
    *               seasonal beer
    *               and 30 per-page to return all of them , code currently does not handle more than 30 (out of time)
    */
    componentDidMount()
    {
        /*LCBOAPI key : 1000 calls per hour*/
      const ACCESS_KEY ='MDphNjhjNGUxZS01Yjc1LTExZTgtYjkzMy01M2EwZDBjMGQ1NDM6ako4YTU4RDRvU2tVanBHR0NjYmM5VGFUZzI3YVJ2QXBLbkw5'
    
       fetch(`https://lcboapi.com/products?q='Beau's All Natural Brewing'&where=is_seasonal&per_page=30&access_key&access_key=${ACCESS_KEY}`, {
    method: 'GET',
    })
    .then(response => response.json()) //convert to json
    .then((data) => {
            this.setState({//set the state of product
                           products: data.result
                         });
                    })
    .catch(e => console.error('LCBOAPI call error', e)) // End Fetch and return any errors

    }

    

    render() 
    {
          //variable to display the products
        var products = _.map(this.state.products, (product) => {
            
            if(product.image_thumb_url != null)
            {
            return  <div key={product.id} className="grid-item">
                        <div align="center">
                        {/*Create a popup for all products*/}
                             <Popup 
                                 trigger={<input type="image" width="30%" title={product.tags} src={product.image_thumb_url} name={product.name} alt={product.name}></input>}
                                 modal
                                 closeOnDocumentClick > 
                                 <span >
                                <ProductInfo product={product} />
                                 </span>
                             </Popup>
                        </div>
                        <div valign = "middle">{product.name}</div>
                    </div> 
            }
        });
        

        return(
            <div>
                <h2>Seasonal beers currently available at LCBO</h2>
                <div className="grid-container" >
                {products}
                </div>
            </div>
        )
        
    }
    
    
}


    
export default LcboProductApi;

