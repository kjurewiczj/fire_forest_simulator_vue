export default {
    forest: [],
    rows: 75,
    columns: 75,
    burningTime: 1000,
    spreadTime: 100,
    probability: 0.15,
    grassProbability: 0.01,
    fireStarted: false,
    burningTrees: 0,
    startTime: null,
    finalTime: null,
    burnedTrees: 0,
    async initializationForest() {
        for (let row = 0; row < this.rows; row++) {
            this.forest[row] = [];
            for (let column = 0; column < this.columns; column++) {
                if (Math.random() < this.grassProbability) {
                    this.forest[row].push({
                        type: 'grass',
                        status: 'grass'
                    })
                } else {
                    this.forest[row].push({
                        type: 'tree',
                        status: 'non-burned'
                    })
                }
            }
        }
    },
    countBurnedTrees() {
        for (let items of this.forest) {
            for (let field of items) {
                if (field.status === 'burned') {
                    this.burnedTrees++;
                }
            }
        }
    }
}