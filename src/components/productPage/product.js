import React, { Component } from 'react';
import { connect } from 'react-redux';
import './product.css';

class Product extends Component {

  constructor(props) {
    
    super(props);
    this.state = {
      products: null,
      addCart:null,
      productiD:null
    };
  }

  componentDidMount() {
    // fetch products
    fetch('http://localhost:8081/api/products').then(response =>  response.json())
    .then(resData => {
      this.setState({
      products: resData
      });
    });
}

  addToCart(product) {
    var  userinfo  = localStorage.getItem('user');
    this.setState({
      addCart: false,
      productiD:product.id
     });
    if(userinfo){
      this.setState({
        addCart: true,
       });
      userinfo = JSON.parse(userinfo) ;
      fetch('http://localhost:8081/api/checkout', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "product_id": product.id,
          "user_id": userinfo.id,
          "product_name": product.name,
          "product_price": product.price
        })
      }).then(resData => {
        this.setState({
          addCart: "sucess",
        });
      });;
    }
    
  }
  render() {
    return (
      <div className="shop">
         <h1 className="main-header shop-header">Shop</h1>
         <ul className="shop-item-list row">
         {this.state.products === null && <p>Loading Products...</p>}
          {
            this.state.products && this.state.products.map(product => (
            <li key={product.id} className="shop-item col-md-3 ">
              <div className="shop-item-container">
                <img className="shop-item-image" height="250" width="270" src="./images.jpeg"/>
                <h3>{product.name}</h3>
                <h4>{'$' +product.price}</h4>
                <button onClick={() => this.addToCart(product)}>
                 Add to Cart
                </button>

                {(this.state.addCart === false && this.state.productiD === product.id ) && <p class="error">Please Login First to Add products</p>}
                {(this.state.addCart === "sucess" && this.state.productiD === product.id) && <p class="success">Added Succesfully</p>}
              </div>
            </li>
            ))
          }   
          </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  };
}

export default connect(mapStateToProps)(Product);
