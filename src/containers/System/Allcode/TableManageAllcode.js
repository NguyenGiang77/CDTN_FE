import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageAllcode.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

import 'react-markdown-editor-lite/lib/index.css'

class TableManageAllcode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allcodeRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchAllAllcodeStart();
    }
    componentDidUpdate(prevProps, prevState,snapshot) {
        if (prevProps.allcode !== this.props.allcode) { 
            this.setState({ 
                allcodeRedux: this.props.allcode
             })
        }
    }
    handleDeleteRedux = (allcode) => { 
        this.props.deleteAllcodeStart(allcode.id);

    }
    handleEditRedux = (allcode) => { 
        this.props.handleEditAllcodeFromParent(allcode);
    }
    render() {
        let arrAllcode = this.state.allcodeRedux;
        console.log(arrAllcode)
        return (
            <React.Fragment>
                <table id = "TableManageAllcode">
                    <tbody>
                        <tr>
                            <th><FormattedMessage id ="manage-allcode.keymap" /></th>
                            <th><FormattedMessage id ="manage-allcode.type" /></th> 
                            <th><FormattedMessage id ="manage-allcode.valueVN" /></th> 
                            <th><FormattedMessage id ="manage-allcode.valueEN" /></th> 
                            <th><FormattedMessage id ="manage-allcode.action" /></th>    
                        </tr>
                        {arrAllcode && arrAllcode.length > 0 &&
                            arrAllcode.map((item, index) => {
                            return(
                                <tr key ={index}>
                                    <td>{item.keyMap}</td>
                                    <td>{item.type}</td>
                                    <td>{item.valueVN}</td>
                                    <td>{item.valueEN}</td>
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
        allcode: state.admin.allcodes

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllAllcodeStart: () => dispatch(actions.fetchAllAllcodeStart()),
        deleteAllcodeStart: (id) => dispatch(actions.deleteAllcodeStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageAllcode);
