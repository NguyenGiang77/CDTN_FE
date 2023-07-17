import actionTypes from './actionTypes';
import { FormattedMessage } from 'react-intl';
import {
    getAllCodeService, createrNewUserFromReact,
    getAllUsers, deleteUserService, editUserService, getTopDoctorService,
    getAllDoctorService, postInfoDoctors, getAllSpecialty, 
    getAllClinic,createrNewClinicFromReact, getAllClinics,deleteClinicService, editClinicService,
    getAllCategories,  createrNewCategoryFromReact,
    editCategoryService, deleteCategoryService,
    editspecialtyService,deletespecialtyService, getAllSpecialties, createSpecialtyFromReact,
    createrNewInforCategoryFromReact, editInforCategoryService, deleteInforCategoryService, getAllInforCategories, getAllCategory,
    getAllAllcodes, editAllcodeService, deleteAllcodeService, createrNewAllcodeFromReact
} from '../../services/userService';
import {toast} from 'react-toastify'
//LẤY BIẾN GENDER TỪ BE
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

// LẤY BIẾN ROLE TỪ BE
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

// LẤY BIẾN POSITION TỪ BE
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


/// LẤY BIẾN CLINIC
export const fetchClinicStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllClinic();
            if (res && res.errCode === 0) {
                dispatch(fetchClinicSuccess(res.data));
            }
            else {
                dispatch(fetchClinicFail());
            }
        } catch (e) {
            dispatch(fetchClinicFail());
        }
    }
}
export const  fetchClinicSuccess = (clinicData) => ({
    type: actionTypes.FETCH_CLINIC_SUCCESS,
    data: clinicData,
})
export const fetchClinicFail = () => ({
    type: actionTypes.FETCH_CLINIC_FAIL,
})
// LẤY BIẾN CATEG0RY
export const fetchCategoryStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllCategory();
            if (res && res.errCode === 0) {
                dispatch(fetchCategorySuccess(res.data));
            }
            else {
                dispatch(fetchCategoryFail());
            }
        } catch (e) {
            dispatch(fetchCategoryFail());
        }
    }
}
export const  fetchCategorySuccess = (categoryData) => ({
    type: actionTypes.FETCH_CATEGORY_SUCCESS,
    data: categoryData,
})
export const fetchCategoryFail = () => ({
    type: actionTypes.FETCH_CATEGORY_FAIL,
})
// PRICE
export const fetchPriceStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllCodeService('PRICE');
            if (res && res.errCode === 0) {
                dispatch(fetchPriceSuccess(res.data));
            }
            else {
                dispatch(fetchPriceFail());
            }
        } catch (e) {
            dispatch(fetchPriceFail());
        }
    }
}
export const  fetchPriceSuccess = (priceData) => ({
    type: actionTypes.FETCH_PRICE_SUCCESS,
    data: priceData,
})
export const fetchPriceFail = () => ({
    type: actionTypes.FETCH_PRICE_FAIL,
})
// PAYMENT
export const fetchPaymentStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllCodeService('PAYMENT');
            if (res && res.errCode === 0) {
                dispatch(fetchPaymentSuccess(res.data));
            }
            else {
                dispatch(fetchPaymentFail());
            }
        } catch (e) {
            dispatch(fetchPaymentFail());
        }
    }
}
export const  fetchPaymentSuccess = (paymentData) => ({
    type: actionTypes.FETCH_PAYMENT_SUCCESS,
    data: paymentData,
})
export const fetchPaymentFail = () => ({
    type: actionTypes.FETCH_PAYMENT_FAIL,
})
//PROVINCE
export const fetchProvinceStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllCodeService('PROVINCE');
            if (res && res.errCode === 0) {
                dispatch(fetchProvinceSuccess(res.data));
            }
            else {
                dispatch(fetchProvinceFail());
            }
        } catch (e) {
            dispatch(fetchProvinceFail());
        }
    }
}
export const  fetchProvinceSuccess = (provinceData) => ({
    type: actionTypes.FETCH_PROVINCE_SUCCESS,
    data: provinceData,
})
export const fetchProvinceFail = () => ({
    type: actionTypes.FETCH_PROVINCE_FAIL,
})

