const PreProcessor = require('./src/PreProcessor');
const Learning = require('./src/Learning');

class AppScan {
    constructor(classificationType) {
        this.preProcessor = new PreProcessor();
        this.learning = new Learning(classificationType);
    }

    processor(pcapFliePath, timeThreshold, dataScale, appTimeLog) {
        return this.preProcessor.processor(pcapFliePath, timeThreshold, dataScale, appTimeLog);
    }

    fit(X, y) {
        return this.learning.fit(X, y);
    }

    predict(X, threshold) {
        return this.learning.predict(X, threshold);
    }

    report(yTest, yPred) {
        return this.learning.report(yTest, yPred);
    }
}

module.exports = AppScan;
