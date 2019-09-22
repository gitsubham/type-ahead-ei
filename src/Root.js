import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { initProblems, addNewProblem, updateActiveSection, updateSolnStatus, updateSectionStatus } from "./actions"
import './App.css';
import Section from './components/section';
import '../src/style.css'
import 'bootstrap/dist/css/bootstrap.css'

class Root extends React.Component {
    componentWillMount() {
        this.props.initProblems()
    }

    isActiveSection = idx => {
        return this.props.activeSections[idx]
    }

    onSubmitAnswer = ({ sectionIdx, quesIdx, submittedAnswer, answerStatus, isLastQues, operator }) => {
        // update whether this answer was correct or not.
        this.props.updateSolnStatus({ sectionIdx, quesIdx, submittedAnswer, answerStatus })

        if (!isLastQues) {
            // form new problem
            this.props.addNewProblem({ sectionIdx, operator })
        } else {
            this.props.updateSectionStatus({ sectionIdx, isLastQues })
        }
    }

    render() {
        const { onSubmitAnswer, isActiveSection } = this
        const { sections, updateSectionStatus, secWiseQCountCap, hasQuizCompleted, currentScore, operator } = this.props
        if (!sections) return null
        return (
            <div className="App">
                <h1>Quiz</h1>
                <div className='flex-container' style={{ marginTop: '0px' }}>
                    <div className='quizBox flex-container'>
                        {sections.map((section, idx) => {

                            return <Section

                                sectionIdx={idx}
                                problemList={section}
                                quesCountUpperCap={secWiseQCountCap[idx]}
                                operator={operator[idx]}
                                onSubmitAnswer={onSubmitAnswer}
                                hasQuizStarted={isActiveSection(idx)}
                                hasQuizCompleted={hasQuizCompleted[idx]}
                                updateSectionStatus={updateSectionStatus}
                                currentScore={currentScore}
                            />
                        }
                        )}
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        problem: getState(state, 'problem'),
        sections: getState(state, 'problem.sections'),
        activeSections: getState(state, 'problem.activeSections'),
        secWiseQCountCap: getState(state, 'problem.secWiseQCountCap'),
        hasQuizCompleted: getState(state, 'problem.hasQuizCompleted'),
        currentScore: getState(state, 'problem.currentScore'),
        operator: getState(state, 'problem.operator'),
        // TODO(Subham): Removal candidate - activeSectionIdx
        activeSectionIdx: getState(state, 'problem.activeSectionIdx')
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initProblems: () => dispatch(initProblems()),
        addNewProblem: ({ sectionIdx, operator }) => dispatch(addNewProblem({ sectionIdx, operator })),
        updateActiveSection: ({ sectionIdx }) => dispatch(updateActiveSection({ sectionIdx })),
        updateSolnStatus: ({ sectionIdx, quesIdx, submittedAnswer, answerStatus }) => dispatch(updateSolnStatus({ sectionIdx, quesIdx, submittedAnswer, answerStatus })),
        updateSectionStatus: ({ sectionIdx, isSessionActive, isLastQues, quesCountUpperCap, operator }) => dispatch(updateSectionStatus({ sectionIdx, isSessionActive, isLastQues, quesCountUpperCap, operator }))
    }
}

const getState = (state, path) => {
    console.log(state);
    return get(state, path)
}
export default connect(mapStateToProps, mapDispatchToProps)(Root)

