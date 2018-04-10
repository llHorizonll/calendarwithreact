import React, { Component } from 'react';
import './App.css';
//import Calendar from './calendar';
import List from './components/List';
import Navbar from './components/Navbar';
import Calendar from './components/Calendarwrap';
import './fullcalendar.css';
import eventdata from './assets/event.json';
import { Layout } from 'antd';
import { service } from './services/events.service';
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
      searchvalue: '',
      data: '',
      datasearch: '',
      datatemp: '',
      user: 'test1' //add event of test1
    }
  }
  componentDidMount() {
    service.get().then(res => {
      this.setState({
        data: res,
        datasearch: res,
        datatemp: res.slice(),
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
      service.update().then(res => {
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
    service.searchevent(e.target.value).then(res => {
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
      service.get().then(res => {
        this.setState({
          data: res.filter(item => (item.show) ? item : ''),
          datasearch: res,
        })
      })
    }
  }

  handleClick(name, value) {
    // let newdata = eventdata.map(a => ({ ...a }))
    this.setState({
      datatemp: this.state.datatemp.filter((item) => {
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
      title: title,
      start: startdate.format('YYYY-MM-DD'),
      end: (enddate.add(1, 'days')).format('YYYY-MM-DD'),
      description: description
    }
    let x = eventdata.map(a => ({ ...a }))
    let newdata = x.filter(item => {
      if (item.name === this.state.user) {
        item.events.push(newevent)
      }
      return item;
    });
    service.update(newdata).then(res => {
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

    let newdata = eventdata.filter(item => {
      if (item.name === event.source.name) {
        item.events = event.source.events
      }
      return item;
    });
    service.update(newdata).then(res => {
      this.setState({
        data: res,
      })
    })
  }

  render() {
    const navbarProps = {
      collapsed: this.state.collapsed,
      toggle: this.toggleNavmenu.bind(this),
      search: this.searchevent.bind(this),
      togglesearch: this.toggleBtnsearch.bind(this),
      btnsearch: this.state.btnsearch,
      searchvalue: this.state.searchvalue
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
      fullcalendarprop: this.state.calendar
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
              <List data={this.state.datatemp} click={this.handleClick.bind(this)} />
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
