///<reference path="../../lib/typings/typings.d.ts"/>

import Map=require("esri/map");
import SpatialReference=require("esri/SpatialReference");
import EsriPoint = require("esri/geometry/Point");
import TDTLayer=require("../webgis/extend/TDT/TDTLayer");
import FeatureLayer=require("esri/layers/FeatureLayer");
import Legend=require("esri/dijit/Legend");
import arrayUtils=require("dojo/_base/array");


//定义坐标系和中心点常量
const SR = new SpatialReference({wkid: 4490});
const centerPoint = new EsriPoint(121.2, 28.9, SR);


//初始化地图
var map = new Map("map", {
    center: centerPoint,
    zoom: 13,
    //不显示esri powered by logo
    logo: false
});
//创建天地图图层
var tdtImgLyr = new TDTLayer();
//创建行政区划图层
var addvLayer = new FeatureLayer("http://192.168.2.188:6080/arcgis/rest/services/ZJ_TZ_LH_ADDV_TOWN/MapServer/0", {
    mode: FeatureLayer.MODE_ONDEMAND,
    outFields: ["*"]
});
//创建河流图层
var rvLayer = new FeatureLayer("http://192.168.2.188:6080/arcgis/rest/services/ZJ_TZ_LH_RIVER_TOWN/MapServer/0", {
    mode: FeatureLayer.MODE_ONDEMAND,
    outFields: ["*"]
});

//add the legend
/*------添加对map的"layers-add-result"事件的监听-----------
map.on(事件名，回调函数)
* */
map.on("layers-add-result", function (evt) {
    //数组映射 array.map(array,function(item,index){});
    var layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
        //返回一个对象Object
        return {
            layer: layer.layer,
            title: layer.layer.name
        };
    });
    if (layerInfo.length > 0) {

        //创建图例
        var legendDijit = new Legend({
            map: map,
            layerInfos: layerInfo
        }, "legendDiv");
        legendDijit.startup();
    }
});


//添加天地图图层

map.addLayers([tdtImgLyr, rvLayer, addvLayer]);


