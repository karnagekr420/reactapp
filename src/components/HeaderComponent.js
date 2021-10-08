import React, {Component} from 'react';
import {Navbar,NavbarBrand,Nav,NavbarToggler,Collapse,NavItem,Jumbotron,
    Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input} from 'reactstrap';
import {NavLink} from 'react-router-dom';
class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOn:false,
            isNavOn:false
        }
        this.toggleNav=this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    handleLogin(event){
        this.toggleModal();
        alert("Username : "+this.username.value+"\nPassword : "+this.password.value+"\nRemember Me : "+this.remember.checked);
        event.preventDefault();
    }
    toggleModal(){
        this.setState({
            isModalOn:!this.state.isModalOn
        });
    }
    toggleNav(){
        this.setState({
            isNavOn:!this.state.isNavOn
        });
    }
    render(){
        return(
            <React.Fragment>
                <Navbar light expand="md">
                    <div className="container">
                        <NavbarToggler className="ml-1" onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src='assets/images/logo.png' alt="Ristorante Con Fusion" height="30" width="41"/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOn} navbar>
                            <Nav navbar>
                                <NavItem className="ml-2">
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem className="ml-2">
                                    <NavLink className="nav-link" to="/aboutus">
                                       <span className="fa fa-info fa-lg"></span> About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem className="ml-2">
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg"></span> Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem className="ml-2">
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg"></span> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav navbar className="ml-auto">
                                <NavItem className="ml-2">
                                    <Button onClick={this.toggleModal} outline><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante Confusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOn} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>
                        Login
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" innerRef={(input)=>this.username=input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" innerRef={(input)=>this.password=input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="remember" name="remember" innerRef={(input)=>this.remember=input}/>
                                    {' '}Remember Me
                                </Label>
                            </FormGroup>
                            <br/>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}
export default Header;