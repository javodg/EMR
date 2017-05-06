<template lang="html">
  <div class="card mapa">
    {{ mark }}<br>
    <gmap-map
      ref="mapa"
      :center="center"
      :zoom="15"
      style="width: 100%; height: 40vh"
      @click="clicklog">
      <gmap-marker v-if="mark.position.lat" :position="mark.position" :key="mark.id">
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
