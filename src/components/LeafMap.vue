<template>
    <l-map :center="center" :zoom="zoom" class="map" ref="map" @update:zoom="zoomUpdated" @update:center="centerUpdated">
        <l-tile-layer :url="url"></l-tile-layer>
   </l-map>
</template>

<script>

import { LMap, LTileLayer } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
export default {
    name:"MyMap",
    components: {
        LMap,
        LTileLayer
    },
    data () {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            center: [  46.066666, 11.116667 ],
            zoom: 15,
        }
    },
    methods: {
        zoomUpdated (zoom) {
            this.zoom = zoom;
            console.log(this.markers)
        },
        centerUpdated (center) {
            this.center = center;
        },
        onMapReady() {
            setTimeout(() => {
                console.log("yEAAAAAAAAAAAAAAAAAA")
                this.$refs.map.mapObject.invalidateSize(true);
            }, 100);
        },
        modalShown() {
            setTimeout(() => {
                //mapObject is a property that is part of leaflet
                this.$refs.map.mapObject.invalidateSize(); 
            }, 100);
        }
    }
}
</script>

<style>
    .map {position: absolute; top: 0; bottom: 0; left: 0; right:0}
</style>