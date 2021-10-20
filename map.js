

var mexico = [19.70551, -99.16656] ; 

var map = L.map('map').
setView(   
    [19.70551, -99.16656] ,
    13,);         //Es la primera vista que se vera al momento de abrir el mapa

var carto = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://bidg.mx/">BID GROUP</a>',

})

carto.addTo(map);

var center = map.getCenter(); 

var marker = L.marker(center,{
    onEachFeature: function(feature, layer) { 
    var etiqueta = ('Cuautitlan')
    layer.bindPopup (etiqueta);} 
}).addTo(map); 


map.on( "zoomend", function(e) { 
    zoom = map.getZoom( ); 
    if ( zoom >= 20  || zoom <= 10) { 
    map.removeLayer( marker ); 
    }});



// mapa inicial

document.getElementById('mexico').onclick = function () {
    map.flyTo(mexico, 13); }; 

   document.getElementById('stop').onclick = function () { map.stop(); }; 

// Imagenes de mapas sateñital

var urlmaps1 = 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'

googlesatelital = L.tileLayer(urlmaps1,{
    maxZoom: 20,
    subdomains: ['mt0','mt1','mt2','mt3']
});

googlesatelital.addTo(map);


var urlmaps1 = 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'

google = L.tileLayer(urlmaps1,{
    maxZoom: 20,
    subdomains: ['mt0','mt1','mt2','mt3']
});

googlesatelital.addTo(map);



var urlmaps2 = 'https://mt1.google.com/vt?lyrs=h@159000000,traffic|seconds_into_week:-1&style=3&x={x}&y={y}&z={z}'

google_traf = L.tileLayer(urlmaps2,{
    maxZoom: 20,
    subdomains: ['mt0','mt1','mt2','mt3']
});

google_traf.addTo(map);

var urlmaps3 = 'http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'

google_dark = L.tileLayer(urlmaps3,{
    maxZoom: 20,
    subdomains: ['mt0','mt1','mt2','mt3']
});

google_dark.addTo(map);



// Control de mapas



// eaqui agregamos el buscador de geocodigo (que se encuentra registrado en el mapa)
L.Control.geocoder().addTo(map);

// este Codigo es para hacer llamado las capas desde geoserver se requiere tener la carpeta de L.geoserver que se tiene desde gidhub
/*
var wmsLayer1 = L.Geoserver.wms("http://192.168.190.2:8080/geoserver/couautitlan/wms", {
  layers: "couautitlan:muni",
});
wmsLayer1.addTo(map);


var wmsLayer2 = L.Geoserver.wms("http://192.168.190.2:8080/geoserver/couautitlan/wms", {
  layers: "couautitlan:estados",
});

wmsLayer2.addTo(map);*/


// minu mapa en 
var osm2 = new L.TileLayer(urlmaps1, {minZoom: 0, maxZoom: 13});


var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(map);

// Estilo de geojson
var countryStyle = {
    'color': "#b31417ff",
    'weight': 5, // grosor de lineas
    'opacity': 1,
    'fillcolor': 10,
    'fill': 10,
    'fillOpacity' : 0
    
};

var countryStylem = {
    'color': "#1241ffff",
    'weight': 1, // grosor de lineas
    'opacity': 1,
    'fillcolor': 10,
    'fill': 10,
    'fillOpacity' : 0
    
};



//cargar geojson


var geoJsonLayer = L.geoJson(json,{ 
    style: countryStyle,
    onEachFeature: function(feature, layer) { 
        var etiqueta = ('Estado :' + feature.properties.NOMBRE)
    layer.bindPopup (etiqueta);} 
    }).addTo(map); 

var geoJsonLayer2 = L.geoJson(jsonmuni,{
    style: countryStylem,
    onEachFeature: function(feature, layer) { 
    var etiqueta = ('Municipio :' + feature.properties.NOM_MUN)
    layer.bindPopup (etiqueta);} 
}).addTo(map); 
    
    




var baseLayers = {
    "satelital": googlesatelital,
    'street maps':  carto,
    'trafico':  google_traf,
    'Oscuro':  google_dark,
};

var vectores = {
        'Estados':  geoJsonLayer,
        'municipios':  geoJsonLayer2,
};



L.control.layers(baseLayers, vectores).addTo(map);



