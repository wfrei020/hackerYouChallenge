import React, { Component } from 'react';
import _                    from 'lodash';
import './App.css';


 var product

class ProductInfo extends Component{
   
    constructor(props)
    {
        super(props);
        product=  this.props.product;
        this.state = {
           stores: [],
           loading:true,
           
        };
        this.fetchStoreData = this.fetchStoreData.bind(this);
        this.fetchdata = this.fetchdata.bind(this);
    }
    /*
     *  fetch : returns the store data with the following conditions
     *          if the user enables location services
     *          it will return  the lcbo holding the specific beer the user selects in order of closest to the user
     *          if the user does not enable location it will return the 20 first locations that is holding the beer
     *
     */
    fetchStoreData(lat , lon)
    {
        var query;
        const ACCESS_KEY = 'MDphNjhjNGUxZS01Yjc1LTExZTgtYjkzMy01M2EwZDBjMGQ1NDM6ako4YTU4RDRvU2tVanBHR0NjYmM5VGFUZzI3YVJ2QXBLbkw5'
        if(lat != null || lon != null)
        {
                  query = `https://lcboapi.com/stores?lat=${lat}&lon=${lon}&product_id=${product.id}&order=distance_in_meters.asc&access_key&access_key=${ACCESS_KEY}`
        }
        else{
           query = `https://lcboapi.com/stores?product_id=${product.id}&access_key&access_key=${ACCESS_KEY}`
          }
          
        fetch(query, {method: 'GET',})
        .then(response => response.json() )
        .then((data) => {
            this.setState({stores: data.result});
            this.setState({loading:false});
            })
        
        .catch(error => console.error('parsing error',error))
   }
    
     fetchdata(position)
    {
         this.fetchStoreData(position.coords.latitude, position.coords.longitude)
    }

    
   /*calling the API from this wrapper function which uses geolocation to find the current position if the browser supports it*/
    componentDidMount()
    {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(this.fetchdata);
        } 
        else
        {
            this.fetchStoreData(null, null)
        }
    }

    render()
    {
        //returns if the price on beer and if it has a sale it will return the saved cents
        function price(){
            if(product.has_clearance_sale)
            {
                return (<td>Price : ${product.price_in_cents / 100} 
                <strong>Sale: Save ${product.clearance_sale_savings_in_cents /100}</strong>
                </td>)
            }
            else
            {
                return(<td>Price : ${product.price_in_cents / 100}</td>);}
            }
        
        function getSchedule(dayofWeek , storeInfo)
        {
        var dayName , closeTime, openTime;
            switch(dayofWeek)
            {
                case 0:
                    dayName = "Monday ";
                    openTime=storeInfo.monday_open / 60;
                    closeTime=(storeInfo.monday_close /60)-12;
                    break;
                case 1:
                    dayName = "Tuesday  ";
                    openTime=storeInfo.tuesday_open / 60;
                    closeTime=(storeInfo.tuesday_close /60)-12;
                    break;
                case 2:
                    dayName = "Wednesday";
                    openTime=storeInfo.wednesday_open / 60;
                    closeTime=(storeInfo.wednesday_close /60)-12;
                    break;
                case 3:
                    dayName = "Thursday ";
                    openTime=storeInfo.thursday_open / 60;
                    closeTime=(storeInfo.thursday_close /60)-12;
                    break;
                case 4:
                    dayName = "Friday   ";
                    openTime=storeInfo.friday_open / 60;
                    closeTime=(storeInfo.friday_close /60)-12;
                    break;
                case 5:
                    dayName = "Saturday ";
                    openTime=storeInfo.saturday_open / 60;
                    closeTime=(storeInfo.saturday_close /60)-12;
                    break;
                case 6:
                    dayName = "Sunday   ";
                    openTime=storeInfo.sunday_open / 60;
                    closeTime=(storeInfo.saturday_close /60)-12;
                    break;
                default:
                    dayName = "";
                    openTime=0;
                    closeTime=0;
                    break;
            }
            
            if(openTime%1 !== 0){
                openTime = parseInt(openTime,0)+":30";
            }
            else
            {
                openTime = parseInt(openTime,0)+":00";
            }
            if(closeTime%1 !== 0){
                closeTime = parseInt(openTime,0)+":30";
            }
            else{
                closeTime = parseInt(openTime,0)+":00";
            }
            
           return  <tr><td>{dayName}</td><td> {openTime} am - {closeTime} pm</td></tr>
        
        }
        
        //helper function to displays the stores info properly
        function  getStoreInfo(store)
        {
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
                                            <tr><td>Tel:{store.telephone}</td></tr>
                                            <tr><td>In stock: {store.quantity}</td></tr>
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
                                                            {getSchedule(0,store)}
                                                            {getSchedule(1,store)}
                                                            {getSchedule(2,store)}
                                                            {getSchedule(3,store)}
                                                            {getSchedule(4,store)}
                                                            {getSchedule(5,store)}
                                                            {getSchedule(6,store)}
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
        
        //display store info
      var stores = _.map(this.state.stores, (store) => {
      
            return  <tr key={store.id} className="store-info">
                    {getStoreInfo(store)}
                    </tr>
      });
     var loaded = this.state.loading;
     
      function test(store)
      {
          if(stores.length !== 0)
          {
              return stores;
          }
          else if(loaded && store.length === 0) {return <tr><td colSpan="2" color="red"><strong fontSize="13px">Loading...</strong></td></tr>}
          else
          {
              return <tr><td colSpan="2" color="red"><strong fontSize="13px">Sorry, there are none available at an LCBO near your location</strong></td></tr>
          }
      }
      
    return (
    
    <div className="scrollable" >
            <table>
                <tbody>
                    <tr><td width="30%"><img width="150px" src={product.image_url} alt={product.name}></img></td>
                        <td>
                            <table>
                                <tbody><tr><th>{product.name}</th></tr>
                                    <tr><td><strong fontSize="35px">{product.package}</strong></td></tr>
                                    <tr><td>Category: {product.primary_category}</td></tr>
                                    <tr><td>Type: {product.secondary_category}</td></tr>
                                    <tr><td>Alcohol content:  {product.alcohol_content/100}%</td></tr>
                                    <tr>{price()}</tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr><td><strong>LCBO Locations</strong></td></tr>
                    {test(stores)}
                </tbody>
            </table>
    </div>
)
    }
}



export default ProductInfo;