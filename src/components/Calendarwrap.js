import React, { Component } from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import { Button } from 'antd';
import Modalbody from './Modalbody';
import moment from 'moment';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Add Event',
      oktext: 'Create',
      visible: false,
      confirmLoading: false,
      startdate: moment(),
      enddate: moment(),
      event: '',
    }
  }

  render() {
    const showModalselect = (s, e) => {
      if (s && e) {
        this.setState({
          visible: true,
          startdate: s,
          enddate: e.subtract(1, 'days'),
          event: '',
          title: 'Add Event',
          oktext: 'Create',
        });
      } else {
        this.setState({
          visible: true,
          event: '',
          startdate: moment(),
          enddate: moment(),
          title: 'Add Event',
          oktext: 'Create',
        });
      }
    }

    const showModalevent = (event) => {
      console.log('event', event.end)
      this.setState({
        visible: true,
        title: "Update Event",
        oktext: "Update",
        event: event,
        startdate: event.start,
        enddate: (event.end) ? event.end.subtract(1, 'days') : event.start
      });
    }

    const testProps = {
      eventSources: this.props.data,
      selectable: true,
      select: function (start, end) {
        showModalselect(start, end)
      },
      eventClick: function (event) {
        showModalevent(event)
      },
      eventRender: function (event, element) {
        if (event.title === '') {
          element.find('.fc-title').append('(No title)');
        }
      }
      // locale: 'th'
    }

    const handleCreate = () => {
      this.setState({
        confirmLoading: true,
      });
      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        (this.state.oktext === 'Create') ? this.props.addEvent(values) : this.props.updateEvent(this.state.event, values)
        form.resetFields();
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 1000);
      });
    }

    const handleCancel = () => {
      console.log('Clicked cancel button');
      this.setState({
        visible: false,
      });
    }

    const saveFormRef = (formRef) => {
      this.formRef = formRef;
    }

    const modalProps = {
      confirmLoading: this.state.confirmLoading,
      title: this.state.title,
      oktext: this.state.oktext,
      visible: this.state.visible,
      onCancel: handleCancel,
      onCreate: handleCreate,
      startDate: this.state.startdate,
      endDate: this.state.enddate,
      event: this.state.event,
    }

    return (
      <div id="example-component" >
        <FullCalendar
          id="example-component"
          header={this.props.fullcalendarprop.header}
          defaultView={this.props.fullcalendarprop.defaultView}
          {...testProps}
          navLinks={true} // can click day/week names to navigate views
          editable={false}
          eventLimit={true} // allow "more" link when too many events
          contentHeight={800} />
        <Button onClick={showModalselect}
          className="fab-button"
          type="primary" shape="circle" icon="plus" size="large" />
        <Modalbody
          wrappedComponentRef={saveFormRef}
          {...modalProps}
        />
      </div >
    );
  }
}

