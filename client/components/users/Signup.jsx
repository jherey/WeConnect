import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignupForm from '../forms/SignupForm.jsx';
import { signupUser, imageUpload } from '../../actions/userActions';

/**
 * @description Signin component
 * @export {Object}
 * @class  Signup
 * @extends {Component}
 */
class Signup extends Component {
  /**
* @description Creates an instance of signup form
* @param {object} props
* @memberof Signup
*/
  constructor() {
    super();
    // Initial state
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      sex: '',
      email: '',
      profilepic: '',
      password: '',
      confirmPassword: '',
      errors: [],
      uploading: false
    };
    // Bind functions
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof Signup
*/
  onChange(event) {
    // Sets state of input fields to inputed values
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @return {null} null
   * @param {object} nextProps
   * @memberof Signup
   */
  componentWillReceiveProps(nextProps) {
    const { imageUrl } = nextProps.authUser;
    if (imageUrl) {
      // Set state of profilepic to uploaded image url
      this.setState({ profilepic: imageUrl });
    }
  }

  /**
* @returns {null} null
* @param {event} event
* @memberof Signup
*/
  uploadImage(event) {
    this.setState({ profilepic: '', uploading: true });
    const image = event.target.files[0];
    // Action to upload an image
    this.props.imageUpload(image).then(() => {
      // Sets state of uploading to false after uploading image
      this.setState({ uploading: false });
    });
  }

  /**
 * @description submits form
 * @param {event} event
 * @returns {null} null
 * @memberof SigninForm
 */
  onSubmit(event) {
    event.preventDefault();
    // Action to signup a user
    this.props.signupUser(this.state, this.props);
  }

  /**
   * @memberof Signup
   * @return {ReactElement} markup
   */
  render() {
    return (
			<div>
        {/* Render signup form */}
				<SignupForm
          authUser={this.props.authUser}
          uploadImage={this.uploadImage}
          formDetails={this.state}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
				/>
			</div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.authUser
});

Signup.contextTypes = {
  router: PropTypes.object.isRequired
};

Signup.propTypes = {
  authUser: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func,
  imageUpload: PropTypes.func
};

export default connect(mapStateToProps, { signupUser, imageUpload })(Signup);