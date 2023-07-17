import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctor: [],
    allDoctor: [],
    allScheduleDate: [],
    allData: [],
    allcodes: [],
    specialties: [],
    inforCategories: [],
    clinics: [],
    categories: [],
    provinces: [],
    payments: [],
    prices: [],

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGender = false;
            state.genders = [];
            
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_PRICE_SUCCESS:
            state.prices = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_PRICE_FAIL:
            state.prices = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_PAYMENT_SUCCESS:
            state.payments = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_PAYMENT_FAIL:
            state.payments = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_PROVINCE_SUCCESS:
            state.provinces = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_PROVINCE_FAIL:
            state.provinces = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_CLINIC_SUCCESS:
            state.clinics = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_CLINIC_FAIL:
            state.clinics = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_CATEGORY_SUCCESS:
            state.categories = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_CATEGORY_FAIL:
            state.categories = [];
            return {
                ...state,
            }                        
                            
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAIL:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.dataDoctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            state.topDoctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctor = action.dataAllDoctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            state.allDoctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_DATE_SUCCESS:
            state.allScheduleDate = action.dataDate;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_DATE_FAIL:
            state.allScheduleDate = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_INFOR_DOCTOR_SUCCESS:
            state.allData = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_INFOR_DOCTOR_PRICE_FAIL:
            state.allData = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            state.clinics = action.clinics;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CLINIC_FAIL:
            state.clinics = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            state.specialties = action.specialties;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SPECIALTY_FAIL:
            state.specialties = [];
            return {
                ...state,
            }      
        case actionTypes.FETCH_ALL_CATEGORY_SUCCESS:
            state.categories = action.categories;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CATEGORY_FAIL:
            state.categories = [];
            return {
                ...state,
            }  
        case actionTypes.FETCH_ALL_INFORCATEGORY_SUCCESS:
            state.inforCategories = action.inforCategories;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_INFORCATEGORY_FAIL:
            state.inforCategories = [];
            return {
                ...state,
            }        
        case actionTypes.FETCH_ALL_ALLCODE_SUCCESS:
            state.allcodes = action.allcodes;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_ALLCODE_FAIL:
            state.allcodes = [];
            return {
                ...state,
            }    
        default:
            return state;
    }
}

export default adminReducer;