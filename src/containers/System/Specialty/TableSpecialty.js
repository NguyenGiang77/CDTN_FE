import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableSpecialty.scss';
import * as actions from '../../../store/actions';

import 'react-markdown-editor-lite/lib/index.css'

class TableSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialtyRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchAllSpecialtyStart();
    }
    componentDidUpdate(prevProps, prevState,snapshot) {
        if (prevProps.specialty !== this.props.specialty) { 
            this.setState({ 
                specialtyRedux: this.props.specialty
             })
        }
    }
    handleDeleteRedux = (specialty) => { 
        this.props.deleteSpecialty(specialty.id);

    }
    handleEditRedux = (specialty) => { 
        this.props.handleEditSpecialtyFromParent(specialty);
    }
    render() {
        let arrSpecialty = this.state.specialtyRedux;
        console.log(arrSpecialty)
        return (
            <React.Fragment>
                <table id = "TableSpecialty">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>    
                        </tr>
                        {arrSpecialty && arrSpecialty.length > 0 &&
                            arrSpecialty.map((item, index) => {
                                
                            return(
                                <tr key ={index}>
                                    <td>{item.name}</td>
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
        specialty: state.admin.specialties
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialtyStart: () => dispatch(actions.fetchAllSpecialtyStart()),
        deleteSpecialty: (id) => dispatch(actions.deleteSpecialtyStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSpecialty);
