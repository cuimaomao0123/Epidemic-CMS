import { Button, Spin, Row, Col, Input, Select, message } from 'antd'
import React, { memo, useEffect, useReducer } from 'react'
import reducer from './reducer'
import { socketUrl } from '@/network/config'
import { tempValue, 
          openDevice, 
          rongheValue,
          colorValue,
          rateValue,
          LED,
          getDeviceStatus,
          collect } from '@/services/monitoring'
import b1 from '@/assets/images/1.jpg'
import b2 from '@/assets/images/2.jpg'
import b3 from '@/assets/images/3.jpg'
import b4 from '@/assets/images/4.jpg'
import b5 from '@/assets/images/5.jpg'
import { MonitoringWrapper, ParamsWrapper, ImageWrapper, Params2Wrapper } from './style'

const { Option } = Select;
export default memo(function Monitoring() {
  const [state, dispatch] = useReducer(reducer, {
    url: "",
    average: '',
    center: '',
    max: '',
    min: '',
    isConnect: false,
    spin: false,
    ws: null,
    templateValue: 36.5,
    rateValue: 0.50,
    LEDstate: false,
    color: '01',
    deviceStatus: '',
    warning: false
  })
  useEffect(() => {    
    const ws = new WebSocket(socketUrl);
    dispatch({type: 'change_ws', payload: ws});
    getDeviceNowStatus()
    return () => {
      if(state.ws){
        state.ws.close();           //组件销毁，关闭连接
      }
      collect({facilityState: false});
}                                 //eslint-disable-next-line
  },[])
  useEffect(() => {
    connect();                    //eslint-disable-next-line
  },[state.ws])   
  useEffect(() => {
    if(state.max.length>0 && state.max >state.templateValue){
      dispatch({type: 'change_warning', payload: true});
    }else{
      dispatch({type: 'change_warning', payload: false});
    }
  },[state.max])                  
  const connect = () => {
    const ws = state.ws;
    if(ws !== null){
      openDevice();
      dispatch({type: 'change_spin', payload: true});
      ws.onopen = () => {
        console.log("socket已连接")
        dispatch({type: 'open_connect', payload: true});
        dispatch({type: 'change_spin', payload: false});
      }
      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data)
        const { base64, average, center, max, min } = data;
        dispatch({type: 'change_url', payload: base64});
        dispatch({type: 'change_average', payload: average});
        dispatch({type: 'change_center', payload: center});
        dispatch({type: 'change_max', payload: max});
        dispatch({type: 'change_min', payload: min});
        if(state.span){
          dispatch({type: 'change_spin', payload: false});
        }
      }
      ws.onclose = () => {
        console.log('服务端主动关闭')
        dispatch({type: 'open_connect', payload: false});
      }
    }
  }
  const templateValueChange = (value) => {
    let data = value.target.value;
    if(data.length <=0){
      data = 36.5;
    }
    dispatch({type: 'change_template_value', payload: data});
    
  }
  const setTemplateVlaue = async() => {
    const res = await tempValue({
      tempValue: state.templateValue
    });
    if(res.code ===200){
      message.success('高温阈值设置成功')
    }else{
      message.error(res.msg)
    }
  }
  const handleRongheChange = async(value) => {
    const res = await rongheValue({
      fusionThan: value
    });
    if(res.code ===200){
      message.success('融合比设置成功')
    }else{
      message.error(res.msg)
    }
  }
  const handleColorChange = async(value) => {
    dispatch({type: 'change_color_value', payload: value});
    const res = await colorValue({
      pallet: value
    });
    if(res.code ===200){
      message.success('调色板设置成功')
    }else{
      message.error(res.msg)
    }
  }
  const dealColorImage = () => {
    const value = state.color;
    switch(value){
      case '01': 
        return b1;
      case '02': 
        return b2;
      case '03': 
        return b3;
      case '04': 
        return b4;
      case '05': 
        return b5;
      default:
        return b1;
    }
  }
  const rateValueChange = (value) => {
    const res = value.target.value;
    if(Number(res) >=0.1 && Number(res) <=1){
      dispatch({type: 'change_rate_value', payload: res});
    }else{
      message.warning('注意融合比范围为0.10~1.00')
    }
  }
  const setRateValue = async() => {
    const res = await rateValue({
      emissivity: state.rateValue
    })
    if(res.code ===200){
      message.success('发射率设置成功')
    }else{
      message.error(res.msg)
    }
  }
  const LEDchange = async() => {
    let LEDValue = '01';
    if(state.LEDstate){
      LEDValue  = '00';
    }
    const res = await LED({
      led:LEDValue 
    })
    if(res.code ===200){
      if(state.LEDstate){
        dispatch({type: 'change_LED_state', payload: false});
        message.success('LED关闭成功')
      }else{
        dispatch({type: 'change_LED_state', payload: true});
        message.success('LED开启成功')
      }
    }else{
      message.error(res.msg)
    }
  }
  const getDeviceNowStatus = async() => {
    const res = await getDeviceStatus();
    dispatch({type: 'change_device_status', payload: res});
  }
  const collectChange = async() => {
    const res = await collect({
      facilityState: state.deviceStatus? false: true
    });
    if(res.code ===200){
      if(res.data){
        message.success('开始采集成功!')
      }else{
        message.success('关闭采集成功!')
      }
      dispatch({type: 'change_device_status', payload: res.data});
    }else{
      message.error(res.msg)
    }
  }
  return (
    <MonitoringWrapper>
      <div className="tip">
        <span className="title">以下为热成像设备实时输出视频流内容，可能会存在延迟...</span>
        {/* <Button type="primary" onClick={connect} disabled={state.isConnect}>手动重连</Button> */}
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
        <ImageWrapper>
          <img src={dealColorImage()} className="image"/>
        </ImageWrapper>
        <ParamsWrapper warning={state.warning}>
          <div className="data">
            <div className="data-row">
              <div>温度单位</div>
              <div>℃</div>
            </div>
            <div className="data-row">
              <div>中心温度</div>
              <div>{state.center}</div>
            </div>
            <div className="data-row">
              <div>最大温度</div>
              <div>{state.max}</div>
            </div>
            <div className="data-row">
              <div>最小温度</div>
              <div>{state.min}</div>
            </div>
            <div className="data-row">
              <div>平均温度</div>
              <div>{state.average}</div>
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
                  <Input className="warningValue" defaultValue="40.0" onChange={templateValueChange}/>
                </Col>
                <Col span={10}>
                  <Button className="warningValueBtn" onClick={setTemplateVlaue}>Set</Button>
                </Col>
              </Row>
              <Row className="row">
                <Select defaultValue="02" className="rongheSelect" onChange={handleRongheChange}>
                  <Option value="01">0.00</Option>
                  <Option value="02">0.25</Option>
                  <Option value="03">0.50</Option>
                  <Option value="04">0.75</Option>
                  <Option value="05">1.00</Option>
                </Select>
              </Row>
              <Row className="row">
                <Select defaultValue="01" className="colorSelect" onChange={handleColorChange}>
                  <Option value="01">墨绿色</Option>
                  <Option value="02">黑白色</Option>
                  <Option value="03">彩虹色</Option>
                  <Option value="04">海洋色</Option>
                  <Option value="05">铁红色</Option>
                </Select>
              </Row>
              <Row className="row">
                {/* 0.10 - 1.00 */}
                <Col span={13}><Input defaultValue="0.98" className="rateValue" onChange={rateValueChange}/></Col>  
                <Col span={10}><Button className="rateValueBtn" onClick={setRateValue}>Set</Button></Col>
              </Row>
              <Row className="rowLast"><Button className="LED" onClick={LEDchange}>{state.LEDstate? '关': '开'}</Button></Row>
            </Col>
          </Row>
          <div className="bottomBtn">
            <Button className="btn" onClick={collectChange}>{state.deviceStatus? '关闭采集':'开始采集'}</Button>
          </div>
        </ParamsWrapper>
        <Params2Wrapper>
          <div className="data">
            <div>正常记录周期</div>
            <div><Input style={{width: '80px'}}/>&nbsp;s</div>
          </div>
          <div className="data">
            <div>快速周期</div>
            <div><Input style={{width: '80px'}}/>&nbsp; s</div>
          </div>
          <div className="data">
            <div>采集切换温度</div>
            <div><Input style={{width: '80px'}}/>&nbsp; ℃</div>
          </div>
          <div className="btn-row">
            <Button className="btn">开始记录</Button>
          </div>
          <div className="btn-row">
            <Button className="btn">寻找最高温记录</Button>
          </div>
          <div className="btn-row">
            <Button className="btn">绘制最高温度曲线</Button>
          </div>
          <div className="btn-row">
            <Button className="btn">打开图像保存目录</Button>
          </div>
          <div className="btn-row">
            <Button className="btn last-btn">超过高温保存图片 开</Button>
          </div>
        </Params2Wrapper>
      </Spin>
    </MonitoringWrapper>
  )
})
