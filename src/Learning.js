const boa = require('@pipcook/boa');
const { len } = boa.builtins();
const ensemble = boa.import('sklearn.ensemble');
const calibration = boa.import('sklearn.calibration');
const linear_model = boa.import('sklearn.linear_model');
const neighbors = boa.import('sklearn.neighbors');
const metrics = boa.import('sklearn.metrics');

class Learning {
    constructor(classificationType = 'RandomForestClassifier') {
        switch (classificationType) {
            case 'RandomForestClassifier':
                this.clf = ensemble.RandomForestClassifier(
                    boa.kwargs({
                        criterion: 'gini',
                        max_features: 'sqrt',
                        n_estimators: 150,
                    })
                );
                break;
            case 'RidgeClassifier':
                this.clf = calibration.CalibratedClassifierCV(linear_model.RidgeClassifier());
                break;
            case 'KNeighborsClassifier':
                this.clf = neighbors.KNeighborsClassifier(
                    boa.kwargs({
                        n_neighbors: 7,
                        algorithm: 'auto',
                        weights: 'uniform',
                    })
                );
                break;
        }
    }

    report(yTest, yPred) {
        return metrics.classification_report(yTest, yPred);
    }

    fit(X, y) {
        this.clf.fit(X, y);
        return this;
    }

    predict(X, threshold = 0.9) {
        const probabilities = this.clf.predict_proba(X).max(
            boa.kwargs({
                axis: 1,
            })
        );
        const prediction = this.clf.predict(X);
        for (let i = 0; i < len(prediction); i++) {
            if (probabilities[i] < threshold) {
                prediction[i] = -1;
            }
        }
        return prediction;
    }
}

module.exports = Learning;
