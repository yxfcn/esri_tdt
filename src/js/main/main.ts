///<reference path="../../lib/typings/typings.d.ts"/>

import Map=require("esri/map");
import SpatialReference=require("esri/SpatialReference");
import EsriPoint = require("esri/geometry/Point");
import TDTLayer=require("../webgis/extend/TDT/TDTLayer");


        const SR=new SpatialReference({wkid:4490});
        const centerPoint=new EsriPoint(121.2,28.9,SR);

        var map=new Map("map",{
            center:centerPoint,
            zoom:13
        });

        var tdtImgLyr=new TDTLayer("vec");
        map.addLayer(tdtImgLyr);
