import localforage from 'localforage';
import eventdata from '../assets/events.json';

export const eventService = {
  get,
  searchevent,
  update,
};

function search(nameKey, myArray) {
  if (myArray.title.toString().toLowerCase().search(nameKey.toString().toLowerCase()) !== -1) {
    return myArray;
  } else {
    return;
  }
}

function searchevent(s) {
  return localforage.getItem('events')
    .then(res => {
      return res.filter((item) => {
        return item.events = (item.events).filter(subitem => {
          return search(s, subitem)
        })
      })
    })
}

function update(data) {
  return localforage.getItem('events')
    .then(res => {
      if (!res) {
        return localforage.setItem('events', eventdata)
          .then(output => {
            return output;
          });
      }
      if (res && res.length > 0) {
        if (data) {
          return localforage.setItem('events', data)
            .then(output => {
              return output;
            });
        }
        return res;
      }
    })
}

function get() {
  return localforage.getItem('events')
    .then(res => {
      if (!res) {
        console.log('data not found')
        return localforage.setItem('events', eventdata)
          .then(output => {
            return output;
          });
      }
      return res;
    })
}


