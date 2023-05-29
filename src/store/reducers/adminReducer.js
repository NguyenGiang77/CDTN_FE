import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('start',action)
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copySate = { ...state };
            copySate.genders = action.data;
            console.log('genders', copySate);
            return {
                ...copySate,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            console.log('fail',action)
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;