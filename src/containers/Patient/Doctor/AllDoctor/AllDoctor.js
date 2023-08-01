import React, { Component } from 'react';
// import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./AllDoctor.scss"
import { filterUserByName } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import * as actions from '../../../../store/actions';
import { FormattedMessage } from 'react-intl';
import debounce from 'lodash/debounce';
class AllDoctor extends Component {
    // history = useHistory();
    constructor(props) { 
        super(props);
        this.state = {
            arrDoctor: [],
            searchValue: '',
        }
        this.handleSearchDebounced = debounce(this.handleSearch,300);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allInforDoctorRedux !== this.props.allInforDoctorRedux) {
            this.setState({
                arrDoctor: this.props.allInforDoctorRedux
            })
        }

    }
    componentDidMount() { 
        this.props.fetchAllInforDoctor();
    }
    handleViewInforDoctor = (doctor) => { 
        if (this.props.history)
        {
            this.props.history.push(`/infor-doctor/${doctor.id}`);
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
          this.props.fetchAllInforDoctor();

        }
      };
      handleSearch = async(searchValue)=>{
        let res = await filterUserByName(searchValue);

        this.setState({
            arrDoctor: res.data
        })
        console.log("hihi",res);
        console.log("hihi",this.state.arrDoctor);

      }
    render() {
        let { language } = this.props;
        let arrDoctor = this.state.arrDoctor;        
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
                <FormattedMessage id="manage-doctor.title_infor"></FormattedMessage>
              </span>
            </div>
            <div className="container-center">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Tìm kiếm bác sĩ"
                value={searchValue}
                onChange={this.handleSearchInputChange}
              />
            </div>
            <div className="container-down">
              <div className="section-body">
                {arrDoctor &&
                  arrDoctor.length > 0 &&
                  arrDoctor.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let nameVn = `${item.positionData.valueVN}, ${item.lastName} ${item.firstName}`;
                    let nameEn = `${item.positionData.valueEN}, ${item.lastName} ${item.firstName}`;
                    let nameSpecialty = item.InforDoctor.specialtyData.name;
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
                              style={{ backgroundImage: `url(${imageBase64})` }}
                            />
                          </div>
                          <div className="position-doctor">
                            <div className="name-doctor">
                              {language === LANGUAGES.VI ? nameVn : nameEn}
                            </div>
                            <div className="name-specialty">
                              {nameSpecialty}
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
        allInforDoctorRedux: state.admin.allInforDoctor

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllInforDoctor: () => dispatch(actions.fetchAllInforDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllDoctor));
