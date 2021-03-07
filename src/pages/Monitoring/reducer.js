export default function reducer(state, action) {
  switch(action.type) {
    case "open_connect":
      return {...state, isConnect: action.payload};
    case "change_url":
      return {...state, url: action.payload};
    case "change_average":
      return {...state, average: action.payload};
    case "change_center":
      return {...state, center: action.payload};
    case "change_max":
      return {...state, max: action.payload};
    case "change_min":
      return {...state, min: action.payload};
    case "change_spin":
      return {...state, spin: action.payload};
    case "change_template_value":
      return {...state, templateValue: action.payload};
    case "change_ws":
      return {...state, ws: action.payload};
    case "change_rate_value":
      return {...state, rateValue: action.payload};
    case "change_LED_state":
      return {...state, LEDstate: action.payload};
    case "change_color_value":
      return {...state, color: action.payload};
    case "change_device_status":
      return {...state, deviceStatus: action.payload};
    default:
      return state;
  }
}
