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
       this.fetchStoreData = this.fetchStoreData.bind(this);
        this.fetchdata = this.fetchdata.bind(this);
        
    }
      fetchStoreData(lat , lon){
          
          var query;
          const ACCESS_KEY = 'MDphNjhjNGUxZS01Yjc1LTExZTgtYjkzMy01M2EwZDBjMGQ1NDM6ako4YTU4RDRvU2tVanBHR0NjYmM5VGFUZzI3YVJ2QXBLbkw5'
          if(lat != null || lon != null){
              
                  query = `https://lcboapi.com/stores?lat=${lat}&lon=${lon}&product_id=${product.id}&order=distance_in_meters.asc&access_key&access_key=${ACCESS_KEY}`
          
          }
          else{
           query = `https://lcboapi.com/stores?product_id=${product.id}&access_key&access_key=${ACCESS_KEY}`
          }
          
              fetch(query, {method: 'GET',})
    .then(response => response.json())
    .then((data) => {
        this.setState({stores: data.result});
        
    })
    .catch(error => console.error('parsing error',error))
   }
    
     fetchdata(position){
       var latitude = position.coords.latitude;
                var longitude =position.coords.longitude
                  
               this.fetchStoreData(latitude, longitude)
   }

   
    componentDidMount(){

    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(this.fetchdata);
    } 
    else
    {
        this.fetchStoreData(null, null)
    }
   
        
    }
    

    render(){
      
        
         function price(){
          if(product.has_clearance_sale){
                return(<td>price : {product.price_in_cents / 100}$ <strong>sale: save {product.clearance_sale_savings_in_cents /100}$</strong></td>)}
          else{
                return(<td>price : {product.price_in_cents / 100}$</td>);}
        }
        
        
      function  getStoreInfo(store){
        
        return(
        
        <td colSpan="2">
        <table>
        <tbody>
            <tr>
                <td colSpan="2"><strong>{store.name}</strong></td>
            </tr>
            <tr>
        <td valign="top" >
            <table>
                <tbody>
                    <tr><td>{store.city}, {store.postal_code}</td></tr>
                    <tr><td>{store.distance_in_meters/1000} km away</td></tr>
                    <tr><td>tel:{store.telephone}</td></tr>
                    <tr><td>instock: {store.quantity}</td></tr>
                </tbody>
            </table>
        </td>
        <td>
                    <table>
                <tbody>
                    <tr></tr>
                     <tr>
                    <td><strong>Schedule</strong></td>
                     </tr>
                     
                    <tr>
                   
                         <td colSpan="2">
                        <table className="schedule-list">
                        <tbody>
                        
                            <tr>
                                <td colSpan = "2">Monday {store.monday_open / 60} am - {(store.monday_close /60)-12} pm</td>
                            </tr>
                            <tr>
                                <td colSpan = "2">Tuesday {store.tuesday_open / 60} am - {(store.tuesday_close /60)-12} pm</td>
                            </tr>
                            <tr>
                                <td colSpan = "2">Wednesday {store.wednesday_open / 60} am - {(store.wednesday_close /60)-12} pm</td>
                            </tr>
                            <tr>
                                <td colSpan = "2">Thursday {store.thursday_open / 60} am - {(store.thursday_close /60)-12} pm</td>
                            </tr>
                            <tr>
                                <td colSpan = "2">Friday {store.friday_open / 60} am - {(store.friday_close /60)-12} pm</td>
                            </tr>
                            <tr>
                                <td colSpan = "2">Saturday {store.saturday_open / 60} am - {(store.saturday_close /60)-12} pm</td>
                            </tr>
                            <tr>
                                <td colSpan = "2">Sunday {store.sunday_open / 60} am - {(store.sunday_close /60)-12} pm</td>
                            </tr>
                        </tbody>
                        </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        
        </td>
        </tr>
       </tbody>
       </table>
       </td>
        );
        }
        
        
      var stores = _.map(this.state.stores, (store) => {


      return <tr key={store.id} className="store-info">
          {getStoreInfo(store)}
      </tr>
      
      });
      
    
    
    return (
    
    <div className="scrollable" >
    <table>
    <tbody>
    <tr><td width="30%"><img width="150px" src={product.image_url} alt={product.name}></img></td>
    <td>
    <table><tbody><tr><th>{product.name}</th></tr>
    <tr><td><strong fontSize="35px">{product.package}</strong></td></tr>
    <tr><td>category: {product.primary_category}</td></tr>
    <tr><td>type: {product.secondary_category}</td></tr>
    <tr><td>Alcohol content:  {product.alcohol_content/100}%</td></tr>
    <tr>{price()}</tr>
    </tbody>
    </table>
    </td>
    </tr>
    <tr><td><strong>LCBO Locations</strong></td></tr>
    {stores}
    
    </tbody>
    </table>
    
    </div>
)
    }
}



export default ProductInfo;