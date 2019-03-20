import React, { Component } from 'react';

class Bill extends Component {
    constructor(props) {
        super(props);
        this.formatterIDR = new Intl.NumberFormat('id', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
          })
          
    }

    total = () => {
        // return  this.props.list.reduce((a,b) => a.quantity * a.item.price + b.quantity * b.item.price)
        if (this.props.list !== 0) {
            let total = 0
            for (let elt of this.props.list) {
                let t = elt.qty * elt.price
                total += t
            }
            return total
        }else {
            return 0
        }
    }
    
    renderList = () => {
        return this.props.list.map(item=> {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{this.formatterIDR.format(item.price)}</td>
                    <td>{item.qty}</td>
                    <td>{this.formatterIDR.format(item.price * item.qty)}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">QUANTITY</th>
                            <th scope="col">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
                <table>
                    <tr>
                        <thead><strong>TOTAL :</strong></thead>
                        <td>{this.formatterIDR.format(this.total())}</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Bill;