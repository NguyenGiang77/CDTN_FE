import React, { Component } from 'react';
 import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES, CRUB_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './ManageCategory.scss'
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
                categoryMarkown: '',
                action: CRUB_ACTIONS.CREATE,
            })
            }
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
            })
            
        }
        if (action === CRUB_ACTIONS.EDIT) {
            this.props.editCategoryStart({
                id:this.state.categoryRditId,
                name: this.state.name,
                categoryHTML: this.state.categoryHTML,
                categoryMarkown: this.state.categoryMarkown,
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
        
        this.setState({
            name: category.name,
            categoryHTML: category.categoryHTML,
            categoryMarkown: category.categoryMarkown,
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
