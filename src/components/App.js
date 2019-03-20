import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'

import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ManageProduct from './ManageProduct'
import DetailProduct from './DetailProduct'
import {keepLogin} from '../actions'
import ProductCart from './ProductCart';

const cookie = new cookies()

class App extends Component {
    //life cycle hook/method

    componentDidMount(){
        // akan dijalankan sekali ketika component perta mkali di render
        var userCookie = cookie.get('masihLogin')
        // jika didapatkan username di file cookie, akan memanggil function keepLogin
        if(userCookie !== undefined){
            // function keepLogin akan me-loginkan ulang username yg tersimpan pada file cookie
            this.props.keepLogin(userCookie)
        }
    }

    render(){
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/manageproduct" component={ManageProduct} />
                    <Route path="/detailproduct/:id_product" component={DetailProduct} />
                    <Route path="/productcart" component={ProductCart} />
                </div>
            </BrowserRouter>
        )
    }
}

export default connect (null,{keepLogin})(App)