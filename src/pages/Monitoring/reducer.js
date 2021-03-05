export default function reducer(state, action) {
  switch(action.type) {
    case "open_connect":
      return {...state, isConnect: action.payload};
    case "get_url":
      return {...state, url: action.payload};
    case "change_spin":
      return {...state, spin: action.payload};
    default:
      return state;
  }
}
