import React, { Component } from 'react';
import '../../src/style.css'
import Problem from './Problem';

const style = {
    borderWidth:'1',
    borderStyle: 'solid',
    borderColor:'black',
		height:'500px',
	  "overflow-y": 'scroll',
    width:'700px',
    backgroundColor:''  ,
}

class Section extends Component {
    constructor(props){
        super(props);
        this.state = {
					quesCountUpperCap: props.quesCountUpperCap,
					operator:props.operator
				}
		}

	onStartQuiz = () => {

		const { problemList, onSubmitAnswer, sectionIdx } = this.props
		const { quesCountUpperCap ,operator} = this.state
		this.props.updateSectionStatus({ sectionIdx, isSessionActive: true, quesCountUpperCap ,operator })
		let quesIdx = 0;
		let isLastQues = quesIdx+1 === quesCountUpperCap 
		this.props.onSubmitAnswer({sectionIdx, quesIdx , submittedAnswer:"", answerStatus:"", isLastQues ,operator})
	}

		renderProblems = () => {
			const { problemList, onSubmitAnswer, sectionIdx, quesCountUpperCap, hasQuizCompleted,currentScore,operator } = this.props

			return <React.Fragment>
					{
						problemList.map((problem, idx) =>
						{
						return <Problem
							hasQuizCompleted={hasQuizCompleted}
							sectionIdx={sectionIdx}
							quesIdx={idx}
							ques={problem.ques}
							answer={problem.soln}
							submittedAnswer={problem.submittedAnswer}
							answerStatus={problem.answerStatus}
							quesCountUpperCap={quesCountUpperCap}
							onSubmitAnswer={onSubmitAnswer}
							currentScore = { currentScore }
							/>})
					}
					<br></br>	
					{
						hasQuizCompleted && 
						<button type="button" class="btn btn-primary">
							Final Score <span class="badge badge-light">{currentScore[sectionIdx]}</span>
						</button>
					}
					
				</React.Fragment>		
		}

    render() { 
			const { sectionIdx, problemList, onSubmitAnswer, hasQuizStarted } = this.props
			console.log(problemList, 'problemList')
			//questionBlock is object that containes question ,answer, status
			
			return ( <div style = {style}>
				<h2> Quiz Room : {sectionIdx+1}</h2>
				<br></br>
				{this.renderQuizSection()}				
			</div>);
		}
		
		renderQuizSection = () => {
			const { hasQuizStarted } = this.props
			if (!hasQuizStarted) {
				return this.renderPreQuizArtifacts()
			}
			return this.renderProblems()  
		}

	 onUpdateQuesCountUpperCap = e => {	
		 this.setState({
			 quesCountUpperCap: e.target.value
		 })
		}		 
	onUpdateOperator = e =>{
		this.setState({
			operator:e.target.value
		})
	}

	 
		renderPreQuizArtifacts = () => {
			const { quesCountUpperCap,operator } = this.state
			return (
				<React.Fragment>
					<div> <button onClick={this.onStartQuiz} 	className={"btn btn-primary"}> Start quiz </button> </div>
					<div style={{ display: "flex", flexDirection: "column","padding": "20px 20px"}}>
						<div style = {{display:'inline-flex',padding:"10px 10px"}}>
							<label> How many Questions do you want to solve:  </label>
							<input
								style={{ width: '70px', "margin-left": "10px" }}
							type="text"
								value={quesCountUpperCap}
								onChange={this.onUpdateQuesCountUpperCap}
								className="form-control"
								id="usr" />
								<br></br>
							</div>
						<div style = {{display:'inline-flex',padding:"5px 5px"}}>				
							<label> which operator you want to practice + , - , / , * ?:  </label>
							<input
								style={{ width: '70px', "margin-left": "10px" }}
							type="text"
								value={operator}
								onChange={this.onUpdateOperator}
								className="form-control"
								id="usr" />
						</div>
					</div>
					<br></br>
				</React.Fragment>	
			)
		}
}
 
export default Section;