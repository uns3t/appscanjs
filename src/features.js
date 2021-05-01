const percentile = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

class Features {
    maxLen(arr) {
        return Math.max(...arr);
    }

    minLen(arr) {
        return Math.min(...arr);
    }

    avgLen(arr) {
        let sum = arr.reduce(function (total, num) {
            return total + num;
        });
        return sum / arr.length;
    }

    midLen(arr) {
        let newArr = arr.sort((a, b) => {
            return a - b;
        });
        return newArr[parseInt(arr.length / 2)];
    }

    //方差
    varianceLen(arr) {
        let avg = this.avgLen(arr);
        let sum = arr.reduce(function (t, n) {
            return t + (n - avg) * (n - avg);
        }, 0);
        return sum / arr.length;
    }

    //百分位数
    percentileLen(arr) {
        let ret = [];
        let newArr = arr.sort((a, b) => {
            return a - b;
        });
        for (let i of percentile) {
            ret.push(newArr[parseInt(arr.length * i)]);
        }
        return ret;
    }

    //标准差
    standardDeviation(num) {
        return Math.pow(num, 0.5);
    }

    //偏度
    skewLen(arr, u, a) {
        if (a == 0) {
            return 0;
        }
        let sum = 0;
        for (let i of arr) {
            let iTemp = (i - u) / a;
            sum += Math.pow(iTemp, 3);
        }
        return sum / arr.length;
    }

    //峰度
    kurtosisLen(arr, u, a) {
        if (a == 0) {
            return 0;
        }
        let sum = 0;
        for (let i of arr) {
            let iTemp = (i - u) / a;
            sum += Math.pow(iTemp, 4);
        }
        return sum / arr.length;
    }

    arrLength(arr) {
        return arr.length;
    }

    pickLenBydirection(arr, direction) {
        let ret = [];
        for (let val of arr) {
            if (val.direction === direction || direction === 2) {
                ret.push(val.len);
            }
        }
        if (ret.length === 0) {
            ret = [0];
        }
        return ret;
    }

    featuresLen(arr) {
        let ret = [];
        const a1 = this.maxLen(arr);
        const a2 = this.minLen(arr);
        const a3 = this.avgLen(arr);
        const a5 = this.varianceLen(arr);
        const a6 = this.percentileLen(arr);
        const a7 = this.arrLength(arr);
        const a8 = this.standardDeviation(a5);
        const a9 = this.skewLen(arr, a3, a8);
        ret.push(a1, a2, a5, a7, ...a6, a9);
        return ret;
    }

    handleFeatures(dataScale = 1, xOrigData, yOrigData) {
        const xData = [];
        for (let idx = 0; idx < xOrigData.length; idx++) {
            let arrLen1 = this.pickLenBydirection(xOrigData[idx], 0);
            let arrLen2 = this.pickLenBydirection(xOrigData[idx], 1);
            let arrLen3 = this.pickLenBydirection(xOrigData[idx], 2);
            let features1 = this.featuresLen(arrLen1);
            let features2 = this.featuresLen(arrLen2);
            let features3 = this.featuresLen(arrLen3);
            xData.push([...features1, ...features2, ...features3]);
        }

        if (!yOrigData) {
            return xData;
        }

        let xTest = [],
            xTrain = [],
            yTest = [],
            yTrain = [];
        for (let idx = 0; idx < xData.length; idx++) {
            if (Math.random() > dataScale) {
                xTest.push(xData[idx]);
                yTest.push(yOrigData[idx]);
            } else {
                xTrain.push(xData[idx]);
                yTrain.push(yOrigData[idx]);
            }
        }

        return { xTrain, yTrain, xTest, yTest };
    }
}

module.exports = Features;
