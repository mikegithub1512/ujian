import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    //NavLink,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
  

import {onLogoutUser} from '../actions'

class Header extends Component{

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    

    render() {

        const {username} = this.props.user

        if (username === '') {
            
            return (
              //menggunakan reactstrap
              <div>
                <Navbar color="light" light expand="md">
                  <div className="container">
                    <Link className="navbar-brand" to="/">
                      I K A N O
                    </Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                        <NavItem>
                          <Link className="nav-link" to="/">
                            All Product
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link to="/register">
                            <Button
                              className="mx-3"
                              color="primary"
                            >
                              Register
                            </Button>
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link to="/login">
                            <Button color="success">Login</Button>
                          </Link>
                        </NavItem>
                      </Nav>
                    </Collapse>
                  </div>
                </Navbar>
              </div>

              //menggunakan bootstrap biasa
              // <div>
              //     <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
              //         <div className="container">
              //             <Link className="navbar-brand" to="/">TOKOLAPAK</Link>
              //             <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav2">
              //                 <span className="navbar-toggler-icon"></span>
              //             </button>

              //             <div className="collapse navbar-collapse row p-2" id="navbarNav2">
              //                 <form className="input-group col-12 col-md-7 ml-auto">
              //                     <input type="text" className="form-control mr-2" placeholder="Search" />
              //                     <button className="btn btn-outline-success">Search</button>
              //                 </form>
              //                 <ul className="navbar-nav ml-auto col-12 col-md-5">
              //                     <li className="nav-item mt-2">
              //                         <Link className="nav-a" to="/">All Product</Link>
              //                     </li>

              //                     <li className="nav-item m-1">
              //                         <Link className="nav-a" to="/register"><button className="btn btn-primary">Register</button></Link>
              //                     </li>
              //                     <li className="nav-item m-1">
              //                         <Link className="nav-a" to="/login"><button className="btn btn-success">Login</button></Link>
              //                     </li>
              //                 </ul>
              //             </div>
              //         </div>
              //     </nav>
              // </div>
            );
        } else {
            //MENGGUNAKAN REACTSTRAP
            return (
              <div>
                <Navbar color="light" light expand="md">
                  <div className="container">
                    <NavbarBrand href="/">I K A N O</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                        <NavItem>
                          <Link className="nav-link" to="/">
                            All Product
                          </Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            Hallo {username}
                          </DropdownToggle>
                          <DropdownMenu right>
                            <Link
                              className="dropdown-item"
                              to="/manageproduct"
                            >
                              <DropdownItem>
                                Manage Product
                              </DropdownItem>
                            </Link>
                            <Link
                              className="dropdown-item"
                              to="/productcart"
                            >
                              <DropdownItem>Cart</DropdownItem>
                            </Link>

                            <DropdownItem divider />
                            <Button
                              className="dropdown-item"
                              onClick={this.props.onLogoutUser}
                            >
                              Log out
                            </Button>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
                    </Collapse>
                  </div>
                </Navbar>
              </div>
            );

            //menggunakan BOOTSRAP BIASA
            // return (
                
            //     <div>
               
            //     <nav className="navbar sticky-top navbar-expand-md navbar-light bg-light mb-3">
            //         <div className="container">
            //             <Link className="navbar-brand" to="/">TOKOLAPAK</Link>
            //             <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav2">
            //                 <span className="navbar-toggler-icon"></span>
            //             </button>

            //             <div className="collapse navbar-collapse row p-2" id="navbarNav2">
            //                 <form className="input-group col-12 col-md-7 ml-auto">
            //                     <input type="text" className="form-control mr-2" placeholder="Search" />
            //                     <button className="btn btn-outline-success">Search</button>
            //                 </form>
            //                 <ul className="navbar-nav ml-auto col-12 col-md-5">
            //                     <li className="nav-item mt-2">
            //                         <Link className="nav-link" to="/">All Product</Link>
            //                     </li>
            //                     <li className="nav-item dropdown mt-2">
            //                         <Link to="/asd" className="nav-link dropdown-toggle" data-toggle="dropdown">Hallo {username}</Link>
            //                         <div className="dropdown-menu">
            //                             <Link to="/manageproduct" className="dropdown-item">Manage Product</Link>
            //                             <Link to="/" className="dropdown-item">Link 2</Link>
            //                             <button onClick={this.props.onLogoutUser} className="dropdown-item">Logout</button>
            //                         </div>
            //                     </li>
                        
            //                 </ul>
            //             </div>
            //         </div>
            //     </nav>
            // </div>
            // )
        }
    }

}

          
const mapStateToProps = state =>{
    return {user: state.auth}
}

export default connect(mapStateToProps,{onLogoutUser})(Header)