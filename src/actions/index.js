import http from './htpp';

//getUserss
const startGetUsers = () => { return { type: 'START_GET_USERS', ready: false }}
const complateGetUsers = (data) => { return { type: 'COMPLETE_GET_USERS', data }}
const errorGetUsers = (err) => { return { type: 'ERROR_GET_USERS', err }}

export const getUsers = () => {

  return (dipatch, getState) =>{
    dipatch(startGetUsers());
    http.get('users/')
      .then((response) =>{
        if(response.data)
        dipatch(complateGetUsers(response.data));
      })
      .catch((err) => {
        dipatch(errorGetUsers(err));
      })
   
  }
}