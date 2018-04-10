import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, Avatar } from 'antd';
import './register.css';
const FormItem = Form.Item;

const Register = Form.create()(class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      rduser: []
    }
  }
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const handleSubmit = () => {
      this.setState({ redirectToReferrer: true })
    }
    const { from } = this.props.location.state || { from: { pathname: '/login' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className="form-register">
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
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox>I have read the <a href="">agreement</a></Checkbox>
            )}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Register
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
);

export default Register;
