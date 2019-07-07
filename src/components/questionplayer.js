import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import axios from "axios";


class QuestionPlayer extends React.Component {
	constructor(props){

		super(props);
		this.state={
			question:null,
			answers:Array(this.props.len).fill(7),
			checkedState:null
		}

		this.option = React.createRef();
		this.handleOption=this.handleOption.bind(this);
	}


	componentWillReceiveProps(nextProps) {
		this.setState({"checkedState":null});
		if(this.props.topicChange>1){
    this.setState({answers:Array(this.props.len).fill(7)})
		}
	}

	handleOption(index,event){
		this.setState({checkedState: index});
		this.state.answers[this.props.quesno-1]=index;
	}



	render() {
		let userMessage;
		if (this.props.menu==1) {
			userMessage = (
				<div>
				<Row>
				{this.state.answers.map((ans,index) => {
					return (
						<Col key={index} md={4}>
						{ans===7 ? (<h3><Badge key={index} variant="danger">{index+1}.UnAnswered</Badge></h3>) : (<h3><Badge key={index} variant="success">{index+1}.Answered</Badge></h3>)}
						</Col>
						)
					})} 


					</Row>
					</div>
					)
				}

				if (this.props.menu==2) {
					let ansarr=this.state.answers;
					userMessage = (
					<div>
					<h2 className="text-left">Quiz Result</h2>
					{this.props.quesArray.map((ques,index) => {
						return (
						<Container key={index}>
						<div className="row jumbotron set-jumbo mt-0">
						<Container className="text-left">
						<h5>{index +1}. {ques.name}</h5>
						<Row>
						{ques.options.map((option,i) => {
							return (
							<Col md={6} key={i}> 
							<div className="radio m-1">
							<input type="radio" value={i} checked={this.state.answers[index]==i} disabled={true} name={index} /> {option.name}
							</div>
							</Col>
							);
						})}
						</Row> 
						<div className="m-3">{ansarr[index]>5 ? (<Alert key={index} variant="warning">
						Not attempted
						</Alert>
						):(<span>{ques.options[ansarr[index]].isAnswer? (<Alert key={index} variant="success">
						Your answer is correct
						</Alert>
						):(<Alert key={index} variant="danger">
						Your answer is wrong
						</Alert>)}</span>)}</div>
						</Container>
						</div>
						</Container>
						)
					})} 
					</div>
					)
				}

				if(!this.props.toggle && this.props.isSubmitted){
					userMessage =	(<Container>
					<Row>
					<h4>select your topic</h4>
					</Row>
					</Container>
					)
				}

			

				if(!this.props.toggle && !this.props.isSubmitted){
					userMessage =	(<Container>
					<Row>
					<h4 className="text-left mt-2">{this.props.quesno}. {this.props.value}</h4>
					</Row>
					<Row>
					{this.props.opt.map((option,index) => {
						return (
						<Col key={index} md={6}> 
						<div className="radio text-left m-1">
						<input type="radio" checked={this.state.checkedState === index } onChange={(e)=>this.handleOption(index,e)} value={index} name="radio" />  {option.name}
						</div>
						</Col>

						);
					})} 
					</Row>
					</Container>
					)
				}


				return(
				<div>
				{userMessage}
				</div>
				)
			}
		}

		export default QuestionPlayer