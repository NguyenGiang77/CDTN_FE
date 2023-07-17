import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageInforCategory.scss';
import * as actions from '../../../store/actions';

import 'react-markdown-editor-lite/lib/index.css'

class TableManageInforCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inforCategoryRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchAllInforCategoryStart();
    }
    componentDidUpdate(prevProps, prevState,snapshot) {
        if (prevProps.inforCategory !== this.props.inforCategory) { 
            this.setState({ 
                inforCategoryRedux: this.props.inforCategory
             })
        }
    }
    handleDeleteRedux = (inforCategory) => { 
        this.props.deleteInforCategory(inforCategory.id);

    }
    handleEditRedux = (inforCategory) => { 
        this.props.handleEditInforCategoryFromParent(inforCategory);
    }
    render() {
        let arrInforCategory = this.state.inforCategoryRedux;
        return (
            <React.Fragment>
                <table id = "TableManageInforCategory">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>    
                        </tr>
                        {arrInforCategory && arrInforCategory.length > 0 &&
                            arrInforCategory.map((item, index) => {
                                
                            return(
                                <tr key ={index}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
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
        inforCategory: state.admin.inforCategories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllInforCategoryStart: () => dispatch(actions.fetchAllInforCategoryStart()),
        deleteInforCategory: (id) => dispatch(actions.deleteInforCategoryStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageInforCategory);
