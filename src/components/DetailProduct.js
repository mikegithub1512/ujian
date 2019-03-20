import React, { Component } from 'react'
import axios from 'axios';


class DetailProduct extends Component {
    state = {
        product : {}
    }
    
        // format IDR
   
    componentDidMount() {
        const idproduct = parseInt(this.props.match.params.id_product)
        axios.get('http://localhost:1991/products/' + idproduct)
            .then(res => {
                this.setState({product: res.data})
            })
    }

    render() {
        const {product} = this.state
        return (
            <div className="card" key={product.id}>
                <div className="card-header">
                    {product.name}
                </div>
                <div className="card-body">
                    <img src={product.src} alt={product.name} />
                    <h3 className="card-title">Product: {product.name}</h3>
                    <p className="card-text">Description: {product.desc}</p>
                    <p className="card-text">Price: Rp.{product.price}</p>
                    <a href="/productcart" className="btn btn-block btn-primary">Add to Cart</a>
                </div>
            </div>
        )
    }
}

export default DetailProduct;