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
export {
    handleLoginApi, getAllUsers,
    createrNewUserFromReact, deleteUserService,
    editUserService, getAllCodeService,
    getTopDoctorService, getAllDoctorService,
    postInfoDoctors, getInforDoctor, saveBulkScheduleDoctor,
    getSchDoctorByDate
}