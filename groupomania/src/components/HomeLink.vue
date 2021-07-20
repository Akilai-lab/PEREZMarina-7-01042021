<script>
import axios from "axios"; 
export default {
  name: 'HomeLink', 
  data() {
    return {
      name : "",
      userName : "",
      lastName : "",
      email : "",
      password : "",
      donnees : {
        checkedNames : [],
        adminChoice: "" //donne true au lieu de Admin
      }
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
      const params = new URLSearchParams();
      //regex name et lastname 
      var regLetters = /^[a-zA-Z '.-]*$/
        ///^[a-zA-Z '.-]*$/
      if (regLetters.test(this.name) && this.name != "") {
        params.append('name', this.name);
      }
      else {
        //ajouter text d'erreur
        console.log('error name')
        document.getElementById('name').style.border="1.5px solid red";
      }
      if (regLetters.test(this.userName) && this.userName != "") {
        params.append('userName', this.userName);
      }
      else {
        //ajouter text d'erreur
        console.log('error userName')
        document.getElementById('userName').style.border="1.5px solid red";
      }
      if (regLetters.test(this.lastName) && this.lastName != "") {
        params.append('lastName', this.lastName);
      }
      else {
        //ajouter text d'erreur
        console.log('error lastName')
        document.getElementById('lastName').style.border="1.5px solid red";
      }
      //regex mot de passe
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
      if (regEmail.test(this.email)  && this.email != "") {
        params.append('email', this.email);
      }
      else {
        //ajouter text d'erreur
        console.log('error email')
        document.getElementById('email').style.border="1.5px solid red";
      }
      //exemple utilisation regex
        //var re = new RegExp("^[a-zA-Z0-9]+$", "g");
          //if(!re.test(str)) return false;   

        //var er = /([\w-\.]+@[\w\.]+\.{1}[\w]+)/;
          //if (er.test(email)) document.write("valide");   
      /*params.append('name', this.name);
      params.append('userName', this.userName);
      params.append('lastName', this.lastName);
      params.append('email', this.email);
      params.append('password', this.password);*/
      //params.append('status', this.checkedNames)
      console.log(params);
      if(
        (regEmail.test(this.email) && this.email.value != "")
        && (regPassword.test(this.password) && this.password.value != "")
        && (regLetters.test(this.name) && this.name.value != "")
        && (regLetters.test(this.userName) && this.userName.value!="")
        && (regLetters.test(this.lastName) && this.lastName.value!="")
        ) {
        axios.post("http://localhost:3030/api/user/signup", params)
        .then(function (response) {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        })
        .then(()=>{
          window.location.replace('/Forum');
        })
        .catch(function (error) {
          this.output = error;
        });
      }
    }
  }
}
</script>
<template>
  <div class="mobile">
    <div id="banniere">
      <h1>Nous rejoindre</h1>
      <div class="triangle"></div>
    </div>
    <form>
      <!-- profil admin = 
        lastName = lastNameAdmin
        Name = nameAdmin
        userName = userNameAdmin
        email = emailAdmin@admin.fr
        password = passwordAdmin
        chekboxAdmin = Admin //true, ce que je veux est afficher Admin
      -->
      <!-- profil user = 
        lastName = lastNameUser
        Name = nameUser
        userName = userNameUser
        email = emailUser@User.fr
        password = passwordUser
      -->
      <!--
        userName = Akilai
        email = akilaroha@hotmail.fr
        password = matchou1254
      -->
      <div class="form-group">
        <label for="lastName">Lastname</label>
        <input type="text" name="lastName" id="lastName" v-model="lastName" required>
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" type="text" name="name" id="name" required>
      </div>
      <div class="form-group">
        <label for="userName">User Name</label>
        <input type="text" name="userName" id="userName" v-model="userName" required>
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" name="email" id="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password" required>
      </div>
      <!--<div class="form-group">
        <input type="checkbox" id="admin" name="admin" v-model="checkedNames">
        <label for="admin">Admin</label>
      </div>-->
      <input type="submit" class="submit" @click="submit">
    </form>
  </div>
</template>

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
    .form-group {
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
  //responsive tablette
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