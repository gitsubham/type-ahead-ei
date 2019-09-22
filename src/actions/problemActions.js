import { ADD_NEW_PROLEM, INIT_PROBLEMS, UPDATE_ACTIVE_SECTION, UPDATE_SOLN_STATUS, UPDATE_SECTION_STATUS } from "./actionTypes"

export const addNewProblem = payload => {
    return {
        type: ADD_NEW_PROLEM,
        ...payload
    }
}

export const initProblems = () => {
    return {
        type: INIT_PROBLEMS
    }
}

export const updateActiveSection = payload => {
    return {
        type: UPDATE_ACTIVE_SECTION,
        ...payload
    }
}

export const updateSolnStatus = payload => {
    return {
        type: UPDATE_SOLN_STATUS,
        ...payload
    }
}

export const updateSectionStatus = payload => {
    return {
        type: UPDATE_SECTION_STATUS,
        ...payload
    }
}