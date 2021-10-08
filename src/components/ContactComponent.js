import React,{Component} from 'react';
import {Breadcrumb,BreadcrumbItem,Row,Label,Col,Button} from 'reactstrap';
import {Control,Errors,Form} from 'react-redux-form';
import { Link } from 'react-router-dom';
const required=(val)=>val&&val.length;
const maxLength=(len)=>(val)=>!val||val.length<=len;
const minLength=(len)=>(val)=>val&&val.length>=len;
const isNumber=(val)=>!isNaN(Number(val));
const validEmail=(val)=>/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
class Contact extends Component{
    constructor(props){
        super(props);
        this.state={
            show:false
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleShow=this.handleShow.bind(this);
    }
    handleShow(values){
        console.log(values.firstname);
        if(values.firstname.length>0)
        this.setState({
            show:true
        })
        else
        this.setState({
            show:false
        })
    }
    handleSubmit(values){
        this.props.postFeedback(values);
        this.props.resetFeedbackForm();
        
    }
    render()
    {   
        return(
            <div className="container">
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Contact Us</h3>
                            <hr/>                
                        </div>
                    </div>
                    
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" href="skype.com" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us Feedback</h3><hr/>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values)=>this.handleSubmit(values)} 
                              onChange={(values)=>this.handleShow(values)}  >
                            <Row className="form-group">
                                <Label md={2} htmlFor="firstname">First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" 
                                     className="form-control"
                                     id="firstname" 
                                     name="firstname"  
                                     placeholder="First Name"
                                     validators={{
                                         required,maxLength:maxLength(15),minLength:minLength(3)
                                     }}
                                     />
                                     <Errors className="text-danger" model=".firstname" show='touched'
                                     messages={{
                                         required:'Required   ',
                                         minLength:'Must be more than 2 characters   ',
                                         maxLength:'Must be less than 16 characters   '
                                     }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="lastname">Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname"
                                    className="form-control"
                                     id="lastname" 
                                     name="lastname" 
                                     placeholder="Last Name"
                                     validators={{
                                        required,maxLength:maxLength(15),minLength:minLength(3)
                                    }}
                                    />
                                    <Errors className="text-danger" model=".lastname" show="touched"
                                    messages={{
                                        required:'Required   ',
                                        minLength:'Must be more than 2 characters   ',
                                        maxLength:'Must be less than 16 characters   '
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="telnum">Tel. No.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum"
                                    className="form-control"
                                    id="telnum" 
                                    name="telnum" 
                                    placeholder="Tel. No."
                                    validators={{
                                        required,maxLength:maxLength(12),minLength:minLength(3),isNumber
                                    }}
                                    />
                                    <Errors className="text-danger" model=".telnum" show="touched"
                                    messages={{
                                        required:'Required   ',
                                        minLength:'Must be more than 2 characters   ',
                                        maxLength:'Must be less than 13 characters   ',
                                        isNumber:'Must be a number   '
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="email">Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" 
                                    className="form-control"
                                     id="email" 
                                     name="email" 
                                     placeholder="Email"
                                     validators={{
                                        required,validEmail
                                    }}
                                    />
                                    <Errors className="text-danger" model=".email" show="touched"
                                    messages={{
                                        required:'Required   ',
                                        validEmail:'Invalid E-mail   '
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:6,offset:2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree"
                                            className="form-check-input"
                                            id="agree" 
                                            name="agree" />{' '}
                                            <strong>May we Contact You?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size:3,offset:1}}>
                                    <Control.select model=".contactType" className="form-control" name="contactType">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="message">Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message"
                                    className="form-control"
                                    name="message" 
                                    id="message" 
                                    rows="12"  />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10,offset:2}}>
                                    <Button disabled={!this.state.show} type="submit" color="primary">Send FeedBack!</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;