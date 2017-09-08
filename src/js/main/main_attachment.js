define(["require", "exports", "esri/map", "esri/layers/FeatureLayer", "esri/dijit/editing/AttachmentEditor", "dojo/dom"], function (require, exports, Map, FeatureLayer, AttachmentEditor, dom) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //parser.parse();
    var map = new Map("map", {
        basemap: "gray",
        center: [-95, 40],
        zoom: 4
    });
    map.on("load", mapLoaded);
    /**
     *
     */
    function mapLoaded() {
        var featureLayer = new FeatureLayer("https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Prominent_Peaks_attach/FeatureServer/0", {
            mode: FeatureLayer.MODE_ONDEMAND
        });
        //设置infowindow的内容
        map.infoWindow.setContent("<div id='content' style='width:100%'></div>");
        //设置infowindow的大小
        map.infoWindow.resize(350, 200);
        var attachmentEditor = new AttachmentEditor({}, dom.byId("content"));
        attachmentEditor.startup();
        featureLayer.on("click", function (evt) {
            //获取点击的要素的objectId属性
            var objectId = evt.graphic.attributes[featureLayer.objectIdField];
            //设置infowindow的标题
            map.infoWindow.setTitle(objectId);
            attachmentEditor.showAttachments(evt.graphic, featureLayer);
            map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
        });
        map.addLayer(featureLayer);
    }
});
//# sourceMappingURL=main_attachment.js.map