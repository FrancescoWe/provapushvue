<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header> 
    <ion-content class = "ion-padding">
      <ZipSearch/>
    </ion-content>
    <BottomNav/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import ZipSearch from "../components/ZipSearch";
  import BottomNav from "../components/BottomNav";

  export default {
    name: 'Home',
    components: { ZipSearch, BottomNav },
    /*async created(){
        try{
          const requestSpatialite = {
            method:"post",
            headers:{ "Content-Type":"application/json"},
            body: JSON.stringify({"latitude": "46.052415", "longitude": "11.194239"})
          };
          fetch("http://localhost:5000/posts/",requestSpatialite)
            .then(response => response.json())
            .then((data)=>{
              console.log(data);
            }).catch((err)=>console.log(err))
        }catch(e){
          alert("Error init");
        }
    }*/
  }

</script>
