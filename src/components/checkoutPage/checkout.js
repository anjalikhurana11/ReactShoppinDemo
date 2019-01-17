import React, { Component } from 'react';
import { connect } from 'react-redux';
import './checkout.css';

class checkoutPage extends Component {

  constructor(props) {
    super(props);
    this.state = {totalprice : 0,cartList:null};
  }

  componentDidMount(){
    this.fetchCheckoutList();
  }

  fetchCheckoutList(){
    var  userinfo  = localStorage.getItem('user');  
    if(userinfo){ 
      userinfo = JSON.parse(userinfo) ;
      fetch('http://localhost:8081/api/checkout?user_id='+userinfo.id).then(response =>  response.json())
      .then(resData => {
        let msgTotal = resData.reduce(function(prev, cur) {
          return prev + parseInt(cur.product_price);
        }, 0);
        this.setState({
        cartList: resData,
        totalprice: msgTotal
        });
        
      });
    }
  }

  removeFromCart(product) {
    var  userinfo  = localStorage.getItem('user');
    
    if(userinfo){
      
      userinfo = JSON.parse(userinfo) ;
      fetch('http://localhost:8081/api/checkout/'+product.id, {
        method: 'delete',
      }).then(resData => {
        alert(product.product_name+" Succesfully Removed")
        this.fetchCheckoutList();
      });;
    }
    
  }

  render() {
    
    return (
      <div className="cart row">
      <h1 className="main-header cart-header">My Cart</h1>
      <ul className="cart-items">
      {this.state.cartList === null && <p>Loading List...</p>}
          {
            this.state.cartList && this.state.cartList.map(product => (
            <li key={product.id} className="cart-item">
              <a className="cart-item-image-link" href="/products">
                <img className="cart-item-image" height="90" width="100" src="./images.jpeg"/>
              </a>
              <div className="cart-item-info">
              <a className="cart-item-name-link" href="products">
                <h1 className="cart-item-name">{product.product_name}</h1>
              </a>
              <div className="cart-item-value"><span className="cart-item-price">{product.product_price}</span></div>
              <a href="#" onClick={() => this.removeFromCart(product)} className="cart-item-delete">Remove Product</a>
              </div>
              
          </li>
            ))
          } 
          </ul>
          <div className="cart-total">
            <h3><strong>Total:</strong> {'$' + this.state.totalprice}</h3>
            <button type="button" className="cart-pay-button">Pay now</button>
          </div>
      </div>
    )
  }
}

export default connect()(checkoutPage);