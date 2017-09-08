///<reference path="../../lib/typings/typings.d.ts"/>
define(["require", "exports", "esri/map", "esri/SpatialReference", "esri/geometry/Point", "../webgis/extend/TDT/TDTLayer", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/dijit/HomeButton"], function (require, exports, Map, SpatialReference, EsriPoint, TDTLayer, ArcGISDynamicMapServiceLayer, HomeButton) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //定义坐标系和中心点常量
    var SR = new SpatialReference({ wkid: 4490 });
    var centerPoint = new EsriPoint(121.2, 28.9, SR);
    //初始化地图
    var map = new Map("map", {
        center: centerPoint,
        zoom: 13,
        //不显示esri powered by logo
        logo: false
    });
    //添加home键
    var homeButton = new HomeButton({
        map: map
    }, "HomeButton");
    //创建天地图图层
    var tdtImgLyr = new TDTLayer();
    //创建行政区划图层
    var addvLayer = new ArcGISDynamicMapServiceLayer("http://192.168.2.188:6080/arcgis/rest/services/ZJ_TZ_LH_ADDV_TOWN/MapServer");
    //添加天地图图层
    map.addLayer(tdtImgLyr);
    //添加行政区划图层
    map.addLayer(addvLayer);
    //启动home按钮
    homeButton.startup();
});
//alert(dom.byId("zoomLevel").innerHTML); 
//# sourceMappingURL=main_addaddv.js.map