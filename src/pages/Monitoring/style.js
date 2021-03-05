import styled from 'styled-components';

export const MonitoringWrapper = styled.div`
  .tip{
    position: relative;
    left: 80%;
    top: 20px;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    .title{
      font-size: 20px;
      color: red;
    }
  }
  h3{
    margin: 40px 0 0 25%;
    color: red;
    font-size: 16px;
  }
  .videoBox{
    position: relative;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    height: 70vh;
    width: 45vw;
    border: 1px solid #000000;
    /* .max{
      position: absolute;
      top: ${props => (props.maxPosY*650/230) + 'px'};
      left: ${props => (props.maxPosX*700/230) + 'px'};
    }
    .min{
      position: absolute;
      top: ${props => (props.minPosY*650/230) + 'px'};
      left: ${props => (props.minPosX*700/230) + 'px'};
    } */
    img{
      width: 100%;
      height: 100%;
    }
    .ant-spin-dot{
      position: absolute;
      left: 48%;
      top: 50%;
      transform: translate(-50% -50%);
    }
    .ant-spin-text{
      position: absolute;
      left: 56%;
      top: 50%;
      transform: translate(-50% -50%);
      font-size: 16px;
    }
  }
  
`