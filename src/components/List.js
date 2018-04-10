import React from 'react';
import { Avatar, Checkbox } from 'antd';

const List = ({ data, click }) => {

  // const handleChange = (event) => {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;
  //   click(name, value);
  // }

  const handleChange2 = (name, value) => {
    value = !value
    click(name, value);
  }
  const getList = (data = []) => {
    if (data.length > 0) {
      return data.map((item, index) => {
        return (
          // <List style={{ border: 'unset' }}
          //   itemLayout="horizontal"
          //   dataSource={data}
          //   renderItem={item => (
          //     <List.Item actions={[
          //       <Checkbox name={item.name} checked={item.show} onChange={handleChange} style={{ color: item.color }}>
          //       </Checkbox>
          //     ]}>
          //       <List.Item.Meta
          //         avatar={<Avatar icon="user" />}
          //         title={<span>{item.name}</span>}
          //       />
          //     </List.Item>
          //   )}
          // />
          <div key={index} style={{ color: item.color, cursor: 'pointer' }} className="list-user" onClick={() => handleChange2(item.name, item.show)}>
            <Checkbox name={item.name} checked={item.show}
              //onChange={handleChange}
              style={{ color: item.color }}>
            </Checkbox>
            <div className="list-item">
              <Avatar icon="user" />
              <span className="list-title">{item.name}</span>
            </div>
          </div>
        )
      })
    }
  }

  const listItems = getList(data)

  return (
    <div style={{ padding: '20px' }}>
      {listItems}
    </div>
  )
}

export default List;