// TẠO USER CỦA TAB CRUB REDUX
export const createUser = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await createrNewUserFromReact(data);
            if (res && res.errCode === 0) {
            //                 ,
            // 
            // admin-action.
            // admin-action.error-delete-user
            // admin-action.
            // admin-action.
            // admin-action.
            // admin-action.error-post-doctor
                toast.success(<FormattedMessage id="toast.admin-action.success-create-user" />)
                dispatch(createUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-create-user" />)
                dispatch(createUserFail());
            }
        } catch (e) {
            dispatch(createUserFail());
            console.log(e);
        }
    }
}

export const createUserSuccess = () => ({ 
    type: actionTypes.CREATE_USER_SUCCESS

})
export const createUserFail = () => ({ 
    type: actionTypes.CREATE_USER_FAIL
})

// HIỂN KHI TẤT CẢ USER CỦA TAB CRUB REDUX
export const fetchAllUserStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            }
            else {
                dispatch(fetchAllUserFail());
            }
        } catch (e) {
            dispatch(fetchAllUserFail());
            console.log(e);
        }
    }
}
export const  fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data,
})
export const fetchAllUserFail = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL,
})
// XÓA USER CỦA TAB CRUB REDUX
export const deleteUserStart = (userId) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.succeed-delete-user" />)
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-delete-user" />)
                dispatch(deleteUserFail());
            }
        } catch (e) {
            toast.error(<FormattedMessage id="toast.admin-action.error-delete-user" />)
            dispatch(deleteUserFail());
            console.log(e);
        }
    }
}

export const deleteUserSuccess = () => ({ 
    type: actionTypes.DELETE_USER_SUCCESS

})
export const deleteUserFail = () => ({ 
    type: actionTypes.DELETE_USER_FAIL
})

export const editUserStart = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.succeed-update-user" />)
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-update-user" />)
                dispatch(editUserFail());
            }
        } catch (e) {
                toast.error(<FormattedMessage id="toast.admin-action.error-update-user" />)
            dispatch(editUserFail());
            console.log(e);
        }
    }
}

export const editUserSuccess = () => ({ 
    type: actionTypes.EDIT_USER_SUCCESS

})
export const editUserFail = () => ({ 
    type: actionTypes.EDIT_USER_FAIL
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getTopDoctorService('10');
            if (res && res.errCode === 0) {
                dispatch ({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAIL,

                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
            })
        }
    }    
}

export const fetchAllDoctor = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllDoctorService();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataAllDoctor: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAIL,

                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
            })
        }
    }
}
export const fetchPostDoctor = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await postInfoDoctors(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.succeed-post-doctor" />)
                dispatch({
                    
                    type: actionTypes.FETCH_POST_DOCTOR_SUCCESS,
                    // dataAllDoctor: res.data,
                })
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-post-doctor" />)
                dispatch({
                    type: actionTypes.FETCH_POST_DOCTOR_FAIL,

                })
            }
        } catch (e) {
                toast.error(<FormattedMessage id="toast.admin-action.error-post-doctor" />)
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_POST_DOCTOR_FAIL,
            })
        }
    } 
}

export const fetchAllcodeScheduleDate= () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_DATE_SUCCESS,
                    dataDate: res.data,
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_DATE_FAIL,

                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_DATE_FAIL,
            })
        }
    } 
}

// thông tin chi tiết bác sĩ
export const getInforDoctor = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            dispatch({
                type :actionTypes.FETCH_INFOR_DOCTOR_START
            })
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode ===0
            ) 
            {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(getInforDoctorSuccess(data));
            }
            else {
                dispatch(getInforDoctorFail());
            }
        } catch (e) {
            dispatch(getInforDoctorFail());
        }
    }
}
export const  getInforDoctorSuccess = (allData) => ({
    type: actionTypes.FETCH_INFOR_DOCTOR_SUCCESS,
    data: allData,
})
export const  getInforDoctorFail = () => ({
    type: actionTypes.FETCH_INFOR_DOCTOR_PRICE_FAIL,
})
// TẠO USER CỦA TAB CRUB REDUX
export const createClinic = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await createrNewClinicFromReact(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.success-create-clinic" />)
                dispatch(createClinicSuccess());
                dispatch(fetchAllClinicStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-create-clinic" />)
                dispatch(createClinicFail());
            }
        } catch (e) {
            dispatch(createClinicFail());
            console.log(e);
        }
    }
}

export const createClinicSuccess = () => ({ 
    type: actionTypes.CREATE_CLINIC_SUCCESS

})
export const createClinicFail = () => ({ 
    type: actionTypes.CREATE_CLINIC_FAIL
})

