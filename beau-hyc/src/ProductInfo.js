import React, { Component } from 'react';
import _                    from 'lodash';
import './App.css';


 var product

class ProductInfo extends Component{
   
    constructor(props){
        super(props);
       
        product=  this.props.product;
       
       this.state = {
           stores: [],
       };
       this.fetchdata = this.fetchdata.bind(this);
    }
    
     fetchdata(position){
       var latitude = position.coords.latitude;
       
        
                 const ACCESS_KEY = 'MDphNjhjNGUxZS01Yjc1LTExZTgtYjkzMy01M2EwZDBjMGQ1NDM6ako4YTU4RDRvU2tVanBHR0NjYmM5VGFUZzI3YVJ2QXBLbkw5'
            
             
                var longitude =position.coords.longitude
               
   
    fetch(`https://lcboapi.com/stores?lat=${latitude}&lon=${longitude}&product_id=${product.id}&access_key&access_key=${ACCESS_KEY}`, {
    method: 'GET',
    })
    .then(response => response.json())
    .then((data) => {
        this.setState({stores: data});
        console.log(data);
    })
    .catch(error => console.error('parsing error',error))
        
       
       
       
   }
    componentDidMount(){

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.fetchdata);
    } 
    
   
        
    }
    

    
    render(){
      var stores = _.map(this.state.stores, (store) => {
      
      return 
      
      });
    
    
    return (
    
    <div><p>{product.id} </p>    </div>
)
    }
}



export default ProductInfo;