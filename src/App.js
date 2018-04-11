import React, { Component } from 'react';
import './App.css';
//import Calendar from './calendar';
import List from './components/List';
import Navbar from './components/Navbar';
import Calendar from './components/Calendarwrap';
import './fullcalendar.css';
//import eventdata from './assets/event.json';
import { Layout } from 'antd';
import { eventService } from './services/events.service';
import { userService } from './services/users.service';
const { Content, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: {
        defaultView: 'month',
        header: {
          left: 'prev,next',
          center: 'title',
          right: 'month,basicWeek,basicDay'
        },
      },
      btnsearch: false,
      collapsed: false,
      displayColorPicker: false,
      searchvalue: '',
      data: '',
      datasearch: '',
      datatemp: '',
      userlist: '',
      user: JSON.parse(localStorage.getItem('user')), //add event of test1
      maincolor: 'blue'
    }
  }

  componentDidMount() {
    eventService.get().then(res => {
      this.setState({
        data: res,
        datasearch: res,
        datatemp: res.slice(),
      })
    })
    userService.get().then(res => {
      this.setState({
        userlist: res,
      })
    })
  }

  toggleNavmenu = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  toggleBtnsearch = () => {
    this.setState({
      btnsearch: !this.state.btnsearch,
    });
    if (this.state.btnsearch) {
      this.setState({
        calendar: {
          defaultView: 'month',
          header: {
            left: 'prev,next',
            center: 'title',
            right: 'month,basicWeek,basicDay'
          },
        },
        searchvalue: ''
      });
      eventService.update().then(res => {
        this.setState({
          data: res.filter(item => (item.show) ? item : ''),
          datasearch: res,
        })
      })
    }
  }

  searchevent = (e) => {
    if (!e.target.value) {
      e.target.value = ''
    }
    eventService.searchevent(e.target.value).then(res => {
      this.setState({
        data: res.filter(item => (item.show) ? item : ''),
        datasearch: res,
      })
    })
    this.setState({
      calendar: {
        defaultView: 'listMonth',
        header: {
          left: 'title',
          center: '',
          right: 'prev,next'
        },
      },
      searchvalue: e.target.value
    })
    if (e.target.value === '') {
      this.setState({
        calendar: {
          defaultView: 'month',
          header: {
            left: 'prev,next',
            center: 'title',
            right: 'month,basicWeek,basicDay'
          },
        },
        searchvalue: e.target.value
      })
      eventService.get().then(res => {
        this.setState({
          data: res.filter(item => (item.show) ? item : ''),
          datasearch: res,
        })
      })
    }
  }

  handleCheckbox(name, value) {
    this.setState({
      userlist: this.state.userlist.filter((item) => {
        if (item.name === name) {
          item.show = value;
        }
        return item
      }),
      datasearch: this.state.datasearch.filter((item) => {
        if (item.name === name) {
          item.show = value;
        }
        return item
      }),
      data: this.state.datasearch.filter(item => (item.show) ? item : ''),
    });
  }

  addEvent({ title = '', startdate = '', enddate = '', description = '' }) {
    let newevent = {
      id: 0,
      title: title,
      start: startdate.format('YYYY-MM-DD'),
      end: (enddate.add(1, 'days')).format('YYYY-MM-DD'),
      description: description
    }
    let newdata = this.state.data.filter(item => {
      if (item.name === this.state.user.username) {
        item.color = this.state.user.color;
        newevent.id = item.events.length + 1;
        item.events.push(newevent)
      }
      return item;
    });
    eventService.update(newdata).then(res => {
      this.setState({
        data: res,
      })
    })
  }

  updateEvent(event, newevent) {
    event.title = newevent.title
    event.start = newevent.startdate.format('YYYY-MM-DD')
    event.end = (newevent.enddate.add(1, 'days')).format('YYYY-MM-DD')
    event.description = newevent.description
    let newdata = this.state.data.filter(item => {
      if (item.name === event.source.name) {
        item.events = event.source.events
      }
      return item;
    });
    eventService.update(newdata).then(res => {
      this.setState({
        data: res,
      })
    })
  }

  deleteEvent(event) {
    let newdata = this.state.data.filter((item) => {
      if (item.name === event.source.name) {
        return item.events = (item.events).filter(subitem => subitem.id !== event.id)
      }
      return item;
    });
    eventService.update(newdata).then(res => {
      this.setState({
        data: res,
      })
    })
  }

  toggleOpencolor = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  toggleClosecolor = () => {
    this.setState({ displayColorPicker: false })
  }

  toggleChangecolor = (color) => {
    this.setState({
      maincolor: color.hex
    })
  
    let newdata = this.state.data.filter(item => {
      if (item.name === this.state.user.username) {
        item.color = color.hex
      }
      return item;
    });

    eventService.update(newdata).then(res => {
      this.setState({
        data: res,
      })
    })

    let newdatauser = this.state.userlist.filter(item => {
      if (item.name === this.state.user.username) {
        item.color = color.hex
        localStorage.setItem('user', JSON.stringify(item))
      }
      return item;
    });

    userService.update(newdatauser).then(res => {
      this.setState({
        userlist: res,
        user: JSON.parse(localStorage.getItem('user')),
      })
    })
  }

  render() {
    const navbarProps = {
      maincolor: this.state.maincolor,
      displayColorPicker: this.state.displayColorPicker,
      opencolor: this.toggleOpencolor.bind(this),
      closecolor: this.toggleClosecolor.bind(this),
      changecolor: this.toggleChangecolor.bind(this),
      collapsed: this.state.collapsed,
      toggle: this.toggleNavmenu.bind(this),
      search: this.searchevent.bind(this),
      togglesearch: this.toggleBtnsearch.bind(this),
      btnsearch: this.state.btnsearch,
      searchvalue: this.state.searchvalue,
      user: this.state.user,
    }
    const siderProps = {
      width: 200,
      trigger: null,
      collapsedWidth: 0,
      collapsible: true,
      collapsed: this.state.collapsed,
    }
    const calendarProps = {
      data: this.state.data,
      updateEvent: this.updateEvent.bind(this),
      addEvent: this.addEvent.bind(this),
      deleteEvent: this.deleteEvent.bind(this),
      fullcalendarprop: this.state.calendar,
      user: this.state.user,
    }
    return (
      <div className="App">
        <Layout>
          <Navbar {...navbarProps} />
          <Layout>
            <Sider
              style={{ background: '#fff', borderRight: '1px solid #ddd', boxShadow: '2px 0px 2px #ddd' }}
              {...siderProps}
            >
              <List data={this.state.userlist} user={this.state.user} click={this.handleCheckbox.bind(this)} />
            </Sider>
            <Layout>
              <Content style={{ background: '#fff', padding: 20, margin: 0, }}>
                <Calendar {...calendarProps} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
