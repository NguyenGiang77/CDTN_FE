import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
import Suggestion from "search-suggestion";
import * as actions from '../../store/actions';
import { getAllSpecialty } from "../../services/userService";
let items = [];
console.log(items)
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SpecialtyArr: [],
      isShowDetailInfor: false,
      dataSource: [],
      specialty: ''
    };
  }
  async componentDidMount () {
    this.props.fetchInforSpecialty();
    items =  await getAllSpecialty();
  }
  componentDidUpdate(prevProps, prevState, snapshot) { 
  //sau khi hàm render chạy thì sẽ chạy đến componentDidUpdate
  // nó sẽ so sánh giữa hiện tại ( this) vafquas khứ (prev)
  // quá khứ của nó là mảng rỗng [], còn hiện tại đã nạp đủ phần tử
    if (prevProps.allInforSpecialtyRedux !== this.props.allInforSpecialtyRedux) {
        let arrSpecialty = this.props.allInforSpecialtyRedux;
        this.setState({
          SpecialtyArr: arrSpecialty,
          specialty : arrSpecialty && arrSpecialty.length > 0 ? arrSpecialty[0].name : ''
        });
        console.log(arrSpecialty)
        //
    }
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    //fire redux event: actions
  };
  returnHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  handleViewCategory = () => {
    if (this.props.history) {
      this.props.history.push(`/home-category`);
    }
  };
  handleAllInforDoctor = () => {
    if (this.props.history) {
      this.props.history.push(`/alldoctor`);
    }
  };
  handleAllInforClinic = () => {
    if (this.props.history) {
      this.props.history.push(`/all-clinic`);
    }
  };
  handleAllInforSpecialty = () => {
    if (this.props.history) {
      this.props.history.push(`/all-specialty`);
    }
  };

  handleChange = async(e) => {
    // call api search
    const value = e.target.value;
    if (value) {
      this.setState({
        dataSource: items.data.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      });
    }else{
      this.setState({
        dataSource: []
      });
    }
  };
  handleSelectedChange = (itemSelected) =>{
    if (this.props.history)
    {
        this.props.history.push(`/detail-specialty/${itemSelected.id}`);
    }
    // call api
  }
  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left">
              <div className="left-content">
                <div className="left-content-child">
                  <i className="fas solid fa-bars"></i>
                  <div
                    className="image logo-home"
                    onClick={() => this.returnHome()}
                  ></div>
                </div>
              </div>
              <ul className="center-content">
                <li className="home-children">
                  <div>
                    <b onClick={() => this.handleAllInforSpecialty()}>
                      <FormattedMessage id="home-header.specialty" />
                    </b>
                  </div>
                  <div
                    className="subs-title"
                    onClick={() => this.handleAllInforSpecialty()}
                  >
                    <FormattedMessage id="home-header.infor" />
                  </div>
                </li>
                <li className="home-children">
                  <div>
                    <b onClick={() => this.handleAllInforClinic()}>
                      <FormattedMessage id="home-header.hospital" />
                    </b>
                  </div>
                  <div
                    className="subs-title"
                    onClick={() => this.handleAllInforClinic()}
                  >
                    <FormattedMessage id="home-header.choose-hospital" />
                  </div>
                </li>
                <li className="home-children">
                  <div>
                    <b onClick={() => this.handleAllInforDoctor()}>
                      <FormattedMessage id="home-header.doctor" />
                    </b>
                  </div>
                  <div
                    className="subs-title"
                    onClick={() => this.handleAllInforDoctor()}
                  >
                    <FormattedMessage id="home-header.choose-doctor" />
                  </div>
                </li>
                <li className="home-children">
                  <div>
                    <b onClick={() => this.handleViewCategory()}>
                      <FormattedMessage id="home-header.medical" />
                    </b>
                  </div>
                  <div
                    className="subs-title"
                    onClick={() => this.handleViewCategory()}
                  >
                    <FormattedMessage id="home-header.choose-medical" />
                  </div>
                </li>
              </ul>
            </div>
            <div className="right-content">
              <div className="help-home">
                <i className="fas fa-question-circle"></i>
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="banner-up">
              <div className="tile-text1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="tile-text2">
                <b>
                  <FormattedMessage id="banner.title2" />
                </b>
              </div>

              <div
                style={{
                  width: "500px",
                  position: "absolute",
                  top: "40%",
                  left: "55%",
                  transform: "translate(-60%, 0%)"
                }}
              >
                <Suggestion
                  getDisplayName={(item) => item}
                  items={this.state.dataSource}
                  onSelectedItem={(item) => this.handleSelectedChange(item)} // event khi select trong list 
                >
                  {({
                    getInputProps,
                    getListItemProps,
                    getItemProps,
                    inputValue,
                    selectedItem,
                    highlightedIndex,
                    items,
                    isOpen,
                    clearInputValue
                  }) => (
                    <div>
                      <div className="search">
                        <i className="fas fa-search"></i>
                        <input
                          {...getInputProps({
                            placeholder: "Tìm kiếm chuyên khoa",
                            onChange: this.handleChange /// call api ở đây trong function này
                          })}
                        />
                      </div>
                      {/* <br /> */}
                      {isOpen && (
                        <div {...getListItemProps()}>
                          {items.map((item, index) => (
                            <div
                              {...getItemProps({ item, index })}
                              key={item.id}
                              style={{
                                backgroundColor:
                                  highlightedIndex === index
                                    ? "rgb(232, 232, 232)"
                                    : "white",
                                fontWeight:
                                  selectedItem && selectedItem.id === item.id
                                    ? "bold"
                                    : "normal"
                              }}
                            >
                              {item.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </Suggestion>
              </div>
            </div>
            <div className="banner-down">
              <div className="options">
                <div className="options-specialist">
                  <div className="icon-child">
                    <i className="fas fa-hospital-alt"></i>
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.specialty" />
                    </b>
                  </div>
                </div>
                <div className="options-specialist">
                  <div className="icon-child">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.faraway" />
                    </b>
                  </div>
                </div>
                <div className="options-specialist">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.generality" />
                    </b>
                  </div>
                </div>
                <div className="options-specialist">
                  <div className="icon-child">
                    <i className="fas fa-flask"></i>
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.test" />
                    </b>
                  </div>
                </div>
                <div className="options-specialist">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.nerve" />
                    </b>
                  </div>
                </div>
                <div className="options-specialist">
                  <div className="icon-child">
                    <i className="fas fa-stethoscope"></i>
                  </div>
                  <div className="text-child">
                    <b>
                      <FormattedMessage id="banner.dental" />
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    UserInfo: state.user.UserInfo,
    language: state.app.language,
    allInforSpecialtyRedux: state.admin.allInforSpecialty

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    fetchInforSpecialty: () => dispatch(actions.fetchInforSpecialty())

  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
