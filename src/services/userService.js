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
    console.log('check data from service',data);
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
export {
    handleLoginApi, getAllUsers,
    createrNewUserFromReact, deleteUserService,
    editUserService
}