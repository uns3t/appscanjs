# appscanjs
a machine learning project to predict app by app's flow

### introduction

A month ago, I found [@pipcook/boa](https://alibaba.github.io/pipcook/#/manual/intro-to-boa) a project which makes  node.js call the machine learning library of Python.So I tried！



### How to use?

`npm install appscanjs` and `./node_modules/.bin/bip install dpkt ipaddress scikit-learn`



### Example

```javascript
const Appscan = require('appscanjs');

const appscan = new Appscan();

const data = appscan.processor(pcapfilePath, timeThreshold, dataScale, appTimeLog);

appscan.fit(data.xTrain, data.yTrain);
const result = appscan.predict(data.xTest);

const ret = appscan.report(data.yTest, result);
console.log(ret);

```



### API References

- `new Appscan(classificationType)`

  classificationType:

  1. `'RandomForestClassifier'`
  2. `'RidgeClassifier'`
  3. `'KNeighborsClassifier'`

- `processor(pcapFliePath, timeThreshold, dataScale, appTimeLog)`

  - pcapFliePath: Your pcap file's path

  - timeThreshold: Default value is 1 (s), you can custom threshold. The smaller the threshold, the more data.

  - dataScale: Ratio of training data to test data. Default value is 0.7.

  - appTimeLog:  Used to mark each flow.it's a object.

    Example:` [{"label": 1, "closeTime": 1617691826.000627}, {"label": 2, "closeTime": 1617692026.001097}...] `

    - label: app's label
    - closeTime: app's closeTime in pcapfile

    and if don't passed-in appTimeLog. processor function only return a   features array. 

  return a object` {xTrain:[][],xTest:[][],yTrain:[],yTest:[]}`

- `fit(X,y)`

  same as sklearn's fit. To train a classifier.

- `predict(X, threshold)`

  - X: the data to predict
  - threshold: use to sklearn's`predict_proba()`, if the probability below threshold then prediction's label will set to -1.

  return a array as predict result.

- `report(yTest, yPred)`

  same as sklearn's `classification_report()`

---

Thank you for using and downloading