<template>
  <div class="field" :class="row.status" @click="startFire">
  </div>
</template>
<script>
import forestFireHandler from "@/handlers/forest.fire.handler.js";
export default {
  data() {
    return {
      forestFireHandler: forestFireHandler,
    }
  },
  props: {
    forest: null,
    columnIndex: null,
    rowIndex: null,
    row: null,
    neighbours: null
  },
  methods: {
    startFire() {
      if (!this.forestFireHandler.fireStarted) {
        this.setFire();
        this.forestFireHandler.fireStarted = true;
        this.forestFireHandler.startTime = new Date().getTime();
      }
    },
    setFire() {
      if (this.row.status === 'burned' || this.row.type === 'grass') {
        return null;
      }
      this.row.status = 'burning';
      this.forestFireHandler.burningTrees++;
      setTimeout(() => {
        this.row.status = 'burned';
        this.forestFireHandler.burningTrees--;
        if (this.forestFireHandler.burningTrees === 0) {
          this.forestFireHandler.finalTime = ((new Date().getTime() - this.forestFireHandler.startTime) / 1000).toFixed(2);
          this.forestFireHandler.countBurnedTrees();
        }
      }, this.forestFireHandler.burningTime);
    },
    spreadFire(watchedNeighbours) {
      if (this.canBeBurned(watchedNeighbours.left)) return this.timeoutBurn();
      if (this.canBeBurned(watchedNeighbours.right)) return this.timeoutBurn();
      if (this.canBeBurned(watchedNeighbours.top)) return this.timeoutBurn();
      if (this.canBeBurned(watchedNeighbours.bottom)) return this.timeoutBurn();
      if (this.canBeBurned(watchedNeighbours.leftTop)) return this.timeoutBurn();
      if (this.canBeBurned(watchedNeighbours.rightTop)) return this.timeoutBurn();
      if (this.canBeBurned(watchedNeighbours.leftBottom)) return this.timeoutBurn();
      if (this.canBeBurned(watchedNeighbours.rightBottom)) return this.timeoutBurn();
    },
    timeoutBurn() {
      return setTimeout(() => {
        return this.setFire();
      }, this.forestFireHandler.spreadTime);
    },
    canBeBurned(watchedNeighbourSide) {
      if (!watchedNeighbourSide || watchedNeighbourSide.status !== 'burning') {
        return false;
      }

      return Math.random() < this.forestFireHandler.probability;
    }
  },
  watch: {
    neighbours: {
      handler(newVal, oldVal) {
        this.spreadFire(newVal);
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.field:hover {
  cursor: no-drop;
}
.non-burned:hover {
  background-color: lightgreen;
  cursor: pointer;
}
</style>