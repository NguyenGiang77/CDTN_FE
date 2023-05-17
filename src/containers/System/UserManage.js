import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createrNewUserFromReact } from '../../services/userService';
import ModalUser  from './ModalUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        };
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
                // }, () => {
                //     console.log('check state user ', this.state.arrUsers);
                // });
                // console.log('check state user 1', this.state.arrUsers);
            })
        }
    }
    handleAddNewUser = () => { 
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal = () => { 
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    createNewUser = async (data) => { 
        try {
            let reponse = await createrNewUserFromReact(data);
            if (reponse && reponse.errCode !== 0) { 
                alert(reponse.errMessagee);
            }
            else {
                await this.getAllUserFromReact();
            }
        } catch (e)
        {
            console.log(e);
        }
        
    }
    /** Vòng đời của React 
     * khi Run componet:
     * 1. Run consstruct => init state: init các biến mà mk thêm vào
     * 2. Did mount  => khi muốn gán gtri vào 1 biến state bất kỳ trước khi render ra màn hình
     * 3. Render // đưa ra màn hình re-render: render ra nhiều lần
     * state có nhiệm vụ lưu trữ giá trị 
     */

    render() {
        // console.log('check render', this.state);
        
        let arrUsers = this.state.arrUsers;
        console.log(arrUsers)
        //prop lấy dữ liệu từ các componet khác
        return (
            <div className='user-container'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggerFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <div className='title text-center'>Manage user with Hospital</div>
                <div className='mx-1'>
                    <button className='btn btn-sign-in px-3' onClick={() =>this.handleAddNewUser()}>
                        <i className="fas fa-user-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className='users-table mt-4 mx-3'>
                    <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>    
                        </tr>
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    //console.log('Giang check map', item, index);
                                    return (
                                        <tr key = {index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                            </td>
                                       </tr>
                                   )
                                })
                            }
                            </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
