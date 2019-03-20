import React, { Component } from 'react'
import { connect }  from 'react-redux'
import axios from 'axios'
import Cookies from 'universal-cookie'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'

import Bill from './Bill'

const cookie = new Cookies()

class ProductCart extends Component {
  // format IDR
  constructor(props) {
    super(props);
    this.formatterIDR = new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      })
      
}

  // to prevent warning memory leaks on your damn browser!!
  _isMounted = false;

  state ={
      cart:[],
      selectedIdx:0
  }
  
  componentDidMount(){
        
        this.getCart()
      
  }
  
  // referensi
  // https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/
  componentWillUnmount(){
    this._isMounted = false
    
  }
  
  getCart =()=>{
    this._isMounted =true
      axios.get('http://localhost:1991/carts',{
        params:{
           username: cookie.get("masihLogin")
          
        }
      })
      .then(res=>{
        if(this._isMounted){
          this.setState({cart:res.data, selectedIdx:0})
        }
          
      })
  }

  // Remove Product from Cart
  onCartDel = (id) => {
    const ask = window.confirm('Apakah Kamu ingin menghapus produk ini?')
    
    if (ask === true){
      const delId = id
    
      axios.delete(`http://localhost:1991/carts/${delId}`)
  
        .then(res => {
          this.getCart() 
        })
    } else {
      alert('Terima kasih, kamu tidak menghapus data ini')
    }
    
  }

  //Revise Product Quantity
  onCartEdit = id =>{
     this.setState({selectedIdx:id})
  }

  onSaveCart = id =>{
    
    axios.get(`http://localhost:1991/carts/${id}`)
      .then(res=>{
          const user = res.data.username
          const prodId = res.data.productId
          const name = res.data.name
          const desc = res.data.desc
          const price = res.data.price
          const src = res.data.src
          const id = res.data.id

          if(user && prodId){
            const eQty = parseInt(this.qty.value)
            axios.put(`http://localhost:1991/carts/${id}`, {
              productId: prodId,
              username: user,
              name,
              qty: eQty,
              desc,
              price,
              src,
              id,
            }).then(res => {
              console.log('data telah di update')
              this.getCart()
              this.checkout()
            })
          }
          
      })
     
  }


  //checkout cart
  checkout = () => {
    if (this.state.flag) {
      return <Bill list={this.state.cart} />
    } else {
      return (<div className="d-flex justify-content-center">
        <button onClick={this.clickCheckOutBtn} className="btn btn-outline-primary mt-5">Check Out</button>
      </div>)
    }
  }

  clickCheckOutBtn = () => {
    this.setState({ flag: true })
  }

  cartList =()=>{
    return this.state.cart.map(item=>{
       if(item.id!== this.state.selectedIdx){
        return(
          <tbody>
          <tr key={item.id}>
            <td>{item.productId}</td>
            <td>{item.name}</td>
            <td>{item.desc}</td>
            <td>{this.formatterIDR.format(item.price)}</td>
            <td>
              <img className="list" src={item.src} alt={item.src} />
            </td>
            <td>{item.qty}</td>
            <td><button onClick={()=>{this.onCartEdit(item.id)}} className="btn btn-success">+/-</button></td>
            
            
            <td><button onClick={()=>{this.onCartDel(item.id)}} className="btn btn-danger mr-2">Remove</button></td>
          </tr>
          </tbody>
        )
       } else {
        return(
          <tr key={item.id}>
            <td>{item.productId}</td>
            <td>{item.name}</td>
            <td>{item.desc}</td>
            <td>Rp {item.price}</td>
            <td>
              <img className="list" src={item.src} alt={item.src} />
            </td>
            <td><input ref={input => this.qty = input} className="form-control" type="number" defaultValue={item.qty}></input></td>
    
            <td><button onClick={()=>{this.onSaveCart(item.id)}} className="btn btn-success">Save</button></td>
            <td><button onClick={()=>{this.onCartDel(item.id)}} className="btn btn-danger mr-2">Remove</button></td>
          </tr>
        )
  
       }
    })
  }
  render() {
    if (this.props.username !== "") {

      if (this.state.cart.length > 0) {        
        return (
          <div className="container">
            <h1 className="display-4 text-center">Your Cart</h1>
            <table className="table table-hover mb-5">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NAME</th>
                  <th scope="col">DESC</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">PICTURE</th>
                  <th scope="col">QUANTITY</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
                {this.cartList()}
            </table>
            <div className="container">
              <h1 className="display-4 text-center">Total</h1>
                {this.checkout()}
            </div>
          </div>
        )
      } else {
        return (
          <div className="container mt-5">
            <div className=" row d-flex justify-content-center">
              <h1 className="display-4">YOU DON'T HAVE ANY ITEM ON CART PLEASE GOT TO <Link to='/'>ALL PRODUCTS</Link> </h1>
            </div>
          </div>
        )
      }
    } else {
      return (<Redirect to="/" />)
    }
  }
}

const mapStateToProps = state =>{
  return {username: state.auth.username}
}
export default connect (mapStateToProps)(ProductCart)

