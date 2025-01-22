<template>
  <div class="map-wrapper">
    <header class="map-header">
      <h1>Geospatial Viewer</h1>
      <button @click="toggleDraw" class="btn-toggle-draw">Toggle Draw</button>
    </header>

    <div id="map" class="map-container"></div>

    <div v-if="hoverInfo" class="hover-card">
      <h3>Information</h3>
      <p>{{ hoverInfo }}</p>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

export default {
  data() {
    return {
      map: null,
      draw: null,
      hoverInfo: null,
    };
  },
  methods: {
    initMap() {
      // Initialize the map
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.5, 40], // Center of the map
        zoom: 9,
      });

      // Initialize MapboxDraw
      this.draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });

      this.map.addControl(this.draw);

      // Add hover functionality
      this.map.on("mousemove", (e) => {
        const features = this.map.queryRenderedFeatures(e.point);
        if (features.length) {
          this.hoverInfo = features[0].properties.name || "No information available";
        } else {
          this.hoverInfo = null;
        }
      });
    },
    toggleDraw() {
      const isActive = this.map.hasControl(this.draw);
      if (isActive) {
        this.map.removeControl(this.draw);
      } else {
        this.map.addControl(this.draw);
      }
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style>
/* General layout for the map wrapper */
.map-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
}

/* Header styles */
.map-header {
  position: absolute;
  z-index: 10;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
}

.map-header h1 {
  margin: 0;
  font-size: 18px;
}

.btn-toggle-draw {
  padding: 8px 16px;
  border: none;
  background-color: #00bcd4;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-toggle-draw:hover {
  background-color: #008c9e;
}

/* Map container styling */
.map-container {
  flex: 1;
  height: 100%;
}

/* Hover card styling */
.hover-card {
  position: absolute;
  z-index: 10;
  bottom: 20px;
  left: 20px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  max-width: 250px;
}

.hover-card h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.hover-card p {
  margin: 5px 0 0;
  color: #555;
}

/* Responsive design */
@media (max-width: 768px) {
  .map-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-toggle-draw {
    margin-top: 10px;
  }
}
</style>
