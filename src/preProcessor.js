const PcapAnalysis = require('./PcapAnalysis')
const Features = require('./Features')

class PreProcessor{
    constructor(){
        this.pcapAnalysis = new PcapAnalysis();
        this.features = new Features();
    }

    processor(pcapFliePath,appTimeLog,timeThreshold,dataScale){
        const packetData = this.pcapAnalysis.analysis(pcapFliePath);
        const featuresData = this.handleData(packetData,appTimeLog,timeThreshold,dataScale)
        return featuresData;
    }

    handleData(packetData,appTimeLog,timeThreshold,dataScale){
        const burstData = this.handleBurst(packetData,timeThreshold);
        const flowData = this.handleFlow(burstData);
        const signData = this.handleSgin(flowData,appTimeLog)
        const featuresData = this.features.handleFeatures(dataScale,signData.xData,signData.yData)
        return featuresData;
    }

    handleBurst(packetData,timeThreshold = 1){
        let burstData=[];
        let curTime=packetData[0].time+timeThreshold;
        let tempData=[];
        packetData.forEach(value => {
            if(value.time<curTime){
                tempData.push(value);
            }else{
                curTime=value.time+timeThreshold;
                burstData.push(tempData)
                tempData=[]
                tempData.push(value)
            }
        })
        return burstData
    }

    handleFlow(burstData){
        let flowData=[];

        for(let idx=0;idx<burstData.length;idx++){
            let curFlow={};
            burstData[idx].forEach(val=>{
                let remoteIp=val.direction?val.dstIp:val.srcIp
                if(curFlow.hasOwnProperty(remoteIp)){
                    curFlow[remoteIp].push({time:val.time,len:val.len,direction:val.direction})
                }else{
                    curFlow[remoteIp]=[{time:val.time,len:val.len,direction:val.direction}]
                }
            })

            Object.keys(curFlow).forEach(arrTemp=>{
                let closeTime = Math.max.apply(Math, curFlow[arrTemp].map(function(o) {return o.time}))
                let arr = curFlow[arrTemp].map(val=>{
                    return {len:val.len,direction:val.direction}
                })
                flowData.push({closeTime:closeTime,data:arr})
            })
        }

        return flowData
    }
    handleSgin(flowData,appTimeLog){
        if(!appTimeLog){
            return flowData.map(val =>{
                return val.data
            })
        }
        const xData=[],yData=[]
        let idx=0;

        for(let flow of flowData){
            if(flow.closeTime<appTimeLog[idx].closeTime){
                yData.push(appTimeLog[idx].label)
                xData.push(flow.data)
            }else{
                idx++
                if(idx>=appTimeLog.length){
                    break;
                }
                yData.push(appTimeLog[idx].label)
                xData.push(flow.data)
            }
        }

        return { xData, yData }
    }
}

module.exports = PreProcessor