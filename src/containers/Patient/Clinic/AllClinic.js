import React, { Component } from 'react';
// import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AllClinic.scss"
import { filterUserByNameClinic } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import debounce from 'lodash/debounce';
class AllClinic extends Component {
    // history = useHistory();
    constructor(props) { 
        super(props);
        this.state = {
            arrClinic: [],
            searchValue: '',
        }
        this.handleSearchDebounced = debounce(this.handleSearch,300);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.clinicRedux !== this.props.clinicRedux) {
            this.setState({
                arrClinic: this.props.clinicRedux
            })
        }

    }
    componentDidMount() { 
        this.props.fetchClinicStart();
    }
    handleViewInforDoctor = (clinic) => { 
        if (this.props.history)
        {
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    }
    returnHome = () => {
        if (this.props.history)
        {
            this.props.history.push(`/home`);
        }
    }
    handleSearchInputChange = (event) => {
        const searchValue = event.target.value;
        this.setState({
          searchValue: searchValue,
        });
        this.handleSearchDebounced(searchValue);
        if(searchValue === '')
        {
          this.props.fetchClinicStart();

        }
      };
      handleSearch = async(searchValue)=>{
        let res = await filterUserByNameClinic(searchValue);
        this.setState({
            arrClinic: res.data
        })
        console.log("hihi",res);
        console.log("hihi",this.state.arrClinic);
        if(res && res.errCode === 0)
        {
            
        }

      }
    render() {
        let arrClinic = this.state.arrClinic;        
        const { searchValue } = this.state;
        
        return (
          <div className="container-doctor">
            <div className="container-top">
              <div className="back">
                <i
                  className="fas fa-arrow-alt-circle-left"
                  onClick={() => this.returnHome()}
                ></i>
              </div>
              <span className="title-container">
                <FormattedMessage id="manage-clinic.title_FE"></FormattedMessage>
              </span>
            </div>
            <div className="container-center">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Tìm kiếm cơ sở y tế"
                value={searchValue}
                onChange={this.handleSearchInputChange}
              />
            </div>
            <div className="container-down">
              <div className="section-body">
                {arrClinic &&
                  arrClinic.length > 0 &&
                  arrClinic.map((item, index) => {
                    return (
                      <div
                        className="section-customize"
                        key={index}
                        onClick={() => this.handleViewInforDoctor(item)}
                      >
                        <div className="customize-border">
                          <div className="outer-background">
                            <div
                              className="image section-infor-category"
                              style={{ backgroundImage: `url(${item.image})` }}
                            />
                          </div>
                          <div className="position-doctor">
                            <div className="name-doctor">
                              {item.name}
                            </div>
                            <div className="name-specialty">
                              {item.address}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        clinicRedux: state.admin.clinics

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClinicStart: () => dispatch(actions.fetchClinicStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllClinic));
