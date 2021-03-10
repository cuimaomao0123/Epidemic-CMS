import styled from 'styled-components';

export const ImageWrapper = styled.div`
  position: absolute;
  left: 17.8%;
  top: 10px;
  .image{
    width: 50px;
    height: 65vh;
  }
`

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
    margin: 40px 0 0 18%;
    color: red;
    font-size: 16px;
  }
  .videoBox{
    position: relative;
    left: 38%;
    top: 10px;
    transform: translateX(-50%);
    height: 65vh;
    width: 35vw;
    border: 1px solid #000000;
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
export const ParamsWrapper = styled.div`
  position: absolute;
  left: 55.7%;
  top: 10px;
  height: 65vh;
  width: 14vw;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  .data{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 85%;
    height: 180px;
    background-color: #dddddd;
    font-size: 16px;
    .data-row{
      width: 100%;
      margin-top: 5px;
      display: flex;
      justify-content: space-around;
      &:first-child{
        font-weight: bold;
      }
    }
  }
  .config{
    font-size: 16px;
    width: 85%;
    .row{
      margin-top: 27px;
    }
    .rowLast{
      margin-top: 25px;
    }
    .warning{
      height: 24px;
      width: 70px;
      background-color: rgb(141, 249, 20);
    }
    .warningValue, .warningValueBtn, .rateValue, .rateValueBtn, .LED{
      line-height: 1.2;
    }
    .warningValueBtn, .rateValueBtn{
      height: 26px;
      color: #000000;
      margin-left: 5px;
      background-color: #dddddd;
    }
    .rongheSelect{
      .ant-select-selector{
        height: 26px;
      }
      width: 125px;
    }
    .colorSelect{
      width: 125px;
      .ant-select-selector{
        height: 26px;
      }
    }
    .LED{
      height: 26px;
      width: 120px;
      background-color: #dddddd;
      color: #000000;
    }
  }
  .bottomBtn{
    margin-top: 20px;
    .btn{
      width: 150px;
      background-color: #dddddd;
      color: #000000;
      font-weight: bold;
      letter-spacing: 4px;
    }
  }
`
export const Params2Wrapper = styled.div`
padding-top: 30px;
  position: absolute;
  left: 70%;
  top: 10px;
  height: 65vh;
  width: 13vw;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  .data{
    width: 100%;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 15px;
  }
  .btn-row{
    width: 100%;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    .btn{
      width: 160px;
      height: 38px;
      font-size: 15px;
    }
    .last-btn{
      font-weight: bold;
    }
  }
`