const PreProcessor = require('./src/PreProcessor')
const Learning = require('./src/Learning')

class AppScan{
    constructor(){
        this.preProcessor=new PreProcessor();
        this.learning = new Learning();
    }

    processor(pcapFliePath,appTimeLog,timeThreshold,dataScale){
        return this.preProcessor.processor(pcapFliePath,appTimeLog,timeThreshold,dataScale);
    }

    handleData(packetData,appTimeLog,timeThreshold,dataScale){
        return this.preProcessor.handleData(packetData,appTimeLog,timeThreshold,dataScale);
    }

    fit(X,y){
        return this.learning.fit(X,y);
    }

    predict(X,threshold){
        return this.learning.predict(X,threshold)
    }


}

module.exports = AppScan