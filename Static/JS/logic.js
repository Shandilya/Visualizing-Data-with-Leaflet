
// Step 1: Get the URL.
var url= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
//Step 2: setting up a function to get data of the above url. 
d3.json(url,function(data){
    createfeatures(data.features);
});
//Step 3: Calling Craete function.- It creates Popup, colors, and markers.
function createfeatures(earthquakedata) {

    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + "<br>" +
        "<h3>" + feature.properties.time + "<br>" +
        "<h3>" + "Magnitude:" + feature.properties.mag + "<br>" );
        }
    
    var earthquake =L.geoJSON(earthquakedata,{
        onEachFeature: onEachFeature,
        pointToLayer : function(feature,latlng){
            var R=255;
            var G=Math.floor(255-80*feature.properties.mag);
            var B=Math.floor(255-80*feature.properties.mag);
            var color='rgb(' + R +', ' + G + ',' + B +')';


    var geomarkers = {
        radius: 4 * feature.properties.mag,
        fillColor: color,
        color: "black",
        weight:1,
        opacity:1,
        fillOpacity:0.8
    };
    return L.circleMarker(latlng,geomarkers);
    }
});
createmap(earthquake);
}

function createmap(earthquake){

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
        maxZoom: 2,
        id: "mapbox.streets",
        accessToken: api_key
       });

var baseMaps = {
    "Street Map" : streetmap
};

var overlayMaps={
    Earthquake : earthquake
};

var map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 13,
    layers:[streetmap,earthquake]
});

function getColor(d){
    return d<1 ? "#fef0d9":
           d<2 ? "#fdd49e":
           d<3 ? "#fdbb84":
           d<4 ? "#fc8d59":
           d<5 ? "#e34a33":
           d<6 ? "#FED976":
                 "#FFEDA0";
     
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function(map){
        var div = L.DomUtil.create("div","info legend"),
            grades = [0,1,2,3,4,5],
            labels = [];

        div.innerHTML += "Magnitude" + "<br>";
        
        for (var i = 0; i <grades.length; i++){
             div.innerHTML +=
             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
     }
    
    return div;
    };
    
    legend.addTo(map);
            
        }

    