// HIỂN KHI TẤT CẢ clinic CỦA TAB CRUB REDUX
export const fetchAllClinicStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllClinics("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllClinicSuccess(res.clinics.reverse()));
            }
            else {
                dispatch(fetchAllClinicFail());
            }
        } catch (e) {
            dispatch(fetchAllClinicFail());
            console.log(e);
        }
    }
}
export const  fetchAllClinicSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    clinics: data,
})
export const fetchAllClinicFail = () => ({
    type: actionTypes.FETCH_ALL_CLINIC_FAIL,
})
// XÓA clinic CỦA TAB CRUB REDUX
export const deleteClinicStart = (clinicId) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await deleteClinicService(clinicId);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.succeed-delete-clinic" />)
                dispatch(deleteClinicSuccess());
                dispatch(fetchAllClinicStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-delete-clinic" />)
                dispatch(deleteClinicFail());
            }
        } catch (e) {
            toast.error(<FormattedMessage id="toast.admin-action.error-delete-clinic" />)
            dispatch(deleteClinicFail());
            console.log(e);
        }
    }
}

export const deleteClinicSuccess = () => ({ 
    type: actionTypes.DELETE_CLINIC_SUCCESS

})
export const deleteClinicFail = () => ({ 
    type: actionTypes.DELETE_CLINIC_FAIL
})

export const editClinicStart = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await editClinicService(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.succeed-update-clinic" />)
                dispatch(editClinicSuccess());
                dispatch(fetchAllClinicStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-update-clinic" />)
                dispatch(editClinicFail());
            }
        } catch (e) {
                toast.error(<FormattedMessage id="toast.admin-action.error-update-clinic" />)
            dispatch(editClinicFail());
            console.log(e);
        }
    }
}

export const editClinicSuccess = () => ({ 
    type: actionTypes.EDIT_CLINIC_SUCCESS

})
export const editClinicFail = () => ({ 
    type: actionTypes.EDIT_CLINIC_FAIL
})

// gói khám sức khỏe
//lấy dữ liệu vị trí


// TẠO GÓI KHÁM
export const createCategory = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await createrNewCategoryFromReact(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.manage-category.success-create" />)
                dispatch(createCategorySuccess());
                dispatch(fetchAllCategoryStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.manage-category.error-create" />)
                dispatch(createCategoryFail());
            }
        } catch (e) {
            dispatch(createCategoryFail());
            console.log(e);
        }
    }
}

export const createCategorySuccess = () => ({ 
    type: actionTypes.CREATE_CATEGORY_SUCCESS

})
export const createCategoryFail = () => ({ 
    type: actionTypes.CREATE_CATEGORY_FAIL
})

// HIỂN KHI TẤT CẢ Category CỦA TAB CRUB REDUX
export const fetchAllCategoryStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllCategories("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllCategorySuccess(res.categories.reverse()));
            }
            else {
                dispatch(fetchAllCategoryFail());
            }
        } catch (e) {
            dispatch(fetchAllCategoryFail());
            console.log(e);
        }
    }
}
export const  fetchAllCategorySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CATEGORY_SUCCESS,
    categories: data,
})
export const fetchAllCategoryFail = () => ({
    type: actionTypes.FETCH_ALL_CATEGORY_FAIL,
})
// XÓA CATEGORY CỦA TAB CRUB REDUX
export const deleteCategoryStart = (categoryId) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await deleteCategoryService(categoryId);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.manage-category.succeed-delete-category" />)
                dispatch(deleteCategorySuccess());
                dispatch(fetchAllCategoryStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.manage-category.error-delete-category" />)
                dispatch(deleteCategoryFail());
            }
        } catch (e) {
            toast.error(<FormattedMessage id="toast.manage-category.error-delete-category" />)
            dispatch(deleteCategoryFail());
            console.log(e);
        }
    }
}

export const deleteCategorySuccess = () => ({ 
    type: actionTypes.DELETE_CATEGORY_SUCCESS

})
export const deleteCategoryFail = () => ({ 
    type: actionTypes.DELETE_CATEGORY_FAIL
})

export const editCategoryStart = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await editCategoryService(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.manage-category.succeed-update-category" />)
                dispatch(editCategorySuccess());
                dispatch(fetchAllCategoryStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.manage-category.error-update-category" />)
                dispatch(editCategoryFail());
            }
        } catch (e) {
                toast.error(<FormattedMessage id="toast.manage-category.error-update-category" />)
            dispatch(editCategoryFail());
            console.log(e);
        }
    }
}

