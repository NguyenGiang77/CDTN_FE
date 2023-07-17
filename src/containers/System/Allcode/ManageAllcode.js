import React, { Component } from 'react';
 import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUB_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './ManageAllcode.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageAllcode from './TableManageAllcode';


const mdParser = new MarkdownIt();

class ManageAllcode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyMap: '',
            // dữ liệu
            type: '',
            valueVN: '',
            valueEN: '',
            action: '',
            allcodeEditId: ''
        }
     }

    async componentDidMount() {

        
    }
    //prev: so sánh props hiện tại và props sắp tới ntn
    componentDidUpdate(prevProps, prevState, snapshot) { 
        
        if (prevProps.allcode !== this.props.allcode)
        {
            this.setState({
                keyMap: '',
                type: '',
                valueVN: '',
                valueEN: '',
                action: CRUB_ACTIONS.CREATE,
            })
            }
    }
    handleOnChangeInput = (event,id) =>{
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        
    }

    checkValidateInput = () => { 
        let isValid = true;
        let arrCheck = ['keyMap', 'type','valueVN','valueEN' ]
        for (let i = 0; i < arrCheck.length; i++) { 
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(<FormattedMessage id="toast.manage-clinic.please" />+ arrCheck[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveAllcodeFE = () => { 
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUB_ACTIONS.CREATE)
        {
            this.props.createAllcode({
            keyMap: this.state.keyMap,
            type: this.state.type,
            valueVN: this.state.valueVN,
            valueEN: this.state.valueEN,
            })
            
        }
        if (action === CRUB_ACTIONS.EDIT) {
            this.props.editAllcodeStart({
                id:this.state.allcodeEditId,
                keyMap: this.state.keyMap,
                type: this.state.type,
                valueVN: this.state.valueVN,
                valueEN: this.state.valueEN,
            })
            
        }
        
    }
    handleEditAllcodeFromParent = (allcode) => { 
        this.setState({
            allcodeEditId: allcode.id,
            keyMap: allcode.keyMap,
            type: allcode.type,
            valueVN: allcode.valueVN,
            valueEN: allcode.valueEN,
            action: CRUB_ACTIONS.EDIT
            
            })
    }
 
    render() {
        return (
            <div className='user-redux-contanier'>
                <div className='title'>
                <FormattedMessage id ="manage-allcode.title" />
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            
                            <div className='col-6'>
                                <label><FormattedMessage id ="manage-allcode.keymap" /></label>
                                <input className="form-control" type='text'
                                    value={this.state.keyMap} 
                                    onChange={(event) => { this.handleOnChangeInput(event, 'keyMap') }}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id ="manage-allcode.type" /></label>
                                <input className="form-control" type='text'
                                    value={this.state.type} 
                                    onChange={(event) => { this.handleOnChangeInput(event, 'type') }}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id ="manage-allcode.valueVN" /></label>
                                <input className="form-control" type='text'
                                    value={this.state.valueVN} 
                                    onChange={(event) => { this.handleOnChangeInput(event, 'valueVN') }}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id ="manage-allcode.valueEN" /></label>
                                <input className="form-control" type='text'
                                    value={this.state.valueEN} 
                                    onChange={(event) => { this.handleOnChangeInput(event, 'valueEN') }}
                                />
                            </div>
                            <div className='col-12 my-3'>
                                <button
                                    className={this.state.action === CRUB_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => { this.handleSaveAllcodeFE() }}
                                >
                                    {this.state.action === CRUB_ACTIONS.EDIT ? 
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                         <FormattedMessage id="manage-user.save" />
                                    }
                               </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageAllcode
                                    handleEditAllcodeFromParent={this.handleEditAllcodeFromParent}
                                    action = {this.state.action}
                                />
                                    
                            </div>
                        </div>

                    </div>
                
                </div>
                <div></div>
                
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.imgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    
                    />
                }




            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        
        language: state.app.language,
       
        allcode: state.admin.allcodes,

    };

};

const mapDispatchToProps = dispatch => {
    return {
        
        createAllcode: (data) => dispatch(actions.createAllcode(data)),
        fetchAllAllcodeStart: () => dispatch(actions.fetchAllAllcodeStart()),
        editAllcodeStart: (data) => dispatch(actions.editAllcodeStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAllcode);
