import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import axios from "axios";

import QuestionPlayer from './questionplayer'

class Quiz extends React.Component {
	constructor(props){

		super(props);
		this.state={
			topic:"Select Topic",
			questions: [],
			currentQuestion:0,
			switch:0,
			topicChanged:0,
			toggleQuiz:false,
			isSubmitted:false,
		}
		this.handleSelect=this.handleSelect.bind(this);
		this.nextQuestion=this.nextQuestion.bind(this);
		this.prevQuestion=this.prevQuestion.bind(this);
		this.lastQuestion=this.lastQuestion.bind(this);
		this.firstQuestion=this.firstQuestion.bind(this);
		this.gotoQuiz=this.gotoQuiz.bind(this);
		this.review=this.review.bind(this);
		this.submit=this.submit.bind(this);
	}



	handleSelect(index){
		let arr=["Javascript","Asp.Net","C Sharp","Design Patterns"];
		this.setState({topic: arr[index]})
		this.setState({currentQuestion:0})
		this.setState({topicChanged:this.state.topicChanged+1})
		this.setState({isSubmitted:false})
		this.getQuestions(arr[index].toLowerCase().replace(/\s/g, ''));
	}

	getQuestions(topic){
		let url="http://localhost:3001/" + topic ; 
		axios.get(url).then((res)=>{
			this.setState({questions:res.data[0].questions});
		}).catch((error)=>{
//on error
});
	}

	firstQuestion(){
		let questionIndex=0;
		this.setState({currentQuestion: questionIndex});
	}

	nextQuestion(){
		const arr= this.state.questions;
		let questionIndex=this.state.currentQuestion +1;
		this.setState({currentQuestion: questionIndex});
	}

	prevQuestion(){
		const arr= this.state.questions;
		let questionIndex=this.state.currentQuestion -1;
		this.setState({currentQuestion: questionIndex});
	}

	lastQuestion(){
		let questionIndex=this.state.questions.length;
		this.setState({currentQuestion: questionIndex-1});	
	}

	review(){
		this.setState({toggleQuiz:true});
		this.setState({switch:1});
	}

	gotoQuiz(){
		if(this.state.isSubmitted){
			this.setState({topic:"Select Topic"})
			window.location.reload();
			this.setState({toggleQuiz:false})
		}else{
			this.setState({toggleQuiz:false})
		}
	}

	submit(){
		this.setState({isSubmitted:true})
		this.setState({toggleQuiz:true});
		this.setState({switch:2})
	}

	render() {
		if(this.state.questions.length>0){
			const question=this.state.questions[this.state.currentQuestion]
		}
		return(
			<div>
			<Container>
			<Row className="mt-3">
			<Col md={6}>
			<h3>Quiz Application</h3>
			</Col>
			<Col md={6}>
			<h3>Select Quiz:</h3>
			<DropdownButton id="dropdown-basic-button" title={this.state.topic} onSelect={this.handleSelect}>
			<Dropdown.Item eventKey="0">Javascript</Dropdown.Item>
			<Dropdown.Item eventKey="1">Asp.Net</Dropdown.Item>
			<Dropdown.Item eventKey="2">C Sharp</Dropdown.Item>
			<Dropdown.Item eventKey="3">Design Patterns</Dropdown.Item>
			</DropdownButton>
			</Col>
			<div className="text-centre mx-auto mt-4">{this.state.topic=="Select Topic" ? ( <div></div>) : (<h2>{this.state.topic}</h2>)}</div>
			</Row>
			<div className="bg-primary"><hr/></div>
			<Row>
			{!this.state.toggleQuiz && this.state.topic!="Select Topic" ? (<h2><Badge className="text-left" variant="secondary">Question {this.state.currentQuestion +1} of {this.state.questions.length}</Badge></h2>):(<span/>)}
			</Row>
			<Row>{this.state.questions.length>0 ? ( <QuestionPlayer toggle={this.state.toggleQuiz} value = {this.state.questions[this.state.currentQuestion].name} quesno={this.state.currentQuestion+1} opt={this.state.questions[this.state.currentQuestion].options} menu={this.state.switch} len={this.state.questions.length} quesArray={this.state.questions} status={this.state.isSubmitted} topicChange={this.state.topicChanged} />) : (<div>Please Select Topic</div>)}</Row>
				{this.state.topic=="Select Topic" || this.state.toggleQuiz ? (
					<span></span>
					):(<Row>
					<ButtonToolbar className="mx-auto mt-5">
					<Button as="input" className="m-2" type="button" onClick={this.firstQuestion} value="First"/>
					<Button as="input" className="m-2" disabled={this.state.questions.length>0 && this.state.currentQuestion==0} type="button" onClick={this.prevQuestion} value="Prev" />
					<Button as="input" className="m-2" disabled={this.state.questions.length>0 && this.state.questions.length==this.state.currentQuestion+1}  type="button" onClick={this.nextQuestion} value="Next" />
					<Button as="input" className="m-2" type="button" onClick={this.lastQuestion} value="Last" />
					</ButtonToolbar>
					</Row>)
				}
				{this.state.topic!="Select Topic" ? (
					<Row>
					<ButtonToolbar>
					<Button as="input" className="m-2" type="button" onClick={this.gotoQuiz} value="Quiz"/>
					<Button as="input" className="m-2" type="button" onClick={this.review} value="Review" />
					<Button as="input" className="m-2" type="button" onClick={this.submit} value="Submit" />
					</ButtonToolbar>
					</Row>):(<span></span>)}
					</Container>
					</div>
					)
				}
			}

			export default Quiz