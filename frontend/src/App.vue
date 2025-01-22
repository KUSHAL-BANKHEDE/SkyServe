<template>
  <div id="app">
    <h1>Geospatial App</h1>
    <MapboxMap />
  </div>
</template>

<script>
import MapboxMap from './components/MapboxMap.vue';

export default {
  components: {
    MapboxMap,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
