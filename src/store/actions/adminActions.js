import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';

// export const  fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })
export const fetchGenderStart = () => {
    return async (dispatch, getSate /*hai tham so cua redux*/) => {
        try {
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
