<template>
    <ion-grid>
        <form @click="onSubmit"> 
            <ion-col>
                <ion-item>
                    <ion-label> Email: </ion-label>
                    <ion-input :value="email_login" @input="email_login = $event.target.value" placeholder="Enter email" name="email_login"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label> Password: </ion-label>
                    <ion-input :value="password_login" @input="password_login = $event.target.value" placeholder = "Enter password" name="password login"></ion-input>
                 </ion-item>
            </ion-col>
            <ion-col>
                <ion-button color = "primary" expand="block">Login</ion-button>
            </ion-col>
        </form>
    </ion-grid>
</template>

<script>
//import alertController from '@ionic/vue';
export default{
    name: "ZipSearch",
    data(){
        return{
            email_login:"",
            password_login:""
        };
    },
    /* eslint-disable */
    methods:{
        onSubmit(e){
            e.preventDefault();
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(this.email_login)==true){
                console.log("ok")
            }else{
                this.showAlert()
                console.log("WORKING?????")
            }
            //I have to check if it is indeed an email
        },
        /*async showAlert(){
            console.log("Showing...");
            let alert = this.$ionic.alertController.create({
                        header: "Enter Email",
                        message: "Please enter a valid email",
                        buttons: ["OK"]
                    })
            await this.alert.present();
            return (await this.alert).present();
        }*/
        showAlert(){
            alert('email_not_in_the_correct_format');
            /*return this.$ionic.alertController.create({
                header: "yo",
                message:"ye",
                buttons: ["ok"]
            }).then(a=>a.present());*/
        }
    }
}
</script>
