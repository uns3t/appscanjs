const Appscan = require('./index')
const fs = require('fs')

const appscan = new Appscan();


const testOption={
    flowFlie:'/Users/zhangshiyu/Documents/Graduation-project/test3app.pcap',
    localIp:'192.168.137.232',
    timeLogPath:'/Users/zhangshiyu/Documents/Graduation-project/worksapce/monkey/appTimeLog3.json',
    dataScale:0.7,
    algorithmFlag:2,
    confidence:0,
}

const logStr = fs.readFileSync(testOption.timeLogPath)
const logArr = JSON.parse(logStr)

const data = appscan.processor(testOption.flowFlie,logArr,1,0.9)
appscan.fit(data.xTrain,data.yTrain);
const result = appscan.predict(data.xTest,0.9)
console.log(result);

