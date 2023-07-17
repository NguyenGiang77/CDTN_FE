import React, { Component } from 'react';
 import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUB_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './ManageInforCategory.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageInforCategory from './TableManageInforCategory';

const mdParser = new MarkdownIt();
class ManageInforCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            priceArr: [],
            paymentArr: [],
            provinceArr: [],
            clinicArr: [],
            categoryArr: [],
            imgURL: '',
            isOpen: false,
            // dữ liệu
            name: '',
            inforCategoryHTML: '',
            inforCategoryMarkdown: '',
            description: '',
            clinic: '',
            category: '',
            price: '',
            payment: '',
            province: '',
            image: '',
            action: '',
            inforCategoryEditId: ''
            


            
        }
     }

    async componentDidMount() {
        this.props.fetchCategoryStart();
        this.props.fetchClinicStart();
        this.props.fetchPaymentStart();
        this.props.fetchPriceStart();
        this.props.fetchProvinceStart();
        
    }
    //prev: so sánh props hiện tại và props sắp tới ntn
    componentDidUpdate(prevProps, prevState, snapshot) { 
        //sau khi hàm render chạy thì sẽ chạy đến componentDidUpdate
        // nó sẽ so sánh giữa hiện tại ( this) vafquas khứ (prev)
        // quá khứ của nó là mảng rỗng [], còn hiện tại đã nạp đủ phần tử
        if (prevProps.priceRedux !== this.props.priceRedux) {
            let arrPrice = this.props.priceRedux;
            this.setState({
                priceArr: arrPrice,
                price: arrPrice && arrPrice.length > 0 ? arrPrice[0].keyMap : ''
            });
            //
        }
        if (prevProps.paymentRedux !== this.props.paymentRedux) {
            let arrPayment = this.props.paymentRedux
            this.setState({
                paymentArr: arrPayment,
                payment: arrPayment && arrPayment.length > 0 ? arrPayment[0].keyMap: ''
            });
            //
        }
        if (prevProps.provinceRedux !== this.props.provinceRedux) {
            let arrProvince = this.props.provinceRedux;
            this.setState({
                provinceArr: arrProvince,
                province: arrProvince && arrProvince.length > 0 ? arrProvince[0].keyMap: ''
            });
            //
        }

        if (prevProps.clinicRedux !== this.props.clinicRedux) {
            let arrClinic = this.props.clinicRedux;
            this.setState({
                clinicArr: arrClinic,
                clinic: arrClinic && arrClinic.length > 0 ? arrClinic[0].id: ''
            });
            //
        }
        if (prevProps.categoryRedux !== this.props.categoryRedux) {
            let arrCategory = this.props.categoryRedux;
            this.setState({
                categoryArr: arrCategory,
                category: arrCategory && arrCategory.length > 0 ? arrCategory[0].id: ''
            });
            //
        }
        if (prevProps.inforCategory !== this.props.inforCategory)
        {
            let arrPrice = this.props.priceRedux;
            let arrPayment = this.props.paymentRedux;
            let arrProvince = this.props.provinceRedux;
            let arrClinic = this.props.clinicRedux;
            let arrCategory = this.props.categoryRedux;
            this.setState({
                name: '',
                inforCategoryHTML: '',
                inforCategoryMarkdown: '',
                description: '',
                image: '',
                price: arrPrice && arrPrice.length > 0 ? arrPrice[0].keyMap : '',
                payment: arrPayment && arrPayment.length > 0 ? arrPayment[0].keyMap: '',
                province: arrProvince && arrProvince.length > 0 ? arrProvince[0].keyMap: '',
                clinic: arrClinic && arrClinic.length > 0 ? arrClinic[0].id: '',
                category: arrCategory && arrCategory.length > 0 ? arrCategory[0].id: '',
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
    handleEditChange= ({ html, text }) => {
        this.setState ({
            inforCategoryHTML: html,
            inforCategoryMarkdown: text,
            
        })
        
    }
    handleSaveInforCategoryFE = () => { 
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUB_ACTIONS.CREATE)
        {
            this.props.createInforCategory({
                name: this.state.name,
                inforCategoryHTML: this.state.inforCategoryHTML,
                inforCategoryMarkdown: this.state.inforCategoryMarkdown,
                description: this.state.description,
                priceId: this.state.price,
                paymentId: this.state.payment,           
                provinceId: this.state.province,
                clinicId: this.state.clinic,
                categoryId: this.state.category,
                image: this.state.image,
            })
            
        }
        if (action === CRUB_ACTIONS.EDIT) {
            this.props.editInforCategoryStart({
                id: this.state.inforCategoryEditId,
                name: this.state.name,
                inforCategoryHTML: this.state.inforCategoryHTML,
                inforCategoryMarkdown: this.state.inforCategoryMarkdown,
                description: this.state.description,
                priceId: this.state.price,
                paymentId: this.state.payment,           
                provinceId: this.state.province,
                clinicId: this.state.clinic,
                categoryId: this.state.category,
                image: this.state.image,
            })
        }
        
    }
    checkValidateInput = () => { 
        let isValid = true;
        let arrCheck = ['name', 'inforCategoryMarkdown', 'inforCategoryHTML', 'description']
        for (let i = 0; i < arrCheck.length; i++) { 
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                
                alert(<FormattedMessage id="toast.manage-clinic.please" />+ arrCheck[i]);
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => { 
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        
    }
    handleEditInforCategoryFromParent = (inforCategory) => { 
        let imageBase64 = '';
        if (inforCategory.image) { 
            imageBase64 = new Buffer(inforCategory.image, 'base64').toString('binary');
        }
        
        this.setState({
            name: inforCategory.name,
            inforCategoryHTML: inforCategory.inforCategoryHTML,
            inforCategoryMarkdown: inforCategory.inforCategoryMarkdown,
            description: inforCategory.description,
            price: inforCategory.priceId,
            payment: inforCategory.paymentId,
            province: inforCategory.provinceId,
            clinic: inforCategory.clinicId,
            category: inforCategory.categoryId,
            imgURL: imageBase64,
            image: '',
            action: CRUB_ACTIONS.EDIT,
            inforCategoryEditId: inforCategory.id
            })
    }
    render() {
        let prices = this.state.priceArr;
        let payments = this.state.paymentArr;
        let provinces = this.state.provinceArr;
        let clinics = this.state.clinicArr;
        let categories = this.state.categoryArr;
        let { name, inforCategoryMarkdown, inforCategoryHTML,
             description, payment, price,province, clinic, category} = this.state;
        let language = this.props.language;
        console.log(this.state)
        return (
            <div className='user-redux-contanier'>
                <div className='title'>
                    <label><FormattedMessage id ="manage-pack.titleRedux" /></label>
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='container-up'>
                            <div className='left'>
                                <label><FormattedMessage id ="manage-pack.name" /></label>
                                <input className="form-control" type='name'
                                value={name}
                                    onChange={(event) => { this.onChangeInput(event, 'name') }}
                                />
                            </div>
                            <div className='right'>
                                <label><FormattedMessage id ="manage-pack.description" /></label>
                                <input className="form-control" type='note'
                                    value={description}
                                onChange ={(event) =>{ this.onChangeInput(event,'description')}}
                                />
                            </div>
                        </div>
                        <div className='container-down'>
                            <div className='row'>
                                <div className='col-3'>
                                    <label><FormattedMessage id ="manage-pack.clinic" /></label>
                                    <select className="form-control"
                                        value={clinic}
                                        onChange={(event) => { this.onChangeInput(event, 'clinic') }}
                                    >
                                        {clinics && clinics.length > 0 &&
                                            clinics.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id ="manage-pack.category" /></label>
                                    <select className="form-control"
                                        value={category}
                                        onChange={(event) => { this.onChangeInput(event, 'category') }}
                                    >
                                        {categories && categories.length > 0 &&
                                            categories.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id ="manage-pack.province" /></label>
                                    <select className="form-control"
                                        value={province}
                                        onChange={(event) => { this.onChangeInput(event, 'province') }}
                                    >
                                        {provinces && provinces.length > 0 &&
                                            provinces.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{
                                                        language === LANGUAGES.VI ? item.valueVN : item.valueEN}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                
                                <div className='col-3'>
                                    <label><FormattedMessage id ="manage-pack.price" /></label>
                                    <select className="form-control"
                                        value={price}
                                        onChange ={(event) =>{ this.onChangeInput(event,'price')}}
                                    >
                                        {prices && prices.length > 0 &&
                                            prices.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{
                                                        language === LANGUAGES.VI ? item.valueVN : item.valueEN}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id ="manage-pack.payment" /></label>
                                    <select className="form-control"
                                        
                                        onChange={(event) => { this.onChangeInput(event, 'payment') }}
                                        value ={payment}
                                    >
                                        {payments && payments.length > 0 &&
                                            payments.map((item, index) => { 
                                                return (
                                                    <option key={index} value={item.keyMap}>{
                                                        language === LANGUAGES.VI ? item.valueVN : item.valueEN
                                                    }</option>
                                            )
                                        })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="manage-pack.image" /></label>
                                    <div className='img-container'>
                                        <input id='previewImg' type="file" hidden
                                            onChange={(event) =>this.handleImageChange(event)}
                                        />
                                        <label className='label-img' htmlFor='previewImg'><FormattedMessage id="manage-clinic.file" /> <i className="fas fa-upload"></i> </label>
                                        <div className='image'
                                            style={{ backgroundImage: `url(${this.state.imgURL})`}}
                                            onClick={() => this.openImg()}
                                        >
                                        </div>
                                    </div>
                                    
                                </div>          
                            </div>
                                <div className='col-12 manage-pack-edit'>
                                    <MdEditor
                                        style={{ height: '300px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditChange}
                                        value ={inforCategoryMarkdown}
                                    />
                                </div>
                                <div className='col-12 my-3'>
                                    <button
                                        className={this.state.action === CRUB_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                        onClick={() => { this.handleSaveInforCategoryFE() }}
                                    >
                                        {this.state.action === CRUB_ACTIONS.EDIT ? 
                                            <FormattedMessage id="manage-user.edit" />
                                            :
                                            <FormattedMessage id="manage-user.save" />
                                        }
                                </button>
                                </div>
                                <div className='col-12 mb-5'>
                                    <TableManageInforCategory
                                        handleEditInforCategoryFromParent={this.handleEditInforCategoryFromParent}
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
        priceRedux: state.admin.prices, 
        paymentRedux: state.admin.payments,
        provinceRedux: state.admin.provinces,
        clinicRedux: state.admin.clinics,
        categoryRedux: state.admin.categories,
        inforCategory: state.admin.inforCategories,
    };

};

const mapDispatchToProps = dispatch => {
    return {
        fetchCategoryStart: () => dispatch(actions.fetchCategoryStart()),
        fetchClinicStart: () => dispatch(actions.fetchClinicStart()),
        fetchPaymentStart: () => dispatch(actions.fetchPaymentStart()),
        fetchProvinceStart: () => dispatch(actions.fetchProvinceStart()),
        fetchPriceStart: () => dispatch(actions.fetchPriceStart()),
        createInforCategory: (data) => dispatch(actions.createInforCategory(data)),
        fetchAllInforCategoryStart: () => dispatch(actions.fetchAllInforCategoryStart()),
        editInforCategoryStart: (data) => dispatch(actions.editInforCategoryStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageInforCategory);
