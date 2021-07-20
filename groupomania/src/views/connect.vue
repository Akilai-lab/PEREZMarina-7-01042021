<template>
  <div class="mobile">
    <div id="banniere">
    <h1>Connectez-vous</h1>
    <div class="triangle"></div>
    </div>
    <form>
      <div class="mail">
        <label for="email">E-mail</label>
        <input type="email" name="email" id="email" v-model='email'>
      </div>
      <div class="pass">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model='password' required>
      </div>
      <input type="submit" value="se connecter" class="submit"  @click="submit">
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
//import Connection from '@/components/Connection.vue'
import axios from "axios"; 
export default {
  /*name: 'isconnect',
  /*components: {
    Connection
  }*/
  data() {
      return {
        userId: null,
          email : "",
          password : ""
      };
    },
  methods: {
     submit(e) {
       e.preventDefault();
      const params = new URLSearchParams();
      var regPassword = /^(?=.*[A-Za-z])|[^0-9]*|[[A-Za-z\d]{8,}$/;
      if (regPassword.test(this.password) && this.password != "") {
        params.append('password', this.password);
      }
      else {
        //ajouter text d'erreur
        console.log('error password')
        document.getElementById('password').style.border="1.5px solid red";
      }
            //regex email
      var regEmail = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+/;
      if (regEmail.test(this.email) && this.email != "") {
        params.append('email', this.email);
      }
      else {
        //ajouter text d'erreur
        console.log('error email')
        document.getElementById('email').style.border="1.5px solid red";
      }
      console.log(...params);
      if((regEmail.test(this.email) && this.email.value != "")&& (regPassword.test(this.password) && this.password.value != "")) {
        axios.post("http://localhost:3030/api/user/login", params)
        .then(function (response) {
          console.log(response.data);
          const token = JSON.stringify(response.data);
          console.log(token);
          localStorage.setItem('token',token);
          //enregisrer response.data dans le localstorage
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        })
        .then(()=>{
          window.location.replace('/Forum');
        })
        .catch(error => console.log(error))
        }
    }
  }
}
</script>
<style lang="scss">
.mobile {
  width: 75%;
  margin-top: 40px;
  #banniere {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(../../assets/startup-594091_1280.jpg);
    background-repeat: no-repeat;
    height: 340px;
    margin: 0 auto;
    width: 65%;
    background-position: center;
    background-size: cover;
    h1 {
      color: white;
      text-transform: uppercase;
      background-color: #ff5722c9;
      padding: 5%;
    }
    .triangle {
      display: inline-block;
      height: 0;
      width: 0;
      border-top: 50px solid #ff5722c9;
      border-right: 50px solid transparent;
      border-left: 50px solid transparent;
    }
  }
  form {
    margin: 0 auto;
    width: 60%;
    margin-top: 5%;
    .userName, .mail, .pass {
      margin: 0 10px 10px 10px;
      display: flex;
      flex-direction: column;
      label {
        text-align: left;
        margin-bottom: 5px;
      }
    }
    .submit {
      padding: 8px;
      color: white;
      text-transform: uppercase;
      font-weight: bold;
      background-color: #ff5722;
      border: none;
      margin-left: auto;
    }
  }
}
@media all and (min-width: 768px) {
  .mobile {
    width: 100%;
  }
}
//responsive mobile
@media all and (max-width: 767px) {
  .mobile {
    width: 100%;
  }
}
</style>