import UnionMode from "../src";
import sampleFC from "./sampleFeatureCollection";

mapboxgl.accessToken = mapboxAccessToken();

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v11",
  center: [
    // long, lat
    74.3100, 31.53865,
  ],
  zoom: 12,
});

const draw = new MapboxDraw({
  modes: Object.assign({ union: UnionMode }, MapboxDraw.modes),
});
map.addControl(draw);

// add sample feature collection
draw.add(sampleFC);

map.on("load", () => {
  document.getElementById("unionModeBtn").onclick = () => {
    // by simply changing to the mode, the selected features will
    // be merged and the mode will exit immediately
    draw.changeMode("union");
  };
});

function mapboxAccessToken() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("accessToken");
}
