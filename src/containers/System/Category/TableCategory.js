import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableCategory.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

import 'react-markdown-editor-lite/lib/index.css'

class TableCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchAllCategoryStart();
    }
    componentDidUpdate(prevProps, prevState,snapshot) {
        if (prevProps.category !== this.props.category) { 
            this.setState({ 
                categoryRedux: this.props.category
             })
        }
    }
    handleDeleteRedux = (category) => { 
        this.props.deleteCategoryStart(category.id);

    }
    handleEditRedux = (category) => { 
        this.props.handleEditCategoryFromParent(category);
    }
    render() {
        let arrCategory = this.state.categoryRedux;
        console.log(arrCategory)
        return (
            <React.Fragment>
                <table id = "TableCategory">
                    <tbody>
                        <tr>
                            <th><FormattedMessage id ="manage-category.name" /></th>
                            <th><FormattedMessage id ="manage-category.action" /></th>    
                        </tr>
                        {arrCategory && arrCategory.length > 0 &&
                            arrCategory.map((item, index) => {
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
        language: state.app.language,
        category: state.admin.categories

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCategoryStart: () => dispatch(actions.fetchAllCategoryStart()),
        deleteCategoryStart: (id) => dispatch(actions.deleteCategoryStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCategory);
