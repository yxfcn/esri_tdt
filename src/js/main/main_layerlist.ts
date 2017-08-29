///<reference path="../../lib/typings/typings.d.ts"/>

import Map=require("esri/map");
import SpatialReference=require("esri/SpatialReference");
import EsriPoint = require("esri/geometry/Point");
import TDTLayer=require("../webgis/extend/TDT/TDTLayer");
import ArcGISDynamicMapServiceLayer=require("esri/layers/ArcGISDynamicMapServiceLayer");


import LayerList=require("esri/dijit/LayerList");

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
var addvLayer = new ArcGISDynamicMapServiceLayer("http://192.168.2.188:6080/arcgis/rest/services/ZJ_TZ_LH_ADDV_TOWN/MapServer");

//添加天地图图层
map.addLayer(tdtImgLyr);
//添加行政区划图层
map.addLayer(addvLayer);

//添加地图列表控件
var layerlist = new LayerList({
    map: map,
    showLegend: true,
    showSubLayers: false,
    showOpacitySlider: true,
    layers: [{
        layer: tdtImgLyr, // required unless featureCollection.
        //featureCollection: featureCollection, // required unless layerObject. If the layer is a feature collection, should match AGOL feature collection response and not have a layerObject.
        showSubLayers: true, // optional, show sublayers for this layer. Defaults to the widget's 'showSubLayers' property.
        showLegend: true, // optional, display a legend for the layer items.
        //content: <domNode>, // optional, custom node to insert content. It appears below the title.
        showOpacitySlider: true, // optional, display the opacity slider for layer items.
        //button: <domNode>, // optional, custom button node that will appear within the layer title.
        visibility: true, // optionally set the default visibility
        id: "tdtImgLyr" // optionally set the layer's id
    },
        {
            layer: addvLayer, // required unless featureCollection.
            showSubLayers: true, // optional, show sublayers for this layer. Defaults to the widget's 'showSubLayers' property.
            showLegend: true, // optional, display a legend for the layer items.
            //content: <domNode>, // optional, custom node to insert content. It appears below the title.
            showOpacitySlider: true, // optional, display the opacity slider for layer items.
            //button: <domNode>, // optional, custom button node that will appear within the layer title.
            visibility: true, // optionally set the default visibility
            id: "addvLayer" // optionally set the layer's id
        }]
}, "layerlist");
layerlist.startup();
