export const getUsers = ( state = [], action) => {
  switch (action.typega) {
    case 'START_GET_USERS':
      return action;
   case 'COMPLETE_GET_USERS':
      return action;
   case 'ERRORE_GET_USERS':
      return action;
    default:
      return state;
  }
}