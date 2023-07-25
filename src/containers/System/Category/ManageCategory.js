import React, { Component } from 'react';
 import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES, CRUB_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './ManageCategory.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableCategory from './TableCategory';
const mdParser = new MarkdownIt();

class ManageCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // dữ liệu
            name: '',
            categoryHTML: '',
            categoryMarkown: '',
            action: '',
            categoryRditId: ''    ,
            image: '',
            imgURL: '',
            isOpen: false,

        }
     }

    async componentDidMount() {
        
    }
    //prev: so sánh props hiện tại và props sắp tới ntn
    componentDidUpdate(prevProps, prevState, snapshot) { 

        if (prevProps.category !== this.props.category)
        {
            this.setState({
                name: '',
                categoryHTML: '',
                image: '',
                categoryMarkown: '',
                imgURL: '',
                action: CRUB_ACTIONS.CREATE,
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
    handleSaveCategoryFE = () => { 
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUB_ACTIONS.CREATE)
        {
            this.props.createCategory({
                name: this.state.name,
                categoryHTML: this.state.categoryHTML,
                categoryMarkown: this.state.categoryMarkown,
                image: this.state.image,

            })
            
        }
        if (action === CRUB_ACTIONS.EDIT) {
            this.props.editCategoryStart({
                id:this.state.categoryRditId,
                name: this.state.name,
                categoryHTML: this.state.categoryHTML,
                categoryMarkown: this.state.categoryMarkown,
                image: this.state.image,

            })
        }
        
    }
    checkValidateInput = () => { 
        let isValid = true;
        let arrCheck = ['name', 'categoryHTML', 'categoryMarkown',]
        for (let i = 0; i < arrCheck.length; i++) { 
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(<FormattedMessage id="toast.admin-action.please" />+ arrCheck[i]);
                break;
            }
        }
        return isValid;
    }
    handleEditChange= ({ html, text }) => {
        this.setState ({
            categoryHTML: html,
            categoryMarkown: text,
            
        })
        
    }
    onChangeInput = (event, id) => { 
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        
    }
    handleEditCategoryFromParent = (category) => { 
        let imageBase64 = '';
        if (category.image) { 
            imageBase64 = new Buffer(category.image, 'base64').toString('binary');
        }
        this.setState({
            name: category.name,
            categoryHTML: category.categoryHTML,
            categoryMarkown: category.categoryMarkown,
            imgURL: imageBase64,
            image: '',
            action: CRUB_ACTIONS.EDIT,
            categoryRditId: category.id
            })
            console.log(category)
    }
    render() {

        let { name, categoryMarkown} = this.state;
        return (
            <div className='user-redux-contanier'>
            <div className='title'>
            <FormattedMessage id ="manage-category.title" />
            </div>
            <div className="user-redux-body" >
                <div className='container'>
                    <div className='row'>
                        
                        <div className='name col-6'>
                            <label><FormattedMessage id ="manage-category.name" /></label>
                            <input className="form-control" 
                                value={name} 
                                onChange={(event) => { this.onChangeInput(event, 'name') }}
                            />
                        </div> 
                        <div className='col-6 my-3'>
                                <label><FormattedMessage id="manage-pack.image" /></label>
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
                                value ={categoryMarkown}
                            />
                        </div>
                        <div className='col-12 my-3'>
                            <button
                                className={this.state.action === CRUB_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                onClick={() => { this.handleSaveCategoryFE() }}
                            >
                                {this.state.action === CRUB_ACTIONS.EDIT ? 
                                    <FormattedMessage id="manage-user.edit" />
                                    :
                                     <FormattedMessage id="manage-user.save" />
                                }
                           </button>
                        </div>
                        <div className='col-12 mb-5'>
                            <TableCategory
                                handleEditCategoryFromParent={this.handleEditCategoryFromParent}
                                action = {this.state.action}
                            />
                                
                        </div>
                    </div>

                </div>
            
            </div>
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
        categoryRedux: state.admin.categories,
        category: state.admin.categories,

    };

};

const mapDispatchToProps = dispatch => {
    return {
        createCategory: (data) => dispatch(actions.createCategory(data)),
        fetchAllCategoryStart: () => dispatch(actions.fetchAllCategoryStart()),
        editCategoryStart: (data) => dispatch(actions.editCategoryStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategory);
