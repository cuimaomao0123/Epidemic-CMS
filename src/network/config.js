// const devBaseURL = "http://114.55.53.71:8090/";
const devBaseURL = "http://31r4596a06.zicp.vip/"

const proBaseURL = "http://114.55.53.71:8090/";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;
export const socketUrl = 'ws://31r4596a06.zicp.vip/websocket/10';

export const TIMEOUT = 8000;
 