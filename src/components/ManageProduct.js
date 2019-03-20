import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'



class ManageProduct extends Component {
    // format IDR
  constructor(props) {
    super(props);
    this.formatterIDR = new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      })
      
}

    //========ADD PRODUCT =================//
    onAddProductClick = () =>{
        const pName = this.name.value
        const pDesc = this.desc.value
        const pPrice = parseInt(this.price.value)
        const pSrc = this.pict.value
    
        axios.post('http://localhost:1991/products',{
            name    : pName,
            desc    : pDesc,
            price   : pPrice,
            src     : pSrc 
        }).then(res =>{
            this.getProduct()
            this.name.value = ""
            this.desc.value = ""
            this.price.value = ""
            this.pict.value = ""
        })
    }

    
    //==========DELETE PRODUCT=============/
    onProdDel =(id)=>{
        const delId = id
        
        axios.delete(`http://localhost:1991/products/${delId}`)
        
        .then(res => {
            this.getProduct()
        })     
    }
    
   
    //========EDIT PRODUCT==========
    onEditProd =id=>{
        this.setState({selectedId:id})
    }

    onSaveItem =(id)=>{
        const eName = this.editName.value
        const eDesc = this.editDesc.value
        const ePrice = parseInt(this.editPrice.value)
        const eSrc = this.editImg.value

        axios.put(`http://localhost:1991/products/${id}`,{
            name: eName,
            desc: eDesc,
            price: ePrice,
            src: eSrc
        }).then(res=>{
            this.getProduct()
        })
    }


    state = {
        products: [],
        selectedId:0
    }

    componentDidMount() {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:1991/products')
            .then(res => {
                this.setState({products: res.data,selectedId:0})
            })
    }

    renderList = () => {
        return this.state.products.map(item => {
            if(item.id!== this.state.selectedId){
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.desc}</td>
                        <td>{this.formatterIDR.format(item.price)}</td>
                        <td><img className="list" src={item.src} alt={item.desc}></img></td>
                        <td>
                            <button className="btn btn-primary mr-2" onClick={()=>{this.onEditProd(item.id)}}>Edit</button>
                            <button className="btn btn-danger" onClick={()=>{this.onProdDel(item.id)}}>Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return (//when edit data
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                            <input className="form-control" ref={input => {this.editName = input}} type="text" defaultValue={item.name}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editDesc = input}} type="text" defaultValue={item.desc}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editPrice = input}} type="text" defaultValue={item.price}/>
                        </td>
                        <td>
                            <input className="form-control" ref={input => {this.editImg = input}} type="text" defaultValue={item.src}/>
                        </td>
                        <td>
                            <button onClick={() => {this.onSaveItem(item.id)}} className="btn btn-primary mb-2">Save</button>
                            <button onClick={() => {this.setState({selectedId: 0})}} className="btn btn-danger">Cancel</button>
                        </td>
                    </tr>
                )

            }
        })
    }


    render() {

        if(this.props.username !==""){
            return (
                <div className="container">
                    <h1 className="display-4 text-center">Manage Product</h1>
                    <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                    <h1 className="display-4 text-center">input Product</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                                <th scope="col"><input ref={input => this.pict = input} className="form-control" type="text" /></th>
                                <th scope="col"><button className="btn btn-outline-warning" onClick={this.onAddProductClick} >Add</button></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return(<Redirect to ="/" />)
        }

        
    }
}

const mapStateToProps = state =>{
    return {username: state.auth.username}
}

export default connect(mapStateToProps)(ManageProduct)