const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',


    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //ADMIN
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIL: 'FETCH_GENDER_FAIL',
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAIL: 'FETCH_ROLE_FAIL',

    FETCH_CLINIC_SUCCESS: 'FETCH_CLINIC_SUCCESS',
    FETCH_CLINIC_FAIL: 'FETCH_CLINIC_FAIL',
    FETCH_CATEGORY_SUCCESS: 'FETCH_CATEGORY_SUCCESS',
    FETCH_CATEGORY_FAIL: 'FETCH_CATEGORY_FAIL',
    FETCH_PAYMENT_SUCCESS: 'FETCH_PAYMENT_SUCCESS',
    FETCH_PAYMENT_FAIL: 'FETCH_PAYMENT_FAIL',
    FETCH_PROVINCE_SUCCESS: 'FETCH_PROVINCE_SUCCESS',
    FETCH_PROVINCE_FAIL: 'FETCH_PROVINCE_FAIL',
    FETCH_PRICE_SUCCESS: 'FETCH_PRICE_SUCCESS',
    FETCH_PRICE_FAIL: 'FETCH_PRICE_FAIL',
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAIL: 'FETCH_POSITION_FAIL',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAIL: 'CREATE_USER_FAIL',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAIL: 'EDIT_USER_FAIL',
    
    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAIL: 'FETCH_ALL_USER_FAIL',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAIL: 'DELETE_USER_FAIL',
   //lấy ra top bác sĩ nổi bật
    FETCH_TOP_DOCTOR_SUCCESS: 'FETCH_TOP_DOCTOR_SUCCESS',
    FETCH_TOP_DOCTOR_FAIL: 'FETCH_TOP_DOCTOR_FAIL',
 // lấy ra dữ liệu tất cả các bác sĩ
    FETCH_ALL_DOCTOR_SUCCESS: 'FETCH_ALL_DOCTOR_SUCCESS',
    FETCH_ALL_DOCTOR_FAIL: 'FETCH_ALL_DOCTOR_FAIL',
    // post thông tin chi tiết bác si
    FETCH_POST_DOCTOR_SUCCESS: 'FETCH_POST_DOCTOR_SUCCESS',
    FETCH_POST_DOCTOR_FAIL: 'FETCH_POST_DOCTOR_FAIL',

    FETCH_ALLCODE_SCHEDULE_DATE_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_DATE_SUCCESS',
    FETCH_ALLCODE_SCHEDULE_DATE_FAIL: 'FETCH_ALLCODE_SCHEDULE_DATE_FAIL',

    // khai báo thông tin chi tiết bác sĩ
    FETCH_INFOR_DOCTOR_START: 'FETCH_INFOR_DOCTOR_START',
    FETCH_INFOR_DOCTOR_SUCCESS: 'FETCH_INFOR_DOCTOR_SUCCESS',
    FETCH_ALL_INFORDOCTOR_SUCCESS: 'FETCH_ALL_INFORDOCTOR_SUCCESS',
    FETCH_ALL_INFORDOCTOR_FAIL: 'FETCH_ALL_INFORDOCTOR_FAIL',
    FETCH_INFOR_DOCTOR_PRICE_FAIL: 'FETCH_INFOR_DOCTOR_PRICE_FAIL',

    //PHÒNG KHÁM
    EDIT_CLINIC_FAIL: 'EDIT_CLINIC_FAIL',
    EDIT_CLINIC_SUCCESS: 'EDIT_CLINIC_SUCCESS',
    DELETE_CLINIC_FAIL: 'DELETE_CLINIC_FAIL',
    DELETE_CLINIC_SUCCESS:'DELETE_CLINIC_SUCCESS',
    FETCH_ALL_CLINIC_FAIL:'FETCH_ALL_CLINIC_FAIL',
    FETCH_ALL_CLINIC_SUCCESS:'FETCH_ALL_CLINIC_SUCCESS',
    CREATE_CLINIC_FAIL:'CREATE_CLINIC_FAIL',
    CREATE_CLINIC_SUCCESS:'CREATE_CLINIC_SUCCESS',

    // CHUYÊN KHOA
    EDIT_SPECIALTY_FAIL: 'EDIT_SPECIALTY_FAIL',
    EDIT_SPECIALTY_SUCCESS: 'EDIT_SPECIALTY_SUCCESS',
    DELETE_SPECIALTY_FAIL: 'DELETE_SPECIALTY_FAIL',
    DELETE_SPECIALTY_SUCCESS:'DELETE_SPECIALTY_SUCCESS',
    FETCH_ALL_SPECIALTY_FAIL:'FETCH_ALL_SPECIALTY_FAIL',
    FETCH_ALL_SPECIALTY_SUCCESS:'FETCH_ALL_SPECIALTY_SUCCESS',
    CREATE_SPECIALTY_FAIL:'CREATE_SPECIALTY_FAIL',
    CREATE_SPECIALTY_SUCCESS:'CREATE_SPECIALTY_SUCCESS',
    FETCH_ALL_INFOR_SPECIALTY_SUCCESS: 'FETCH_ALL_INFOR_SPECIALTY_SUCCESS',
    FETCH_ALL_INFOR_SPECIALTY_FAIL: 'FETCH_ALL_INFOR_SPECIALTY_FAIL',


    // GÓI KHÁM BỆNH
    EDIT_CATEGORY_FAIL: 'EDIT_CATEGORY_FAIL',
    EDIT_CATEGORY_SUCCESS: 'EDIT_CATEGORY_SUCCESS',
    DELETE_CATEGORY_FAIL: 'DELETE_CATEGORY_FAIL',
    DELETE_CATEGORY_SUCCESS:'DELETE_CATEGORY_SUCCESS',
    FETCH_ALL_CATEGORY_FAIL:'FETCH_ALL_CATEGORY_FAIL',
    FETCH_ALL_CATEGORY_SUCCESS:'FETCH_ALL_CATEGORY_SUCCESS',
    CREATE_CATEGORY_FAIL:'CREATE_CATEGORY_FAIL',
    CREATE_CATEGORY_SUCCESS:'CREATE_CATEGORY_SUCCESS',

    // CHI TIẾT GÓI KHÁM BỆNH
    EDIT_INFORCATEGORY_FAIL: 'EDIT_INFORCATEGORY_FAIL',
    EDIT_INFORCATEGORY_SUCCESS: 'EDIT_INFORCATEGORY_SUCCESS',
    DELETE_INFORCATEGORY_FAIL: 'DELETE_INFORCATEGORY_FAIL',
    DELETE_INFORCATEGORY_SUCCESS:'DELETE_INFORCATEGORY_SUCCESS',
    FETCH_ALL_INFORCATEGORY_FAIL:'FETCH_ALL_INFORCATEGORY_FAIL',
    FETCH_ALL_INFORCATEGORY_SUCCESS:'FETCH_ALL_INFORCATEGORY_SUCCESS',
    CREATE_INFORCATEGORY_FAIL:'CREATE_INFORCATEGORY_FAIL',
    CREATE_INFORCATEGORY_SUCCESS:'CREATE_INFORCATEGORY_SUCCESS',
    FETCH_ALL_INFOR_CATEGORY_SUCCESS: 'FETCH_ALL_INFOR_CATEGORY_SUCCESS',
    FETCH_ALL_INFOR_CATEGORY_FAIL: 'FETCH_ALL_INFOR_CATEGORY_FAIL',

    //ALLCODE
    EDIT_ALLCODE_FAIL: 'EDIT_ALLCODE_FAIL',
    EDIT_ALLCODE_SUCCESS: 'EDIT_ALLCODE_SUCCESS',
    DELETE_ALLCODE_FAIL: 'DELETE_ALLCODE_FAIL',
    DELETE_ALLCODE_SUCCESS:'DELETE_ALLCODE_SUCCESS',
    FETCH_ALL_ALLCODE_FAIL:'FETCH_ALL_ALLCODE_FAIL',
    FETCH_ALL_ALLCODE_SUCCESS:'FETCH_ALL_ALLCODE_SUCCESS',
    CREATE_ALLCODE_FAIL:'CREATE_ALLCODE_FAIL',
    CREATE_ALLCODE_SUCCESS:'CREATE_ALLCODE_SUCCESS',



})

export default actionTypes;