export const editCategorySuccess = () => ({ 
    type: actionTypes.EDIT_CATEGORY_SUCCESS

})
export const editCategoryFail = () => ({ 
    type: actionTypes.EDIT_CATEGORY_FAIL
})

// TẠO CHI TIẾT GÓI KHÁM
export const createInforCategory = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await createrNewInforCategoryFromReact(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.success-create" />)
                dispatch(createInforCategorySuccess());
                dispatch(fetchAllInforCategoryStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-create" />)
                dispatch(createInforCategoryFail());
            }
        } catch (e) {
            dispatch(createInforCategoryFail());
            console.log(e);
        }
    }
}

export const createInforCategorySuccess = () => ({ 
    type: actionTypes.CREATE_INFORCATEGORY_SUCCESS

})
export const createInforCategoryFail = () => ({ 
    type: actionTypes.CREATE_INFORCATEGORY_FAIL
})

export const fetchAllInforCategoryStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllInforCategories("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllInforCategorySuccess(res.inforCategories.reverse()));
            }
            else {
                dispatch(fetchAllInforCategoryFail());
            }
        } catch (e) {
            dispatch(fetchAllInforCategoryFail());
            console.log(e);
        }
    }
}
export const  fetchAllInforCategorySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_INFORCATEGORY_SUCCESS,
    inforCategories: data,
})
export const fetchAllInforCategoryFail = () => ({
    type: actionTypes.FETCH_ALL_INFORCATEGORY_FAIL,
})
// XÓA INFORCATEGORY CỦA TAB CRUB REDUX
export const deleteInforCategoryStart = (inforcatoryId) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await deleteInforCategoryService(inforcatoryId);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.succeed-delete-inforcatory" />)
                dispatch(deleteInforCategorySuccess());
                dispatch(fetchAllInforCategoryStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-delete-inforcatory" />)
                dispatch(deleteInforCategoryFail());
            }
        } catch (e) {
            toast.error(<FormattedMessage id="toast.admin-action.error-delete-inforcatory" />)
            dispatch(deleteInforCategoryFail());
            console.log(e);
        }
    }
}

export const deleteInforCategorySuccess = () => ({ 
    type: actionTypes.DELETE_INFORCATEGORY_SUCCESS

})
export const deleteInforCategoryFail = () => ({ 
    type: actionTypes.DELETE_INFORCATEGORY_FAIL
})

export const editInforCategoryStart = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await editInforCategoryService(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.succeed-update-inforcatory" />)
                dispatch(editInforCategorySuccess());
                dispatch(fetchAllInforCategoryStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-update-inforcatory" />)
                dispatch(editInforCategoryFail());
            }
        } catch (e) {
                toast.error(<FormattedMessage id="toast.admin-action.error-update-inforcatory" />)
            dispatch(editInforCategoryFail());
            console.log(e);
        }
    }
}

export const editInforCategorySuccess = () => ({ 
    type: actionTypes.EDIT_INFORCATEGORY_SUCCESS

})
export const editInforCategoryFail = () => ({ 
    type: actionTypes.EDIT_INFORCATEGORY_FAIL
})


/// phòng khám
export const createSpecialty = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await createSpecialtyFromReact(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.success-create-specialty" />)
                dispatch(createSpecialtySuccess());
                dispatch(fetchAllSpecialtyStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-create-specialty" />)
                dispatch(createSpecialtyFail());
            }
        } catch (e) {
            dispatch(createSpecialtyFail());
            console.log(e);
        }
    }
}

export const createSpecialtySuccess = () => ({ 
    type: actionTypes.CREATE_SPECIALTY_SUCCESS

})
export const createSpecialtyFail = () => ({ 
    type: actionTypes.CREATE_SPECIALTY_FAIL
})

// HIỂN KHI TẤT CẢ Specialty CỦA TAB CRUB REDUX
export const fetchAllSpecialtyStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllSpecialties("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllSpecialtySuccess(res.specialties.reverse()));
            }
            else {
                dispatch(fetchAllSpecialtyFail());
            }
        } catch (e) {
            dispatch(fetchAllSpecialtyFail());
            console.log(e);
        }
    }
}
export const  fetchAllSpecialtySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
    specialties: data,
})
export const fetchAllSpecialtyFail = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_FAIL,
})
// XÓA Specialty CỦA TAB CRUB REDUX
export const deleteSpecialtyStart = (specialtyId) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await deletespecialtyService(specialtyId);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.succeed-delete-specialty" />)
                dispatch(deleteSpecialtySuccess());
                dispatch(fetchAllSpecialtyStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-delete-specialty" />)
                dispatch(deleteSpecialtyFail());
            }
        } catch (e) {
            toast.error(<FormattedMessage id="toast.admin-action.error-delete-specialty" />)
            dispatch(deleteSpecialtyFail());
            console.log(e);
        }
    }
}

