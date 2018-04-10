import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, Avatar } from 'antd';
import './login.css';
const FormItem = Form.Item;

const Login = Form.create()(class extends Component {
  state = {
    redirectToReferrer: false
  }
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const handleSubmit = (e) => {
      // e.preventDefault();
      // this.props.form.validateFieldsAndScroll((err, values) => {
      //   if (!err) {
      //     console.log('Received values of form: ', values);
      //   }
      // });
      localStorage.setItem('Accept-Token', 'xxx')
      this.setState({ redirectToReferrer: true })
    }
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className="form-login">
        <Avatar size="large" icon="user" style={{ margin: '0 0 20px 41%' }} />
        <Form onSubmit={handleSubmit}>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link to="/register">Register</Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}
);

export default Login;
