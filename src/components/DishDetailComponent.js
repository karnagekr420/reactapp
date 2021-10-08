import React,{Component} from 'react'; 
import {Card,CardImg,CardBody,CardTitle,CardText,Breadcrumb,BreadcrumbItem,Button,Modal,ModalHeader,ModalBody,Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control,Errors,LocalForm} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform,Fade,Stagger} from 'react-animation-components';
const minLength=(len)=>(val)=>val&&val.length>=len;
const maxLength=(len)=>(val)=>!val||val.length<=len;
class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOn:false
        }
        this.toggleModal=this.toggleModal.bind(this);
    }
    handleSubmit(val){
        this.toggleModal();
        this.props.addComment(this.props.dishId,val.rating,val.author,val.comment);

    }
    toggleModal(){
        this.setState({
            isModalOn:!this.state.isModalOn
        });
    }
    render(){
        return(
        <React.Fragment>
            <Modal isOpen={this.state.isModalOn} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                    <div className="form-group">
                        <Label htmlFor="rating">Rating</Label> 
                        <Control.select model=".rating" id="rating" name="rating" className="form-control">
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                    </div>
                    <div className="form-group">
                        <Label htmlFor="author">Your Name</Label>
                        <Control.text model=".author" id="author" name="author" className="form-control"
                        validators={{
                            minLength:minLength(3),maxLength:maxLength(15)
                        }}/>
                        <Errors className="text-danger" model=".author" show="touched"
                        messages={{
                            minLength:'Must be more than 2 characters',
                            maxLength:'Must be 15 characters or less'
                        }}/>
                    </div>
                    <div className="form-group">
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows="6"/>
                    </div>
                    <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
        </React.Fragment>);
    }
}
    function RenderDish({dish}){
        return(
                <div className="col-12 col-md-5 m-1">
                    <FadeTransform in 
                    transformProps={{
                    exitTransform:'scale(0.5) translateY(-50%)'
                    }}>
                        <Card>
                            <CardImg src={baseUrl+ dish.image} alt={dish.name}/>
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
            
        );
    }
    function RenderComments({addComment,dishId,com}){
        if(com!=null)
            return(
                <div className="col-12 col-md-5 m-1">
                    <h5>Comments</h5>
                    <ul className="list-unstyled">
                        <Stagger in>
                        {
                            com.map((com)=>{
                                return(
                                    <Fade in>
                                        <li key={com.id}>
                                            <br/>
                                            <h6>{com.comment}</h6>
                                            <p>- {com.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(com.date)))}</p>
                                        </li>
                                    </Fade>
                                );
                            })
                        }
                        </Stagger>
                    </ul>
                    <CommentForm addComment={addComment} dishId={dishId} />
                </div>
            );
        else
            return <div></div>;
    }
    const DishDetail=(props)=>{
        if(props.isLoading){
            return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>);
        }
        else if(props.errMess){
            return(
            <div className="container">
                <div className="row">
                    {props.errMess}
                </div>
            </div>);
        }
        else if(props.dish!=null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/home">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to="/menu">Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {props.dish.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish}/>
                        <RenderComments addComment={props.addComment} dishId={props.dish.id} com={props.comments}/>
                    </div>
                </div>
            );
        }
        else{
            return <div></div>;
        }
           
    }
export default DishDetail;