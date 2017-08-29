///<reference path="../../lib/typings/typings.d.ts"/>

/*关于图层的卷帘效果
1. 适用于矢量图层（动态图层），对于切片或瓦片图无效
2. 在var layerSwipe=new LayerSwipe({
    type:"vertical",
    top:250,
    map:map,
    layers:[addvLayer]
},"swipeDiv");中，layers:[addvLayer]是"帘子"
* */

import Map=require("esri/map");
import SpatialReference=require("esri/SpatialReference");
import EsriPoint = require("esri/geometry/Point");
import TDTLayer=require("../webgis/extend/TDT/TDTLayer");
import ArcGISDynamicMapServiceLayer=require("esri/layers/ArcGISDynamicMapServiceLayer");
import LayerSwipe=require("esri/dijit/LayerSwipe");
import array=require("dojo/_base/array");
import Layer=require("esri/layers/layer");

//利用for...of获取图层组的方法
function getLayers(sourceMap:Map):Layer[]{
    var layers:Layer[];
    //获取地图对象中图层的所有id
    var layerids:string[]=sourceMap.layerIds;

    //利用map的getLayer方法，利用id取得所有id对应的图层
    for(let layerid of layerids){
        layers.push(sourceMap.getLayer(layerid));
    }
    return layers;
}
//利用array.map获取图层组的方法

function getLayersOfMap(sourceMap:Map):Layer[]{

    //获取地图对象中图层的所有id

    return map.layerIds.map(function(item){
        return sourceMap.getLayer(item);
    });
}



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
var tdtVecLyr=new TDTLayer("vec");
//创建行政区划图层
var addvLayer = new ArcGISDynamicMapServiceLayer("http://60.191.132.130:6080/arcgis/rest/services/ZJ_TZ_LH_ADDV_TOWN/MapServer");

//添加天地图图层
map.addLayer(tdtVecLyr);
//map.addLayer(tdtImgLyr);
map.addLayer(addvLayer);

//var layerIds:string[]=map.layerIds;


var layerSwipe=new LayerSwipe({
    type:"vertical",
    top:250,
    map:map,
    layers:[addvLayer]
},"swipeDiv");
layerSwipe.startup();