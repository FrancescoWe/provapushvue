<template>
  <div>
    <Test v-if="my_items" id="popup" :items="my_items" ref="htmlPopup" :open="my_open_quest" :validate="my_validate_quest" />
    <div class="map-container" ref="myMapp"></div>   
  </div>
</template>

<script>
import maplibre from 'maplibre-gl';
import Test from './Test.vue'


export default {
  name: "MyTiles",
  components:{
    Test,
  },
  data(){
    return{my_items:null, page:this, first_time:0, my_open_quest:null, my_validate_quest:null}
  },
  mounted: async function(){
    const ref=this
    const mapStyle = 'https://api.maptiler.com/maps/streets/style.json?key=S1aB9ElJLePXra57G3cm';
    console.log(mapStyle)
    const initialState = {
      lng: 11.194239,
      lat: 46.052415,
      zoom: 16
    };

    const map = new maplibre.Map({
      container: this.$refs.myMapp,
      style: `${mapStyle}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
    //const my_data_path = "../../src/assets/newTry"
    var my_url_array = ["http://localhost:5000/tippecanoe/newTry/935556427/{z}/{x}/{y}.pbf", "http://localhost:5000/tippecanoe/newTry/201175004/{z}/{x}/{y}.pbf"]
    console.log(my_url_array)
    /*var my_url_array = [];
    my_url_array = await this.getAllUrls(function(){
      console.log("finished")
    })
    console.log(my_url_array)*/
    map.addControl(new maplibre.NavigationControl());
    map.on('load',function(){
      map.resize();
      map.addSource('my_ways',{
          type:'vector',
          //tiles:["http://localhost:8081/MergingJsonFiles/allTogetherNow/{z}/{x}/{y}.pbf"],
          //tiles:["http://localhost:8081/prove_con_tippecanoe/22327488/{z}/{x}/{y}.pbf"], //FUNZIONA
          //tiles: my_url_array,
          //tiles: ["http://localhost:5000/tippecanoe/allWaysMB.mbtiles"],
          //tiles: [new URL("./newTry", window.location.href).href + "/{z}/{x}/{y}.pbf"],
          //tiles:["http://localhost:5000/tippecanoe/allWays/{z}/{x}/{y}.pbf"], //["http://localhost:8081/tippecanoe_funzionante/allWays/{z}/{x}/{y}.pbf"], 
          tiles:["https://spatialite-database-bicycle.herokuapp.com/tippecanoe/allWays/{z}/{x}/{y}.pbf"],
          //'minzoom': 6,
          'maxzoom': 17,
      });
      map.addLayer({
        'id': "my_way_data",
        'type': 'line',
        'source': 'my_ways',
        'source-layer': 'combined',
        'maxzoom':17,
        'minzoom' : 5,
        'layout':{
                'line-join': 'round',
                'line-cap': 'round'
              },
              'paint': {
                'line-color': ["get","color"],
                'line-width': 7,
              }
      })
      this.mappa=map //////////////////////////////////////////////////7
      map.on('click', 'my_way_data',function(e){
        console.log(map.getLayer("combined"))
        console.log(e.features[0])
        console.log(e)
        //qua dovrei fare na chiamata e aspettare la risposta per poi caricare le doamnde corrispondenti al dato elemento.
        ref.getQuestion(e.features[0].properties.id,"WAY").then(items =>{
          const open_list = []
          const validate_list = []
          if(items.length!=0){
            for(var i in items){
              if(items[i].VALIDATING=="no"){
                open_list.push(items[i])
              }else{
                validate_list.push(items[i])
              }
            }
            ref.my_items = items;
            ref.my_open_quest = open_list;
            ref.my_validate_quest = validate_list
            //console.log("yo"+ref.my_items)
            //console.log(ref.$refs.htmlPopup)
            ref.$nextTick(()=>{
              new maplibre.Popup().
              setLngLat(e.lngLat).
              setDOMContent(ref.$refs.htmlPopup.$el).
              //setHTML(ref.$refs.htmlPopup.$el.outerHTML).
              addTo(map);
            })
          }        
        })

      })
      map.on('mouseenter', 'my_way_data', function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.addSource('my_nodes',{
          type:'vector',
          //tiles:["http://localhost:8081/MergingJsonFiles/allTogetherNow/{z}/{x}/{y}.pbf"],
          //tiles:["http://localhost:8081/prove_con_tippecanoe/provetta/{z}/{x}/{y}.pbf"], //FUNZIONA
          //tiles: ["http://localhost:8081/MergingJsonFiles/allTogetherNow/{z}/{x}/{y}.pbf"], //FUNZIONA
          tiles: ["http://localhost:5000/tippecanoe/allNodes/{z}/{x}/{y}.pbf"],//["http://localhost:8081/tippecanoe_funzionante/allNodes/{z}/{x}/{y}.pbf"], 
          //'minzoom': 6,
      });
      map.addLayer({
        'id': "my_node_data",
        'type': 'symbol',
        'source': 'my_nodes',
        'source-layer': 'combinedNodes',
        'layout':{
                'icon-image': 'my_icon',
                'icon-size' :0.08,
              }
      })
      //https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png
      map.loadImage(require('@/assets/images/placeholder.png'),function(error,image){
        if(error) throw error;
        map.addImage('my_icon', image);
      });
      map.on('click', 'my_node_data',function(e){
        //qua dovrei fare na chiamata e aspettare la risposta per poi caricare le doamnde corrispondenti al dato elemento.
        ref.getQuestion(e.features[0].properties.id,"NODE").then(items =>{
          const open_list = []
          const validate_list = []
          if(items.length!=0){
            for(var i in items){
              if(items[i].VALIDATING=="no"){
                open_list.push(items[i])
              }else{
                validate_list.push(items[i])
              }
            }
            ref.my_items = items;
            ref.my_open_quest = open_list;
            ref.my_validate_quest = validate_list
            //console.log("yo"+ref.my_items)
            //console.log(ref.$refs.htmlPopup)
            ref.$nextTick(()=>{
              new maplibre.Popup().
              setLngLat(e.lngLat).
              //setHTML(my_html).
              setDOMContent(ref.$refs.htmlPopup.$el).
              //setHTML(ref.$refs.htmlPopup.$el.outerHTML).
              addTo(map);
            })
          }
        })
        //new maplibre.Popup().setLngLat(e.lngLat).setHTML('<h1> it is a node with id: ' + e.features[0].properties.id + '</h1>').addTo(map);
        //console.log(e)
        //console.log(e.features[0].properties.id)
        //console.log(e.features[0].properties.color)
      })
      map.on('mouseenter', 'my_node_data', function () {
        map.getCanvas().style.cursor = 'pointer';
      });
    }) 

    const markerPopup = new maplibre.Popup().setText('Some marker');
    new maplibre.Marker().setLngLat([initialState.lng, initialState.lat]).setPopup(markerPopup).addTo(map);

  },
  methods:{
    async getQuestion(id, node_or_way){
      try{
        const my_url = "http://localhost:5000/posts/"+id+"&"+node_or_way
        const requestSpatialite = {
          method:"get",
          headers:{ "Content-Type":"application/json"},
        };
        const fetchdata = await fetch(my_url,requestSpatialite)
          .then(response => response.json())
          .then((new_response_data)=>{
            console.log(new_response_data); 
            return new_response_data;
          }).catch((err)=>console.log(err)) 
          return fetchdata
      }catch(e){
        alert("Error init");
      }
    },

    /*doSomething(){
      console.log("awimmawe")
      console.log(this.$refs.htmlPopup.$el.outerHTML)
      const ref=this
      console.log("DOING")
      this.mappa.on('click', 'my_way_data',function(e){
        //qua dovrei fare na chiamata e aspettare la risposta per poi caricare le doamnde corrispondenti al dato elemento.
        console.log(this)
        ref.getQuestion(e.features[0].properties.id,"WAY").then(items =>{
          ref.my_items = items;
          console.log("AAAAAAAAAAAAAAA")
          console.log("yo"+ref.$refs.htmlPopup.items)
          console.log(ref.page.$refs.myMapp)
          console.log(ref.$refs.htmlPopup)
          console.log("yo"+ref.$refs.htmlPopup.$el.outerHTML) 
          new maplibre.Popup().
            setLngLat(e.lngLat).
            setHTML(ref.$refs.htmlPopup.$el.outerHTML).
            addTo(this.mappa);
        })
      })
    },*/
    async getAllUrls(_callback){
      try{
        const my_url = "http://localhost:5000/posts/geturls"
        const requestSpatialite = {
          method:"get",
          headers:{ "Content-Type":"application/json"},
        };
        const fetchdata = await fetch(my_url,requestSpatialite)
          .then(response => response.json())
          .then((new_response_data)=>{
            console.log(new_response_data); 
            return new_response_data;
          }).catch((err)=>console.log(err)) 
          _callback();
          return fetchdata
      }catch(e){
        alert("Error init");
      }
    },

    createHTML(item){
      for(const i in item){
        this.createQuestion(item[i])
      }
      return '<h1> THIS IS MY QUESTION: <h1>'+'<p>'+item[0].QUESTION+'</p>'
    },

    createQuestion(item){
      //if(item.)
      //console.log(item.QUESTION);
      if(item.VALIDATING == "yes"){
        this.createValidatingQuest(item)
      }else{
        this.createNormalQuest(item)
      }
    },

    createValidatingQuest(item){
      console.log(item.QUESTION);
    },

    createNormalQuest(item){
      console.log(item.QUESTION);
    },

    /*popupclicked () {
      console.log("Popup clicked");
    }*/
  }
}

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
