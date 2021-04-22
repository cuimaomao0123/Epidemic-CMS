import request from '@/network/request2'

export const openDevice = (config) => {
    return request({
        url: '/picture/saveAllPicture',
        method: 'POST',
        data: config
    });
}

export const tempValue = (config) => {
    return request({
        url: '/client/set_tempValue',
        method: 'GET',
        params: config
    });
}

export const rongheValue = (config) => {
    return request({
        url: '/client/set_fusionThan',
        method: 'GET',
        params: config
    });
}

export const colorValue = (config) => {
    return request({
        url: '/client/set_pallet',
        method: 'GET',
        params: config
    });
}
export const rateValue = (config) => {
    return request({
        url: '/client/set_emissivity',
        method: 'GET',
        params: config
    });
}
export const LED = (config) => {
    return request({
        url: '/client/set_led',
        method: 'GET',
        params: config
    });
}
export const getDeviceStatus = (config) => {
    return request({
        url: '/client/getState',
        method: 'GET',
        params: config
    });
}
export const collect = (config) => {
    return request({
        url: '/client/close_open',
        method: 'GET',
        params: config
    });
}

export const getInitParama = () => {
    return request({
        url: '/client/getAll',
        method: 'GET'
    });
}


