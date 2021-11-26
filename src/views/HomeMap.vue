<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>HomePage</ion-title>
      </ion-toolbar>
    </ion-header> 
    <ion-content class = "ion-padding">
        <MyMap/>
    </ion-content>
  </div>
</template>

<script>
  // @ is an alias to /src
  import MyMap from "../components/MyMap";
  //console.log("called once");
  export default {
    name: 'HomeMap',
    components: { MyMap }
  }
</script>
