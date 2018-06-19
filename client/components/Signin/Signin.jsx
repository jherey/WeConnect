import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signinUser } from '../../actions/userActions';
import SigninForm from './SigninForm.jsx';
import loading from '../../actions/loading';
import addFlashMessage from '../../actions/flashMessages';

/**
 * @description Signin component
 * @export {Object}
 * @class  Signin
 * @extends {Component}
 */
class Signin extends Component {
  /**
* @description Checks loading state
* @param {any} props
* @returns {null} null
*/
  componentWillMount() {
    this.props.loading(false);
  }

  /**
   * @memberof Signin
   * @return {ReactElement} markup
   */
  render() {
    return (
			<div>
				<SigninForm
					loading={this.props.loading}
					signinUser={this.props.signinUser}
					addFlashMessage={this.props.addFlashMessage}
					isLoading={this.props.isLoading}
				/>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading
});

Signin.propTypes = {
  loading: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  currentBusiness: PropTypes.object,
  signinUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { signinUser, addFlashMessage, loading })(Signin);
