<template>
    <div class="map-container" ref="myMapp"></div>
</template>

<script>
import maplibre from 'maplibre-gl';

export default {
  name: "MyMap",
  mounted: async function(){
    //const myAPIKey = 'YOUR_API_KEY_HERE'; 
    console.log("?")
    const mapStyle = 'https://api.maptiler.com/maps/streets/style.json?key=S1aB9ElJLePXra57G3cm';
    console.log(mapStyle)
    const initialState = {
      lng: 11.194239,
      lat: 46.052415,
      zoom: 12
    };

    const map = new maplibre.Map({
      container: this.$refs.myMapp,
      style: `${mapStyle}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
    map.on('load',function(){
      map.resize();
    })

    const markerPopup = new maplibre.Popup().setText('Some marker');
    new maplibre.Marker().setLngLat([initialState.lng, initialState.lat]).setPopup(markerPopup).addTo(map);
    this.call_my_api(map);
    //console.log("WAHT");
  },
  
  methods:{
    addMarkers(data){
      for(var i in data){
        console.log(data[i])
        /*map.addSource('my_ways',{http://localhost:8080/ 
          type: 'geojson',
          data: ''
        })*/
      }
      this.addFirstTryMarker();
    },

    async call_my_api(map){
      try{
        const requestSpatialite = {
          method:"post",
          headers:{ "Content-Type":"application/json"},
          body: JSON.stringify({"latitude": "46.052415", "longitude": "11.194239"})
        };
        await fetch("http://localhost:5000/posts/",requestSpatialite)
          .then(response => response.json())
          .then((data)=>{
            //console.log(data); 
            this.addGeometries(data,map);
            this.addFirstTryMarker(map);
            //this.getAllQuestions(data);
          }).catch((err)=>console.log(err))
      }catch(e){
        alert("Error init");
      }
    },

    async addGeometries(data,map){
      var new_data = JSON.stringify(data)
      new_data = '{"data":' + new_data +"}";
      //console.log("woah..." + map);
      const requestSpatialite = {
          method:"post",
          headers:{ "Content-Type":"application/json"},
          body: new_data
      };
      await fetch("http://localhost:5000/posts/getgeojson",requestSpatialite)
          .then(response => response.json())
          .then((new_response_data)=>{
            console.log("THIS IS MY NEW_RESPONSE_DATA:"+new_response_data); 
            var nodes_json=[];
            //var ways_array = [];
            for(var i in new_response_data){
              //console.log(new_response_data[i])
              new_response_data[i]=JSON.parse(new_response_data[i])
              console.log(new_response_data[i].properties.type)
              if(new_response_data[i].properties.type == "node"){
                JSON.stringify(new_response_data[i])
                nodes_json.push(new_response_data[i])
                //NEED TO CREATE A LIST OF THESE GEOJSON TO SEND TO THE FUNCTION.
                this.createNodeOnMap(new_response_data[i],map);
              }else{
                JSON.stringify(new_response_data[i],map);
                this.createWayOnMap(new_response_data[i],map);
                //TODO
              }
              //this.createWaysOnMap(new_response_data[i],map)
            }
            //nodes_json = JSON.stringify(nodes_json)
            //console.log(nodes_json)
            //this.createNodeOnMap(new_response_data[i],map);
            //this.createNodeOnMap(nodes_json,map)
      }).catch((err)=>console.log(err))
    },

    async createNodeOnMap(data,map){
          var my_id = data.properties.id
          var my_source_id = "my_nodes" + my_id;
          var my_layer_id = "my_node_layer" + my_id;
          console.log("ooooweeee"+ my_source_id)
          console.log(data)
          map.on('load',function(){
            map.addSource(my_source_id,{
              type: 'geojson',
              data: data
            })
            map.addLayer({
              'source': my_source_id,
              'type': 'symbol',
              'id':my_layer_id,
              'layout':{
                'icon-image': 'my_icon',
                'icon-size' :0.05,
              }
            })
            map.loadImage('https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',function(error,image){
              if(error) throw error;
              map.addImage('my_icon', image);
            });
            map.on('click', my_layer_id,function(e){
              //qua dovrei fare na chiamata e aspettare la risposta per poi caricare le doamnde corrispondenti al dato elemento.
              new maplibre.Popup().setLngLat(e.lngLat).setHTML('<h1>'+my_source_id+'</h1>').addTo(map);
            })
            map.on('mouseenter', my_layer_id, function () {
              map.getCanvas().style.cursor = 'pointer';
            });
            //console.log(data)
          })    
    },

    async getAllQuestions(data){
      try{
        var new_data = JSON.stringify(data)
        new_data = '{"data":' + new_data + "}";
        const requestSpatialite = {
          method:"post",
          headers:{ "Content-Type":"application/json"},
          body: new_data
        };
        await fetch("http://localhost:5000/posts/getAllWithIds",requestSpatialite)
          .then(response => response.json())
          .then((new_response_data)=>{
            console.log(new_response_data); 
          }).catch((err)=>console.log(err))
      }catch(e){
        alert("Error init");
      }
    },

    async addFirstTryMarker(map){
      try{
        const requestSpatialite = {
        method:"get",
        headers:{ "Content-Type":"application/json"},
      };
      await fetch("http://localhost:5000/posts/lettry",requestSpatialite)
        .then(response => response.json())
        .then((data)=>{
          console.log("AAAAAAAAAAAAAA")
          console.log(data)
          //this.addMarkers(data);
          map.on('load',function(){
            map.addSource('my_ways',{
              type: 'geojson',
              data: data
            })
            map.addLayer({
              'source': 'my_ways',
              'type': 'line',
              'id':'route',
              'layout':{
                'line-join': 'round',
                'line-cap': 'round'
              },
              'paint': {
                'line-color': '#888',
                'line-width': 8
              }
            })
            map.on('click', 'route',function(e){
              //qua dovrei fare na chiamata e aspettare la risposta per poi caricare le doamnde corrispondenti al dato elemento.
              new maplibre.Popup().setLngLat(e.lngLat).setHTML('<h1>working...</h1>').addTo(map);
            })
            map.on('mouseenter', 'route', function () {
              map.getCanvas().style.cursor = 'pointer';
            });
            //console.log(data)
          })     
        }).catch((err)=>console.log(err))
        }catch(e){
          alert("Error init");
        }
    },

    async createWayOnMap(data,map){
      var my_id = data.properties.id
      var my_source_id = "my_ways" + my_id;
      var my_layer_id = "my_way_layer" + my_id;
          console.log(my_layer_id)
          console.log(data)
          //this.addMarkers(data);
          map.on('load',function(){
            map.addSource(my_source_id,{
              type: 'geojson',
              data: data
            })
            map.addLayer({
              'source': my_source_id,
              'type': 'line',
              'id':my_layer_id,
              'layout':{
                'line-join': 'round',
                'line-cap': 'round'
              },
              'paint': {
                'line-color': '#888',
                'line-width': 8
              }
            })
            map.on('click', my_layer_id,function(e){
              //qua dovrei fare na chiamata e aspettare la risposta per poi caricare le doamnde corrispondenti al dato elemento.
              new maplibre.Popup().setLngLat(e.lngLat).setHTML('<h1>'+my_source_id+'</h1>').addTo(map);
            })
            map.on('mouseenter', my_layer_id, function () {
              map.getCanvas().style.cursor = 'pointer';
            });
            //console.log(data)
          })     
    },

  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '~maplibre-gl/dist/maplibre-gl.css';

.map-container {
  position: absolute; top: 0; bottom: 0;  left: 0; right:0;
  height: 100%;
  width: 100%;
  margin: 0; padding: 0;
}
</style>
