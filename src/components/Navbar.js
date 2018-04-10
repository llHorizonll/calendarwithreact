import React from 'react';
import { Layout, Input, Icon, Avatar } from 'antd';
const { Header } = Layout;
const Navbar = ({ collapsed, toggle, search, searchvalue, btnsearch, togglesearch }) => {
  const suffix = searchvalue ? <Icon type="close-circle" onClick={search} /> : null;
  return (
    <Header
      className="header"
      style={{
        padding: 0,
        width: '100%',
        borderBottom: '1px solid #ddd',
        boxShadow: '0px 2px 2px 0px #ddd'
      }}>
      <div className="button" onClick={toggle}>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
        />
      </div>
      <div className="rightWarpper">
        {btnsearch ?
          <div style={{ marginTop: '-9px' }}>
            <Input
              placeholder="Search"
              suffix={suffix}
              value={searchvalue}
              onChange={search}
              style={{ width: 500 }}
            />
          </div> : ''}
        {!btnsearch ?
          <div className="button" onClick={togglesearch}>
            <Icon type="search" />
          </div> :
          <div className="button" onClick={togglesearch}>
            <Icon type="arrow-left" />
          </div>
        }
        <div className="button">
          <Icon className="trigger" type="setting" />
        </div>
        <div className="button" style={{ lineHeight: '38px' }}>
          <Avatar icon="user" />
        </div>
      </div>
    </Header >
  )
}

export default Navbar;

// class Navbar extends Component {
//   render() {
//     return (
//       <Header
//         className="header"
//         style={{
//           padding: 0,
//           width: '100%',
//           borderBottom: '1px solid #ddd',
//           boxShadow: '0px 2px 2px 0px #ddd'
//         }}>
//         <div className="button">
//           <Icon className="trigger" type="menu-unfold" />
//         </div>
//         <div className="rightWarpper">
//           <div className="button">
//             <Icon className="trigger" type="setting" />
//           </div>
//         </div>
//       </Header>
//     )
//   }
// }

// export default Navbar