import React, { Component } from 'react';
 import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUB_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './ManageClinic.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
import TableManageClinic from './TableManageClinic';


const mdParser = new MarkdownIt();

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgURL: '',
            isOpen: false,
            address: '',
            // dữ liệu
            name: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkown: '',
            action: '',
            clinicEditId: ''


            
        }
     }

    async componentDidMount() {

        
    }
    //prev: so sánh props hiện tại và props sắp tới ntn
    componentDidUpdate(prevProps, prevState, snapshot) { 
        
        if (prevProps.clinic !== this.props.clinic)
        {
            this.setState({
                name: '',
                address: '',
                image: '',
                descriptionHTML: '',
                descriptionMarkown: '',
                action: CRUB_ACTIONS.CREATE,
                imgURL: ''
            })
            }
    }
    handleImageChange =  async (event) => { 
        let datafile = event.target.files;
        let file = datafile[0];
        if (file)
        {
            let base64 = await CommonUtils.getBase64(file);            
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                imgURL: objectUrl,
                image: base64
            })
            
                
            
        }
    }

    openImg = () => { 
        if (!this.state.imgURL) return;
    
        this.setState({ isOpen: true })
    }
    handleOnChangeInput = (event,id) =>{
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        
    }
     handleEditChange= ({ html, text }) => {
        this.setState ({
            descriptionHTML: html,
            descriptionMarkown: text,
            
        })
        
    }
    checkValidateInput = () => { 
        let isValid = true;
        let arrCheck = ['name', 'address','descriptionHTML','descriptionMarkown' ]
        for (let i = 0; i < arrCheck.length; i++) { 
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(<FormattedMessage id="toast.manage-clinic.please" />+ arrCheck[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveClinicFE = () => { 
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUB_ACTIONS.CREATE)
        {
            this.props.createClinic({
            name: this.state.name,
            address: this.state.address,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkown: this.state.descriptionMarkown,
            image: this.state.image,
            })
            
        }
        if (action === CRUB_ACTIONS.EDIT) {
            this.props.editClinicStart({
                id:this.state.clinicEditId,
                name: this.state.name,
                address: this.state.address,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkown: this.state.descriptionMarkown,
                image: this.state.image,
            })
            
        }
        
    }
    handleEditClinicFromParent = (clinic) => { 
        let imageBase64 = '';
        if (clinic.image) { 
            imageBase64 = new Buffer(clinic.image, 'base64').toString('binary');
        }
        
        this.setState({
            clinicEditId: clinic.id,
            name: clinic.name,
            address: clinic.address,
            descriptionHTML: clinic.descriptionHTML,
            descriptionMarkown: clinic.descriptionMarkown,
            imgURL: imageBase64,
            image: '',
            action: CRUB_ACTIONS.EDIT
            
            })
    }
 
    render() {
        return (
            <div className='user-redux-contanier'>
                <div className='title'>
                <FormattedMessage id ="manage-clinic.title" />
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            
                            <div className='col-6'>
                                <label><FormattedMessage id ="manage-clinic.name" /></label>
                                <input className="form-control" type='text'
                                    value={this.state.name} 
                                    onChange={(event) => { this.handleOnChangeInput(event, 'name') }}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id ="manage-clinic.address" /></label>
                                <input className="form-control" type='text'
                                    value={this.state.address} 
                                    onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                />
                            </div>
                            <div className='col-6 my-3'>
                                <label><FormattedMessage id="manage-clinic.image" /></label>
                                <div className='img-container'>
                                    <input id='previewImg' type="file" hidden
                                        onChange={(event) =>this.handleImageChange(event)}
                                    
                                    />
                                    <label className='label-img' htmlFor='previewImg'><FormattedMessage id="manage-clinic.file" /><i className="fas fa-upload"></i> </label>
                                    <div className='image'
                                        style={{ backgroundImage: `url(${this.state.imgURL})`}}
                                        onClick={() => this.openImg()}
                                    >
                                        
                                    </div>
                                </div>
                                
                            </div>
                            
                            
                            <div className='col-12 manage-doctor-edit'>
                                <MdEditor
                                    style={{ height: '300px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={this.handleEditChange}
                                    value ={this.state.descriptionMarkown}
                                />
                            </div>
                            <div className='col-12 my-3'>
                                <button
                                    className={this.state.action === CRUB_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => { this.handleSaveClinicFE() }}
                                >
                                    {this.state.action === CRUB_ACTIONS.EDIT ? 
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                         <FormattedMessage id="manage-user.save" />
                                    }
                               </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageClinic
                                    handleEditClinicFromParent={this.handleEditClinicFromParent}
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
       
        clinic: state.admin.clinics,

    };

};

const mapDispatchToProps = dispatch => {
    return {
        
        createClinic: (data) => dispatch(actions.createClinic(data)),
        fetchAllClinicStart: () => dispatch(actions.fetchAllClinicStart()),
        editClinicStart: (data) => dispatch(actions.editClinicStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
