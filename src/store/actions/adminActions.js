import actionTypes from './actionTypes';
import { getAllCodeService, createrNewUserFromReact } from '../../services/userService';

// export const  fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            dispatch({
                type :actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
        }
    }
}
export const  fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})
export const  fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL,
})

export const fetchRoleStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFail());
            }
        } catch (e) {
            dispatch(fetchRoleFail());
        }
    }
}

export const  fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})
export const  fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL,
})

export const fetchPositionStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else {
                dispatch(fetchPositionFail());
            }
        } catch (e) {
            dispatch(fetchPositionFail());
        }
    }
}
export const  fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL,
})
export const createUser = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await createrNewUserFromReact(data);
            console.log('check create',res);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess());
            }
            else {
                dispatch(createUserFail());
            }
        } catch (e) {
            dispatch(createUserFail());
            console.log(e);
        }
    }
}

export const createUserSuccess = () => ({ 
    type: 'CREATE_USER_SUCCESS'

})
export const createUserFail = () => ({ 
    type: 'CREATE_USER_FAIL'
})
