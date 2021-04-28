const PcapAnalysis = require('./src/PcapAnalysis')

const pcapAnalysis = new PcapAnalysis();
const test = pcapAnalysis.analysis('/Users/zhangshiyu/Documents/Graduation-project/test3app.pcap')
console.log(test.length);
console.log(test[0]);