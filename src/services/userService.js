import axios from '../axios';
const handleLoginApi = (UserEmail,UserPassword) => { 
    return axios.post('/api/login', {email: UserEmail, password: UserPassword} );
}
const getAllUsers = (inputId) =>
{
    //template string
    return axios.get(`/api/get-all-users?id=${inputId}`);
}
const createrNewUserFromReact = (data) =>
{
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId,
        }
    });

}

const editUserService = (inputdata) => { 
    return axios.put('/api/edit-user', inputdata);
}
const getAllCodeService = (inputtype) => { 
    return axios.get(`/api/allcode?type=${inputtype}`)
}

const getTopDoctorService = (limit) => { 
    return axios.get(`/api/top-doctor?limit=${limit}`) 
}

const getAllDoctorService = () => { 
    return axios.get(`/api/all-doctor`) 
}

const postInfoDoctors = (data) => {
    return axios.post(`/api/save-infor-doctor`, data)  
}
const getInforDoctor = (inputId) => { 
    return axios.get(`/api/get-doctor-by-id?id=${inputId}`) 

}
const saveBulkScheduleDoctor = (data) => { 
    return axios.post(`/api/bulk-create-schedule`, data) 

}
const getSchDoctorByDate = (doctorId, date) => { 
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`) 
}
const getExtraInforDoctorById = (doctorId) => { 
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`) 
}
const getProfileDoctorById = (doctorId) => { 
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`) 
}
const postBookingAppointment = (data) => { 
    return axios.post(`/api/patient-book-appointment`, data) 
}
const postVerifyBook = (data) => { 
    return axios.post(`/api/verify-book-appointment`, data) 
}
//chuyên khoa
const createSpecialtyFromReact = (data) => { 
    return axios.post(`/api/create-new-specialty`, data) 
}
const getAllSpecialty = () => { 
    return axios.get(`/api/get-specialty`) 
}

const getDetailSpecialtyById = (data) => { 
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`) 
}
const getAllSpecialties = (inputId) =>
{
    return axios.get(`/api/get-all-specialties?id=${inputId}`);
}
const deletespecialtyService = (specialtyId) => {
    return axios.delete('/api/delete-specialty', {
        data: {
            id: specialtyId,
        }
    });
}
const editspecialtyService = (inputdata) => { 
    return axios.put('/api/edit-specialty', inputdata);
}
//phòng khám
const getAllClinics = (inputId) =>
{
    return axios.get(`/api/get-all-clinics?id=${inputId}`);
}
const createrNewClinicFromReact = (data) =>
{
    return axios.post('/api/create-new-clinic', data);
}

const deleteClinicService = (clinicId) => {
    return axios.delete('/api/delete-clinic', {
        data: {
            id: clinicId,
        }
    });
}
const editClinicService = (inputdata) => { 
    return axios.put('/api/edit-clinic', inputdata);
}

const getAllClinic = () => { 
    return axios.get(`/api/get-clinic`) 
}
const getDetailClinicById = (data) => { 
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`) 
}

// gói khám sức khỏe
const getAllCategory = () => { 
    return axios.get(`/api/get-category`) 
}
const getAllCategories = (inputId) =>
{
    return axios.get(`/api/get-all-categories?id=${inputId}`);
}
const createrNewCategoryFromReact = (data) =>
{
    return axios.post('/api/create-new-category', data);
}

const deleteCategoryService = (categoryId) => {
    return axios.delete('/api/delete-category', {
        data: {
            id: categoryId,
        }
    });
}
const editCategoryService = (inputdata) => { 
    return axios.put('/api/edit-category', inputdata);
}

const getDetailCategoryById = (data) => { 
    return axios.get(`/api/get-detail-category-by-id?id=${data.id}`) 
}

//chi tiết gói khám
const getAllInforCategories = (inputId) =>
{
    return axios.get(`/api/get-all-inforCategories?id=${inputId}`);
}
const createrNewInforCategoryFromReact = (data) =>
{
    return axios.post('/api/create-new-inforCategory', data);
}

const deleteInforCategoryService = (inforCategoryId) => {
    return axios.delete('/api/delete-inforCategory', {
        data: {
            id: inforCategoryId,
        }
    });
}
const editInforCategoryService = (inputdata) => { 
    return axios.put('/api/edit-inforCategory', inputdata);
}
const getAllInforCategory = () => { 
    return axios.get(`/api/get-inforCategory`) 
}
const getDetailInforCategoryById = (data) => { 
    return axios.get(`/api/get-detail-inforCategory-by-id?id=${data.id}`) 
}
const getExtraInforCategoryById = (id) => { 
    return axios.get(`/api/get-extra-infor-category-by-id?id=${id}`) 
}

// đăng ký gói khám
const getlisPatientForDoctor = (data) => { 
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`) 
}
const sendRemedy = (data) =>
{
    return axios.post('/api/send-remedy', data);
}

// Allcode
const getAllAllcodes = (inputId) =>
{
    return axios.get(`/api/get-all-allcodes?id=${inputId}`);
}
const createrNewAllcodeFromReact = (data) =>
{
    return axios.post('/api/create-new-allcode', data);
}

const deleteAllcodeService = (allcodeId) => {
    return axios.delete('/api/delete-allcode', {
        data: {
            id: allcodeId,
        }
    });
}
const editAllcodeService = (inputdata) => { 
    return axios.put('/api/edit-allcode', inputdata);
}

export {
    handleLoginApi, getAllUsers,
    createrNewUserFromReact, deleteUserService,
    editUserService, getAllCodeService,
    getTopDoctorService, getAllDoctorService,
    postInfoDoctors, getInforDoctor, saveBulkScheduleDoctor,
    getSchDoctorByDate, getExtraInforDoctorById,
    getProfileDoctorById, postBookingAppointment, postVerifyBook,
    createSpecialtyFromReact,getAllSpecialty, getDetailSpecialtyById,
    editspecialtyService, deletespecialtyService, getAllSpecialties,
    createrNewClinicFromReact,getAllClinic,getDetailClinicById,
    deleteClinicService, editClinicService,getAllClinics, 
    getlisPatientForDoctor, sendRemedy,
     getAllCategories, getDetailCategoryById,  createrNewCategoryFromReact,
     editCategoryService, deleteCategoryService, getAllCategory,
     getAllInforCategory, getAllInforCategories, getDetailInforCategoryById,
     editInforCategoryService, deleteInforCategoryService, createrNewInforCategoryFromReact,
     getAllAllcodes, createrNewAllcodeFromReact, editAllcodeService, deleteAllcodeService,
     getExtraInforCategoryById

    
}