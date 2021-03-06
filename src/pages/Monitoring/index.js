import { Button, Spin, Row, Col, Input, Select } from 'antd'
import React, { memo, useEffect, useReducer } from 'react'
import reducer from './reducer'
import { socketUrl } from '@/network/config'
import { MonitoringWrapper, ParamsWrapper } from './style'

const { Option } = Select;
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
  const handleRongheChange = (value) => {

  }
  const handleColorChange = () => {

  }
  
  return (
    <MonitoringWrapper>
      <div className="tip">
        <span className="title">以下为热成像设备实时输出视频流内容，可能会存在延迟...</span>
        <Button type="primary" onClick={connect} disabled={state.isConnect}>手动重连</Button>
      </div>
      {
        state.isConnect ? 
        <h3>Socket服务已上线，正在持续检测视频流变化...</h3>
         : 
        <h3>*抱歉，检测到Socket服务未上线，暂时无法获取视频内容</h3>
      }
      {/* //state.spin */}
      <Spin size="large" tip="连接中..." spinning={state.spin}>  
        <div className="videoBox">
          <img src={state.url} alt="资源请求中,请等待..."/>
        </div>
        <ParamsWrapper>
          <div className="data">
            <div className="data-row">
              <div>温度单位</div>
              <div>℃</div>
            </div>
            <div className="data-row">
              <div>中心温度</div>
              <div>30</div>
            </div>
            <div className="data-row">
              <div>最大温度</div>
              <div>30</div>
            </div>
            <div className="data-row">
              <div>最小温度</div>
              <div>30</div>
            </div>
            <div className="data-row">
              <div>平均温度</div>
              <div>30</div>
            </div>
          </div>
          <Row className="config">
            <Col span={10}>
              <Row className="row" justify="start">高温警报</Row>
              <Row className="row" justify="start">高温阈值</Row>
              <Row className="row" justify="start">融合比</Row>
              <Row className="row" justify="start">调色板</Row>
              <Row className="row" justify="start">发射率</Row>
              <Row className="row" justify="start">LED补光</Row>
            </Col>
            <Col span={14}>
              <Row className="row">
                <div className="warning"></div>
              </Row>
              <Row className="row" align="center">
                <Col span={14}>
                  <Input className="warningValue"/>
                </Col>
                <Col span={10}>
                  <Button className="warningValueBtn">Set</Button>
                </Col>
              </Row>
              <Row className="row">
                <Select defaultValue="0.75" className="rongheSelect" onChange={handleRongheChange}>
                  <Option value="0.70">0.70</Option>
                  <Option value="0.75">0.80</Option>
                  <Option value="0.85">0.85</Option>
                </Select>
              </Row>
              <Row className="row">
                <Select defaultValue="橙红色" className="colorSelect" onChange={handleColorChange}>
                  <Option value="橙">橙黑色</Option>
                  <Option value="橙红">橙紫色</Option>
                  <Option value="橙红色">橙绿色</Option>
                </Select>
              </Row>
              <Row className="row">
                <Col span={13}><Input className="rateValue"/></Col>
                <Col span={10}><Button className="rateValueBtn">Set</Button></Col>
              </Row>
              <Row className="rowLast"><Button className="LED">开启</Button></Row>
            </Col>
          </Row>
          <div className="bottomBtn">
            <Button className="btn">开始采集</Button>
          </div>
        </ParamsWrapper>
      </Spin>
    </MonitoringWrapper>
  )
})
