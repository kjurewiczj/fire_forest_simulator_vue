<template>
  <div class="legend">
    <div class="legend-row">
      <div><b>Rzędy</b> {{this.forestFireHandler.rows}}</div>
      <div><b>Kolumny</b> {{this.forestFireHandler.columns}}</div>
      <div><b>Czas płonięcia poj. drzew.</b> {{this.forestFireHandler.burningTime}} ms</div>
      <div><b>Czas rozprzetrzeniania</b> {{this.forestFireHandler.spreadTime}} ms</div>
      <div><b>Prawdopodobieństwo zapalenia się drzewa</b> {{this.forestFireHandler.probability * 100}}%</div>
      <div><b>Ilość ziemi</b> {{this.forestFireHandler.grassProbability * 100}}%</div>
    </div>
  </div>
  <div v-if="this.forestFireHandler.finalTime" class="end-simulation">
    <h1>Symulacja płonącego lasu zakończyła się!</h1>
    <h3>Czas trwania pożaru {{this.forestFireHandler.finalTime}}s</h3>
    <h3>Spalone drzewa {{this.forestFireHandler.burnedTrees}}</h3>
  </div>
  <div class="field-container">
    <span v-if="!this.forestFireHandler.startTime">Kliknij na drzewo, które chcesz podpalić!</span>
    <div class="field-column" v-for="(column, columnIndex) in this.forestFireHandler.forest">
      <div class="field-row" v-for="(row, rowIndex) in column">
        <Field
            :columnIndex="columnIndex"
            :rowIndex="rowIndex"
            :row="row"
            :neighbours="this.prepareNeighbours(rowIndex, columnIndex)" />
      </div>
    </div>
  </div>
  <div class="owner">
    by Konrad Jurewicz
  </div>
</template>
<script>
import Field from "@/components/Field.vue";
import forestFireHandler from "@/handlers/forest.fire.handler.js";
export default {
  components: {Field},
  data() {
    return {
      forestFireHandler: forestFireHandler,
    }
  },
  mounted() {
    this.forestFireHandler.initializationForest();
  },
  methods: {
    prepareNeighbours(rowIndex, columnIndex) {
      let neighbours = {
        left: this.forestFireHandler.forest[columnIndex][rowIndex - 1] ?? null,
        right: this.forestFireHandler.forest[columnIndex][rowIndex + 1] ?? null,
        top: null,
        bottom: null,
        leftTop: null,
        rightTop: null,
        leftBottom: null,
        rightBottom: null
      }
      if (this.forestFireHandler.forest[columnIndex - 1]) {
        neighbours.top = this.forestFireHandler.forest[columnIndex - 1][rowIndex];
        neighbours.leftTop = this.forestFireHandler.forest[columnIndex - 1][rowIndex - 1];
        neighbours.rightTop = this.forestFireHandler.forest[columnIndex - 1][rowIndex + 1];
      }
      if (this.forestFireHandler.forest[columnIndex + 1]) {
        neighbours.bottom = this.forestFireHandler.forest[columnIndex + 1][rowIndex];
        neighbours.leftBottom = this.forestFireHandler.forest[columnIndex + 1][rowIndex - 1];
        neighbours.rightBottom = this.forestFireHandler.forest[columnIndex + 1][rowIndex + 1];
      }

      return neighbours;
    }
  }
}
</script>
<style scoped>
.field-column {
  display: flex;
  flex-direction: row;
}
.legend {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
}
.legend-row {
  padding: 5px;
  background-color: #313131;
  border-radius: 10px;
  margin-top: 5px;
}
.legend-row button {
  background-color: #4b4b4b;
  padding: 3px;
  border-radius: 6px;
  border: 0;
  color: white;
  height: 25px;
  width: max-content;
  cursor: pointer;
}
.end-simulation {
  padding: 5px;
  background-color: #313131;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 10px;
}
.legend b {
  font-weight: bold;
}
.end-simulation b {
  font-weight: bold;
}
.owner {
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 8px;
}
</style>
