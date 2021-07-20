<template>
  <div class="forum">
    <div class="allMyUtilisateurs">
        <h2>Les utilisateurs Groupomania</h2>
        <div class="Utilisateurs">
            <div class="utilisateur" v-for="u of user" :key="u">
                <div class="user" v-if="u.id === id">
                    <div class="picture" v-bind:style="{'background-image':'url(' + picture +')'}"></div>
                    <p>{{ u.name }}</p>
                    <p>{{ u.lastName }}</p>
                    <!--<router-link to="/Account" v-on:click="doanything">Account</router-link>-->
                    <router-link @click.native="moreInfo(u)" v-bind:to="'/accountAdmin/'+ u.id" style="color: white;background-color: cadetblue;padding: 10px 20px;border-radius: 50%;">join-us</router-link>
                    <!-- Si le status de l'user est admin alors ajouter un button de suppression de profil -->
                    <div class="delete" v-if="userId == 11" @click="deleteUser(u.id)">
                    </div>
                </div>
                <div class="pictureOut" v-if="u.id != id">
                    <div class="pictureNone">
                        <p>?</p>
                    </div> 
                    <p>{{ u.name }}</p>
                    <p>{{ u.lastName }}</p>
                    <!--<router-link to="/Account" v-on:click="doanything">Account</router-link>-->
                    <router-link @click.native="moreInfo(u)" v-bind:to="'/accountAdmin/'+ u.id" style="color: white;background-color: cadetblue;padding: 10px 20px;border-radius: 50%;">join-us</router-link>
                    <!-- Si le status de l'user est admin alors ajouter un button de suppression de profil -->
                    <div class="delete" v-if="userId == 11" @click="deleteUser(u.id)">
                    </div>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import Utilisateurs from '@/components/Utilisateurs.vue'
import axios from "axios"; 
export default {
    name: 'MyUtilisateurs',
    data() {
        return {
            user : null,
            picture : null,
            id : null,
            userId : null
        };
    },
    mounted(){
        /**On veux récupérer tous les users enregistrés dans la bdd */
        axios.get("http://localhost:3030/api/user/all")
        //récupére les infos présents sur api/account/id
        .then(response => {
            console.log(response)
            this.user = response.data;
            console.log(this.user);
            this.userId = localStorage.getItem('userId')
        })
        .catch((error) => {
            console.log(error);
        });
    },
    created() {
        const monObjet = JSON.parse(localStorage.getItem('token'));
        let auth = 'bearer' + " " + monObjet.token;
        axios.get("http://localhost:3030/api/account/",{
            headers: {
                'Authorization': auth
            }
        })
        .then(response => {
            console.log(response.data);
            this.picture = response.data.media;
            this.id = response.data.userId;
            console.log(this.picture);
            console.log(this.userId)
        })
        .catch(function (error) {
            this.output = error;
        });
    },
    methods: {
        moreInfo(u) {
            let id = u.id
            axios.get(`http://localhost:3030/api/account/${id}`)
            .then(function (response) {
                console.log(response);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        deleteUser(u){
            let iduser = u;
            const monObjet = JSON.parse(localStorage.getItem('token'));
            let auth = 'bearer' + " " + monObjet.token;
            console.log(auth);
            axios.delete("http://localhost:3030/api/user/deleteAnyAccount", {
                data: {iduser},
                headers: {
                    'Authorization': auth
                }
            }) 
            .then(function (response) {
                console.log(response);
                alert('votre compte a été supprimé');
                console.log("l'utilisateur est désinscrit")
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>
<style lang="scss">
    h2 {
      margin-top: 40px;
    }
    .Utilisateurs {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        margin-top: 50px;
        .popUp {
            visibility: hidden;
        }
        .utilisateur {
            height: 200px;
            width: 150px;
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
            margin: 10px 70px;
            .user {
                height: 200px;
                width: 150px;
                .picture {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 200px;
                    width: 150px;
                    background-position: center;
                    background-size: cover;
                    background-repeat: no-repeat;
                    opacity: 70%;
                }
            }
            p {
                color: black;
            }
            a {
                color: black;
                text-decoration: none;
                margin-bottom: 10%;
                &:hover {
                    .popUp {
                        visibility: visible;
                    }
                }
            }
            .pictureOut {
                height: 200px;
                width: 150px;
                .pictureNone {
                    height: inherit;
                    width: auto;
                    background-color: grey;
                    display: flex;
                    justify-content: center;
                    p {
                        color: white;
                        font-size: 65px;
                    }
                }
            }
            a {
                color: black;
                text-decoration: none;
                margin-bottom: 10%;
                &:hover {
                    .popUp {
                        visibility: visible;
                    }
                }
            }
            .delete {
                background-image: url('./../assets/icones/trash-alt-regular.svg');
                width: 20px;
                height:20px;
                background-repeat: no-repeat;
                background-size: cover;
                margin: 15% auto;
            }
        }
    }
@media all and (min-width: 768px) {
    .allMyUtilisateurs {
        height: 600px;
    }
}                                
//responsive mobile
@media all and (max-width: 767px) {
    .allMyUtilisateurs {
        height: 900px;
        .Utilisateurs {
            .utilisateur {
                margin: 0 70px 170px 70px;
            }
        }
    }
}
</style>