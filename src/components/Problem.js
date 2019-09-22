import React, { Component } from 'react';

import '../../src/style.css'
import { ANSWER_STATUS } from "../constants"

class Problem extends Component {
	constructor(props) {
			super(props);
			this.state = {
				submittedAnswer: props.submittedAnswer,
			}
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.submittedAnswer != nextProps.submittedAnswer) {
			this.setState({
				submittedAnswer: nextProps.submittedAnswer
			})
		}
	}
	onSubmitAnswer = () => {
		const { answer, sectionIdx, quesIdx } = this.props
		const { submittedAnswer } = this.state
		const { INCORRECTLY_ANSWERED, CORRECTLY_ANSWERED} = ANSWER_STATUS
		const answerStatus = answer === parseInt(submittedAnswer) ? CORRECTLY_ANSWERED : INCORRECTLY_ANSWERED
		
		this.props.onSubmitAnswer({ sectionIdx, quesIdx, submittedAnswer, answerStatus, isLastQues: this.isLastQues() })
	}

	updateAnswer = e => {
		this.setState({
			submittedAnswer: e.target.value
		})
	}

	isLastQues = () => {
		const { quesCountUpperCap, quesIdx } = this.props
		return quesIdx + 1 == quesCountUpperCap
	}
	
	getBtnText = () => {
		const { quesCountUpperCap, quesIdx } = this.props
		return (this.isLastQues() ? "Complete Quiz" : "Next")
	}

	render() {
		const { sectionIdx,ques, onSubmitAnswer, answerStatus, quesIdx, answer, quesCountUpperCap, hasQuizCompleted,currentScore } = this.props
		const { submittedAnswer } = this.state 
		console.log(this.props, ANSWER_STATUS, answerStatus, 'problem component')
		//questionBlock is object that containes question ,answer, status

		if (hasQuizCompleted) {
			return (
			<React.Fragment>
				<div className={ANSWER_STATUS.CORRECTLY_ANSWERED === answerStatus ? "success": "error"}>
					<label style={{ "margin-left": "8px" }}> Ques {quesIdx + 1}/{quesCountUpperCap} : {ques} </label>
					<label style={{ "margin-left": "8px" }}> || Correct ans -> {answer} </label>
					<label style={{ "margin-left": "8px" }}> || Submitted ans -> {submittedAnswer} </label>
			  </div>
			</React.Fragment>)
		}

		if (answerStatus !== ANSWER_STATUS.NOT_ANSWERED && !hasQuizCompleted) return null
		
			return (
				<div class="form-group">
					<div className='flex-container' style={{ flexDirection: "column" }}>
						<label for="usr"> Ques {quesIdx + 1} / {quesCountUpperCap} : {ques} </label>
						<input
								style={{ width: '200px' }}
								type="text"
								value={submittedAnswer}
								onChange={this.updateAnswer}
								className="form-control"
								id="usr" />
						<br></br>
						<button type="submit" className="btn btn-primary" onClick={this.onSubmitAnswer}> {this.getBtnText()}</button>
						<br></br>
						<button type="button" class="btn btn-primary">
							Score <span class="badge badge-light">{currentScore[sectionIdx]}</span>
						</button>
						
					</div>

				</div>)
	}
}


export default Problem;