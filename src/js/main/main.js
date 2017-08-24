///<reference path="../../lib/typings/typings.d.ts"/>
define(["require", "exports", "esri/map", "esri/SpatialReference", "esri/geometry/Point", "../webgis/extend/TDT/TDTLayer"], function (require, exports, Map, SpatialReference, EsriPoint, TDTLayer) {
    "use strict";
    var SR = new SpatialReference({ wkid: 4490 });
    var centerPoint = new EsriPoint(121.2, 28.9, SR);
    var map = new Map("map", {
        center: centerPoint,
        zoom: 13
    });
    var tdtImgLyr = new TDTLayer("vec");
    map.addLayer(tdtImgLyr);
});
//# sourceMappingURL=main.js.map