export const deleteSpecialtySuccess = () => ({ 
    type: actionTypes.DELETE_SPECIALTY_SUCCESS

})
export const deleteSpecialtyFail = () => ({ 
    type: actionTypes.DELETE_SPECIALTY_FAIL
})

export const editSpecialtyStart = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await editspecialtyService(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.succeed-update-specialty" />)
                dispatch(editSpecialtySuccess());
                dispatch(fetchAllSpecialtyStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-update-specialty" />)
                dispatch(editSpecialtyFail());
            }
        } catch (e) {
                toast.error(<FormattedMessage id="toast.admin-action.error-update-specialty" />)
            dispatch(editSpecialtyFail());
            console.log(e);
        }
    }
}

export const editSpecialtySuccess = () => ({ 
    type: actionTypes.EDIT_SPECIALTY_SUCCESS

})
export const editSpecialtyFail = () => ({ 
    type: actionTypes.EDIT_SPECIALTY_FAIL
})



// TẠO USER CỦA TAB CRUB REDUX
export const createAllcode = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await createrNewAllcodeFromReact(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.success-create-allcode" />)
                dispatch(createAllcodeSuccess());
                dispatch(fetchAllAllcodeStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-create-allcode" />)
                dispatch(createAllcodeFail());
            }
        } catch (e) {
            dispatch(createAllcodeFail());
            console.log(e);
        }
    }
}

export const createAllcodeSuccess = () => ({ 
    type: actionTypes.CREATE_ALLCODE_SUCCESS

})
export const createAllcodeFail = () => ({ 
    type: actionTypes.CREATE_ALLCODE_FAIL
})

// HIỂN KHI TẤT CẢ allcode CỦA TAB CRUB REDUX
export const fetchAllAllcodeStart = () => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await getAllAllcodes("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllAllcodeSuccess(res.allcodes.reverse()));
            }
            else {
                dispatch(fetchAllAllcodeFail());
            }
        } catch (e) {
            dispatch(fetchAllAllcodeFail());
            console.log(e);
        }
    }
}
export const  fetchAllAllcodeSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_ALLCODE_SUCCESS,
    allcodes: data,
})
export const fetchAllAllcodeFail = () => ({
    type: actionTypes.FETCH_ALL_ALLCODE_FAIL,
})
// XÓA allcode CỦA TAB CRUB REDUX
export const deleteAllcodeStart = (allcodeId) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await deleteAllcodeService(allcodeId);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.succeed-delete-allcode" />)
                dispatch(deleteAllcodeSuccess());
                dispatch(fetchAllAllcodeStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-delete-allcode" />)
                dispatch(deleteAllcodeFail());
            }
        } catch (e) {
            toast.error(<FormattedMessage id="toast.admin-action.error-delete-allcode" />)
            dispatch(deleteAllcodeFail());
            console.log(e);
        }
    }
}

export const deleteAllcodeSuccess = () => ({ 
    type: actionTypes.DELETE_ALLCODE_SUCCESS

})
export const deleteAllcodeFail = () => ({ 
    type: actionTypes.DELETE_ALLCODE_FAIL
})

export const editAllcodeStart = (data) => {
    return async (dispatch, getState /*hai tham so cua redux*/) => {
        try {
            let res = await editAllcodeService(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id="toast.admin-action.succeed-update-allcode" />)
                dispatch(editAllcodeSuccess());
                dispatch(fetchAllAllcodeStart());
            }
            else {
                toast.error(<FormattedMessage id="toast.admin-action.error-update-allcode" />)
                dispatch(editAllcodeFail());
            }
        } catch (e) {
                toast.error(<FormattedMessage id="toast.admin-action.error-update-allcode" />)
            dispatch(editAllcodeFail());
            console.log(e);
        }
    }
}

export const editAllcodeSuccess = () => ({ 
    type: actionTypes.EDIT_ALLCODE_SUCCESS

})
export const editAllcodeFail = () => ({ 
    type: actionTypes.EDIT_ALLCODE_FAIL
})