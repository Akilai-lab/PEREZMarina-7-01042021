<script>
import axios from "axios"; 
export default {
  name: 'Home',
    data() {
    return {
      localStorage : localStorage.getItem('token'),
      auth : Boolean,
      info : [],
      loadForum : false,
      userAuth : true
    };
  },
  methods: {
    deleteAccount() {
      /* */ 
      const monObjet = JSON.parse(localStorage.getItem('token'));
      let auth = 'bearer' + " " + monObjet.token;
      console.log(auth);
      let test = localStorage.clear();
      console.log(test);
      axios.delete("http://localhost:3030/api/user/deleteAccount", {
        headers: {
          'Authorization': auth
        }
      }) 
      .then(function (response) {
        localStorage.clear();
        console.log(response);
        alert('votre compte a été supprimé');
        console.log("l'utilisateur est désinscrit")
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    deconnected(e) {
      //la méthode ne se lance pas pourquoi?
      console.log('tentative déconnection')
      e.preventDefault();
      console.log(this.localStorage);
      localStorage.clear();
      window.location.replace('Login#/Login');
    },
    dothis(){
      this.loadForum = true;
      /**/ 
        axios.get("http://localhost:3030/api/post")
        //on crée une route get
        .then(response => {
          window.location.replace('Login#/Forum'); 
          /** bouton envoi commentaire **/
          console.log(response)
          /** bouton répondre à un post **/
        })
    }
  },
  created(){
    this.auth = false;
    console.log(localStorage.getItem('token'))  
    if(localStorage.getItem('token')===null) {
      this.auth = false
      //Redirection connexion
      this.$router.push('Login')
    }
    if(localStorage.getItem('token')!=null) {
      this.auth = true
    }
  } 
}
</script>
<template>
  <div id="app">
    <header>
    <router-link to="/"><img src="../assets/icon-left-font.png" alt="logo" title="GroupomaniaLogo" /></router-link>
      <span v-if="auth == false">
        <ul>
          <li>
            <router-link to="/">S'inscrire</router-link>
          </li>
          <li>
            <router-link to="/Login">Se connecter</router-link>
          </li>
        </ul>
        </span>
        <!----><span v-if="auth == true">
        <ul>
          <li v-on:click="deleteAccount">Se désinscrire</li>
          <!--Créer un fonction pour supprimer son compte, la route delete est déjà créée-->
          <li v-on:click="deconnected">Se déconnecter</li>
          <!--Créer une fonction pour se déconnecter-->
        </ul>
      </span>
    </header>
    <div class="blocInfo">
      <div id="informationsUser">
        <!--list acceder aux différentes parties du site-->
        <ul class="params" v-if="auth == false" style="display: none;">
        </ul>
        <ul class="params" v-if="auth == true">
          <li>
            <div class="myAccount">
              <img src="../assets/user-alt-solid.png" alt="icone" title="icone" />
              <router-link to="/Account">Account</router-link>
            </div>
          </li>
          <li>
            <div class="msg">
              <img src="../assets/comments-solid.png" alt="icone" title="icone" />
              <router-link to="Forum">Forum</router-link>
              <!-- <div v-on:click="dothis">Forum</div> -->
            </div>
          </li>
          <li>
            <div class="groups">
              <img src="../assets/user-friends-solid.png" alt="icone" title="icone" />
              <router-link to="/Utilisateurs">Utilisateurs</router-link>
            </div>
          </li>
        </ul>
      </div>
    <router-view/>
  </div>
</div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #ff572214;
header {   
    display: flex;
    align-items: center;
    a {
      font-weight: bold;
      color: black;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: space-around;
      img {
        width: 170px;
        margin-right: auto;
      }
      &.router-link-exact-active {
        color: black;
        width: 102px;
      }
    }
    ul {
        list-style: none;
        display: flex;
        padding: 0;
        position: relative;
        right: 120px;
        li {
            display: flex;
            align-items: center;
            margin: 0 10px;
        }
    
    }
}
.search {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 2%;
        margin: 0 20px;
    }
    input {
        width: 400px;
    }
}
.blocInfo {
  display: flex; 
  flex-wrap: wrap;
  #informationsUser {
      padding: 0 2% 70px 2%;
      float: left;
      width: 12%;
      box-shadow: 2px 2px 2em;
      margin-top: 40px;
      ul {
          padding: 0;
          width: 80%;
          li {
              list-style: none;
              font-weight : bold;
              .myAccount, .msg, .location, .groups, .inbox {
                  margin-right: 10px;
                  display: flex; 
                  flex-direction : row;
                  justify-content: flex-start;
                  align-items: center;
                  img {
                    margin-right: 10px;
                    width: 14%;
                    height: 2%;
                  }
                  a{
                    color: black;
                    text-decoration: none;
                    margin: 10px 0;
                  }
                  p {
                      width: 50%;
                      text-align: left;
                  }
              }
          }
      }
      .divider {
          display: block;
          height: 2px;
          background-color: black;
          width: 55%;
      }
      ul:nth-child(3n) {
          li {
              margin: 30px 0;
              text-align: left;
          }
      }
    }
  }
}
//responsive tablette
@media all and (min-width: 768px) {
  #app {
    flex-wrap: nowrap;
    header {
      justify-content: space-between;
      ul {
        li {
          font-weight: bold;
        }
      }
    }
    .blocInfo {
      display: block;
      #banniere {
        width: 78%;
      }
    }
  }
}
//responsive mobile
@media all and (max-width: 767px) {
  #app {
    header {
      display: block;
      ul {
        position: inherit;
        li {
          font-weight: bold;
        }
      }
    }
    .blocInfo {
      #informationsUser {
        display: flex;
        padding: 0 2%;
        width: inherit;
        .params {
          display: flex;
          width: auto;
          li {
            margin: 3px 2%;
            .inbox {
              margin-right: initial;
              display: block;
            }
            .myAccount {
              justify-content: space-evenly;
            }
          }
        }
        .divider {
          display: none;
        }
        ul {
          display: none;
        }
      }
    }
  }
}
@media all and (max-width: 420px) {
  .myAccount, .msg, .groups{
    flex-direction: column !important;
  }
  .myAccount img, .msg img, .groups img {
    width: 30% !important;
  }
}
</style>