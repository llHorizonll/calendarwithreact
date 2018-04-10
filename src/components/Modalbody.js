import React, { Component } from 'react';
import { Form, DatePicker, Input, Modal } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const Modalbody = Form.create()(class extends Component {
  render() {
    const { visible, onCancel, onCreate, title, oktext, confirmLoading, startDate, endDate, event, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Modal title={title}
        width={800}
        visible={visible}
        confirmLoading={confirmLoading}
        okText={oktext}
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form>
          <FormItem {...formItemLayout} label="Event">
            {getFieldDecorator('title', {
              initialValue: event.title
            })(
              <Input placeholder="Add Event Name" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="StartDate">
            {getFieldDecorator('startdate', {
              initialValue: startDate,
              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            })(
              <DatePicker />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="EndDate">
            {getFieldDecorator('enddate', {
              initialValue: endDate,
              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            })(
              <DatePicker />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Description">
            {getFieldDecorator('description', {
              initialValue: event.description
            })(
              <TextArea rows={4} />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
);

export default Modalbody;
