<template>
	<gmap-map ref="mapa" :center="center" :zoom="15" style="width: 100%" class="auto" @click="clicklog">
		<gmap-marker v-if="mark.position.lat" :position="mark.position" :key="mark.id"></gmap-marker>
	</gmap-map>
</template>
<script>
import { _root } from '../../main'
export default {
	methods: {
		clicklog(mouseArgs) {
			this.mark = {
				id: 'location',
				position: {
     lat: mouseArgs.latLng.lat(),
     lng: mouseArgs.latLng.lng()
    }
   }
   // this.escuela[this.$route.params.id].lat = mouseArgs.latLng.lat()
   // this.escuela[this.$route.params.id].lng = mouseArgs.latLng.lng()
   console.log(mouseArgs.latLng.lat())
   console.log(mouseArgs.latLng.lng())
  }
 },
 data() {
 	return {
 		mark: _root
 	}
 }
}
</script>
<style>
	
</style>