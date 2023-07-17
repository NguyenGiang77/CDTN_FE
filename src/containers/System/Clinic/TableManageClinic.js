import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageClinic.scss';
import * as actions from '../../../store/actions';

import 'react-markdown-editor-lite/lib/index.css'

class TableManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinicRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchAllClinicStart();
    }
    componentDidUpdate(prevProps, prevState,snapshot) {
        if (prevProps.clinic !== this.props.clinic) { 
            this.setState({ 
                clinicRedux: this.props.clinic
             })
        }
    }
    handleDeleteRedux = (clinic) => { 
        this.props.deleteClinic(clinic.id);

    }
    handleEditRedux = (clinic) => { 
        this.props.handleEditClinicFromParent(clinic);
    }
    render() {
        let arrClinic = this.state.clinicRedux;
        return (
            <React.Fragment>
                <table id = "TableManageClinic">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Actions</th>    
                        </tr>
                        {arrClinic && arrClinic.length > 0 &&
                            arrClinic.map((item, index) => {
                                
                            return(
                                <tr key ={index}>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button
                                            onClick={()=> this.handleEditRedux(item)}
                                            className='btn-edit' ><i className="fas fa-pencil-alt"></i></button>
                                        <button
                                            onClick={() => this.handleDeleteRedux(item)}
                                            className='btn-delete' ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                            })
                        }
                        
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        clinic: state.admin.clinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClinicStart: () => dispatch(actions.fetchAllClinicStart()),
        deleteClinic: (id) => dispatch(actions.deleteClinicStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
