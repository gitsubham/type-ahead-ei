
import { ADD_NEW_PROLEM, INIT_PROBLEMS, UPDATE_ACTIVE_SECTION, UPDATE_SOLN_STATUS, UPDATE_SECTION_STATUS } from "../actions/actionTypes"
import { OPERATOR_SYMBOLS, ANSWER_STATUS, QUES_COUNT_UPPER_CAP_IN_QUIZ, RANDOM } from "../constants"

const formQues = (operands, operator) => {
    // TODO(sunil) Change it to reduce method
    let ques = operands[0] + operator + operands[1]
    return ques
}

const findSoln = (operands, operator) => {
    let soln
    switch (operator) {
        case OPERATOR_SYMBOLS.ADD:
            soln = operands.reduce((acc, currOperand) => acc + currOperand, 0)
            break;

        case OPERATOR_SYMBOLS.MULTIPLY:
            soln = operands.reduce((acc, currOperand) => acc * currOperand, 1)
            break;

        case OPERATOR_SYMBOLS.SUBTRACT:
            let initialValue = operands.shift();
            soln = operands.reduce((acc, currOperand) => acc - currOperand, initialValue)
            break;

        case OPERATOR_SYMBOLS.DIVIDE:
            let initialV = operands.shift();
            soln = Math.floor(operands.reduce((acc, currOperand) => acc / currOperand, initialV));
            break;
        default:
            break;
    }
    return soln
}

const formProblem = (operands, operator) => {

    if (operator == RANDOM)
        operator = getRandomOperator()

    return {
        operands,
        operator,
        ques: formQues(operands, operator),
        soln: findSoln(operands, operator),
        submittedAnswer: '',
        answerStatus: ANSWER_STATUS.NOT_ANSWERED,

    }
}

const createRandomOperands = () => {
    // TODO(sunil): Write implementation
    let min = 1;
    let max = 10;
    let num1 = Math.floor(Math.random() * (+max - +min) + +min);
    let num2 = Math.floor(Math.random() * (+max - +min) + +min);
    return [num1, num2]
}

const getRandomOperator = () => {
    // TODO(sunil): Write implementation
    let min = 1;
    let max = 5;
    let num = Math.floor(Math.random() * (+max - +min) + +min);
    let operator = '';
    switch (num) {
        case 1: operator = '+';
            break;
        case 2: operator = '-';
            break;
        case 3: operator = '/';
            break;
        case 4: operator = '*';
            break;
    }
    return operator;

}

const getBaseProblem = () => formProblem([8, 9], OPERATOR_SYMBOLS.ADD)

const problem = (state = {}, action) => {
    const { sectionIdx, operator, type, quesIdx, submittedAnswer, answerStatus, isSessionActive, quesCountUpperCap, isLastQues } = action

    const modifiedState = Object.assign([], state)
    switch (type) {
        case INIT_PROBLEMS:
            return {
                sections: [[], []],
                activeSections: [false, false],
                hasQuizCompleted: [false, false],
                secWiseQCountCap: [QUES_COUNT_UPPER_CAP_IN_QUIZ, QUES_COUNT_UPPER_CAP_IN_QUIZ],
                currentScore: [0, 0],
                operator: [RANDOM, RANDOM]

            }
        case ADD_NEW_PROLEM:
            // TODO(sunil): Refactor this block

            let ope = modifiedState.operator[sectionIdx];
            const newProblem = formProblem(createRandomOperands(), ope)

            if (modifiedState.sections[sectionIdx]) {
                modifiedState.sections[sectionIdx].push(newProblem)
            }
            return { ...modifiedState, sections: modifiedState.sections }
        case UPDATE_ACTIVE_SECTION:
            return {
                ...state,
                activeSectionIdx: sectionIdx,
            }
        case UPDATE_SOLN_STATUS:
            if (modifiedState.sections[sectionIdx]) {
                const section = modifiedState.sections[sectionIdx]
                if (section[quesIdx]) {// ??
                    section[quesIdx].answerStatus = answerStatus
                    section[quesIdx].submittedAnswer = submittedAnswer

                    if (section[quesIdx].answerStatus == 1)
                        modifiedState.currentScore[sectionIdx] += 1
                }
            }

            return modifiedState
        case UPDATE_SECTION_STATUS:
            if (isSessionActive) {
                modifiedState.activeSections[sectionIdx] = isSessionActive
            }
            if (quesCountUpperCap) {
                modifiedState.secWiseQCountCap[sectionIdx] = quesCountUpperCap
            }
            if (isLastQues) {
                modifiedState.hasQuizCompleted[sectionIdx] = isLastQues
            }
            if (operator) {
                modifiedState.operator[sectionIdx] = operator
            }
            return modifiedState
        default:
            return state
    }
}

export default problem;