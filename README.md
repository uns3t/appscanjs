# appscanjs
a machine learning project to predict app by app's flow

#### introduction

A month ago, I found [@pipcook/boa](https://alibaba.github.io/pipcook/#/manual/intro-to-boa) a project which makes  node.js call the machine learning library of Python.So I tried！



#### How to use?

`npm install appscanjs` and `./node_modules/.bin/bip install dpkt ipaddress scikit-learn`



#### Example

```javascript
const Appscan = require('appscanjs');

const appscan = new Appscan();

const data = appscan.processor(pcapfilePath, timeThreshold, dataScale, appTimeLog);

appscan.fit(data.xTrain, data.yTrain);
const result = appscan.predict(data.xTest);

const ret = appscan.report(data.yTest, result);
console.log(ret);

```

