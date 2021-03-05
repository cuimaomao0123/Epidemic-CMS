const devBaseURL = "http://114.55.53.71:8090/";
// const devBaseURL = "http://bolw2eu9.dongtaiyuming.net/"

const proBaseURL = "http://114.55.53.71:8090/";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;
export const socketUrl = 'ws://bolw2eu9.dongtaiyuming.net/websocket/10';

export const TIMEOUT = 8000;
 