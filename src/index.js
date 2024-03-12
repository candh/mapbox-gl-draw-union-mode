import union from "@turf/union";

const UnionMode = {
  onSetup: function (opts) {
    this.union(opts.propertyUnionFn || Object.assign);
    return {};
  },

  toDisplayFeatures: function (state, geojson, display) {
    display(geojson);
    // immediately exit mode
    this.exitMode();
  },

  union: function (propertyUnionFn) {
    const selectedFeatures = this.getSelected();
    if (selectedFeatures.length >= 2) {
      // we only operate on 'Polygon' features
      const selectedPolygons = selectedFeatures.filter(
        (feature) => feature.type === "Polygon"
      );
      if (selectedPolygons.length >= 2) {
        // get selected IDs
        const selectedFeatureIDs = selectedPolygons.map(
          (feature) => feature.id
        );

        // get properties of selectedPolygons
        const allProperties = selectedPolygons.map(
          (feature) => feature.properties
        );

        // combine the polygons, one by one, using Turf's union
        const combinedPolygon = selectedPolygons.reduce((acc, polygon) =>
          union(acc, polygon)
        );

        // union of the properties using propertyUnionFn
        const mergedProperties = allProperties.reduce(
          (acc, properties) => propertyUnionFn(acc, properties),
          {}
        );

        // add the merged properties to the new combined polygon
        combinedPolygon.properties = mergedProperties;

        // delete the selected polygons
        this.clearSelectedFeatures();
        selectedFeatureIDs.forEach((id) => this.deleteFeature(id));

        // add the new combined polygon to the map
        this.addFeature(this.newFeature(combinedPolygon));
      }
    }
  },

  exitMode: function () {
    this.changeMode("simple_select");
  },
};

export default UnionMode;
