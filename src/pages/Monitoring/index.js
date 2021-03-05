import { Button, message, Spin } from 'antd'
import React, { memo, useEffect, useReducer } from 'react'
import reducer from './reducer'
import { socketUrl } from '@/network/config'
import { MonitoringWrapper } from './style'

export default memo(function Monitoring() {
  const [state, dispatch] = useReducer(reducer, {
    url: "",
    isConnect: false,
    spin: true,
    ws: new WebSocket(socketUrl)
  })
  useEffect(() => {               
    connect();
    return () => {
      state.ws.close();           //组件销毁，关闭连接
    }                                   //eslint-disable-next-line
  },[])

  const connect = () => {
    const ws = state.ws
    dispatch({type: 'change_spin', payload: true});
    ws.onopen = () => {
      console.log("socket已连接")
      dispatch({type: 'open_connect', payload: true});
      dispatch({type: 'change_spin', payload: false});
    }
    ws.onmessage = (msg) => {
      let url = msg.data;
      dispatch({type: 'get_url', payload: url});
      if(state.span){
        dispatch({type: 'change_spin', payload: false});
      }
    }
    ws.onclose = () => {
      console.log('服务端主动关闭')
      dispatch({type: 'open_connect', payload: false});
    }
  }
  const close = () => {
    const { ws, isConnect } = state;
    if(isConnect){
      ws.close();
      dispatch({type: 'open_connect', payload: false});
      message.warning('Socket连接已关闭！')
    }else{
      message.warning('当前Socket正处于未连接状态，无需关闭连接！')
    }
  }
  return (
    <MonitoringWrapper maxPosX={50} maxPosY={50} minPosX={100} minPosY={100}>
      <div className="tip">
        <span className="title">以下为热成像设备实时输出视频流内容，可能会存在延迟...</span>
        <Button type="primary" onClick={connect} disabled={state.isConnect}>手动重连</Button>
        <Button onClick={close} type="primary" danger style={{marginLeft: '5px'}}>关闭连接</Button>
      </div>
      {
        state.isConnect ? 
        <h3>Socket服务已上线，正在持续检测视频流变化...</h3>
         : 
        <h3>*抱歉，检测到Socket服务未上线，暂时无法获取视频内容</h3>
      }
      
        <Spin size="large" tip="连接中..." spinning={state.spin}>
          <div className="videoBox">
            <img src={state.url} alt="资源请求中,请等待..."/>
          </div>
        </Spin>
        
    </MonitoringWrapper>
  )
})
