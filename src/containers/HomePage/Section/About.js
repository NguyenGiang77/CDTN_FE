import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {
       // let settings = this.props.settings
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                <FormattedMessage id ="manage-about.title"></FormattedMessage>
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        {/* <iframe width="100%" height="400px"
                            src="https://docs.google.com/presentation/d/1m2-hJtQHdP1IRV0DKiVzddAnqD0IaQKw/edit?usp=sharing&ouid=117391839531827819778&rtpof=true&sd=true"
                            title="#Truyền thông nói gì về YourHeart"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe> */}

                    </div>
                    <div className='content-right'>
                        <p><FormattedMessage id ="manage-about.about"></FormattedMessage></p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
