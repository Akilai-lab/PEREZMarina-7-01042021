<script>
import axios from "axios"; 
import FormData from 'form-data';
export default {
	name: 'Forum',
    data() {
      return {
        donneesText : {
            img: ""
        },
        message : "",
        info : [],
        comment : "",
        newComment: "",
        repeat: false,
        test: null,
        result: null,
        newResult:null,
        comResult: null,
        commentsShow: null,
        postIdShow: false,
        modifPost : false,
        modifCom : false,
        newMessage : null,
        userId : null,
        status : null,
        idUser : null,
        userNameUser: "",
        arrayPost: [],
        arrayPostDetails: [],
        isModifyPost : false,
        isModifyComment : false 

      };
    },
    methods: {
        addPost() {
            var formData = new FormData();
            let img = document.getElementById('picture').files[0];
            if(img && this.message != "") {
                formData.append('picture', img);
                formData.append('message', this.message);
            }
            else if(img) {
                formData.append('picture', img);
            }
            else if(this.message != "") {
                formData.append('message', this.message);
            }
            
            console.log(...formData);
            console.log(img);
            const monObjet = JSON.parse(localStorage.getItem('token'));

            let auth = 'bearer' + " " + monObjet.token;
            console.log(auth);
            axios.post("http://localhost:3030/api/post", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': auth
                }
            })
            .then(function (response) {
                console.log(response);
                console.log(auth);
            })
            .then(()=> {
                window.location.replace('/Forum');
            })
            .catch(function (error) {
                this.output = error;
            });
        },
        addComment(item) {
            document.getElementById('info').style.display="block";
            document.getElementById('form').style.display="block";
            for(let i of this.test) {
                if(item.id===i.id){   
                    document.getElementById('info').style.position="fixed";
                    document.getElementById('info').style.zIndex="2";
                    document.getElementById('info').style.bottom="30%";
                    document.getElementById('info').style.width="35%";
                    document.getElementById('info').style.border = "1px solid blueviolet";
                    document.getElementById('info').style.backgroundColor = "antiquewhite";
                    document.getElementById('info').style.display = "flex";
                    document.getElementById('info').style.flexDirection = "column-reverse";
                    document.getElementById('info').style.margin = "0 15%";
                    document.getElementById('info').innerHTML+=`
                    <h2>${item.id}</h2>
                    <p>${item.message}</p>
                    <img src="${item.media}" />
                    <p>${item.date}</p>
                    `
                    this.result = item.id;
                    return this.result;
                }
            }
        },
        publish() {
            console.log('hey');
            console.log(this.comment)
            var formData = new FormData();
            formData.append('postId', this.result);
            formData.append('message', this.comment);
            console.log(...formData);
            const monObjet = JSON.parse(localStorage.getItem('token'));
            let auth = 'bearer' + " " + monObjet.token;
            console.log(auth);
            axios.post("http://localhost:3030/api/comment/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': auth
                }
            })
            .then(function (response) {
                console.log(response);
                console.log(response.data);
                console.log(auth);
            })
            .then(()=> {
                window.location.replace('/Forum');
            })
            .catch(function (error) {
                this.output = error;
            });
        },
        modifPostActu(item) { 
            console.log(item);
            console.log(this.test);
            this.isModifyPost = true;
            this.isModifyComment = true;
            document.getElementById('hidden').style.display = "block";
            for(let i of this.test) {
                if(item===i.id){           
                    this.newResult = item;
                    console.log(this.newResult)
                    return this.newResult;
                }
            }
        },
        modifyPost() {
            console.log(this.newResult);
            var formData = new FormData();
            formData.append('postId', this.newResult);
            let nextImg = document.getElementById('newPicture').files[0];
            if(nextImg != undefined) {
                formData.append('picture', nextImg);
            }
            if(this.newMessage != null) {
                formData.append('message', this.newMessage);
            }
            console.log(...formData);
            const monObjet = JSON.parse(localStorage.getItem('token'));
            let auth = 'bearer' + " " + monObjet.token;
            console.log(auth);
            axios.put("http://localhost:3030/api/post", formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': auth
                }
            })
            .then(function (response) {
                console.log(response);
                console.log('response');
                console.log(auth);
            })
            .then(()=> {
                document.getElementById('hidden').style.display = "none";
                window.location.replace('/Forum');
            })
            .catch(function (error) {
                this.output = error;
            });
        },
        deletePost(item) {
            console.log(item);
            let idpost = item;
            const monObjet = JSON.parse(localStorage.getItem('token'));
            let auth = 'bearer' + " " + monObjet.token;
            console.log(auth);
            axios.delete("http://localhost:3030/api/post/deletePost", {
                data: {idpost},
                headers: {
                    'Authorization': auth
                }
            }) 
            .then(function (response) {
                console.log(response);
                alert('votre commentaire a été supprimé');
                console.log("le commentaire est supprimé")
            })
            .then(()=> {
                window.location.replace('/Forum');
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        modifComActu(com){
            console.log(com);
            this.isModifyComment = true;
            this.isModifyPost = true;
            document.getElementById('infoHiddenCom').style.display="flex";
            document.getElementById('infoHiddenCom').style.flexDirection="column";
            document.getElementById('infoHiddenCom').style.alignItems="center";       
            for(let i of this.commentsShow) {
                if(com===i.id){   
                    console.log(com)
                    console.log(i.id)
                    this.comResult = com;
                    console.log(this.comResult);
                    return this.comResult;
                }
            }
        },
        modifyComment(com) {
            console.log('hey');
            console.log(com);
            console.log(this.comResult);
            console.log(this.newComment);
            var formData = new FormData();
            formData.append('message', this.newComment);
            formData.append('id', this.comResult)
            console.log(...formData);
            const monObjet = JSON.parse(localStorage.getItem('token'));
            let auth = 'bearer' + " " + monObjet.token;
            console.log(auth);
            axios.put("http://localhost:3030/api/comment", formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': auth
                }
            })
            .then(function (response) {
                console.log(response);
                console.log(auth);
            })
            .then(()=> {
                window.location.replace('/Forum');
            })
            .catch(function (error) {
                this.output = error;
            });
        },
        deleteComment(com) {
            let idcom = com;
            console.log(com);
            const monObjet = JSON.parse(localStorage.getItem('token'));
            let auth = 'bearer' + " " + monObjet.token;
            console.log(auth);
            axios.delete("http://localhost:3030/api/comment/deleteComment", {
                data: {idcom},
                headers: {
                    'Authorization': auth
                }
            }) 
            .then(function (response) {
                console.log(response);
                console.log("le commentaire est supprimé")
            })
            .then(()=> {
                window.location.replace('/Forum');
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    created(){
        const monObjet = JSON.parse(localStorage.getItem('token'));
        let auth = 'bearer' + " " + monObjet.token;
        axios.get("http://localhost:3030/api/user",{
        headers: {
          'Authorization': auth
        }
        })
        .then(response => {
            console.log(response.data)
            this.status = response.data.status;
            console.log(this.status);
            this.userId = response.data.id;
            console.log(this.userId);
            this.userName = response.data.userName;
            localStorage.setItem('userId',this.userId);
            return this.userId;
        })
        .catch(function (error) {
          this.output = error;
        });
        axios.get("http://localhost:3030/api/post")
        .then(response => {
            console.log(response);
            this.test = response.data;
            console.log(this.test);
        })
        .then(()=> {
            axios.get("http://localhost:3030/api/user/all")
            .then(response => {
                console.log(response.data)
                for(let i of response.data) {
                    this.arrayPost = {
                        id : i.id,
                        userName : i.userName
                    }
                    this.arrayPostDetails.push(this.arrayPost)
                }
                console.log(this.arrayPostDetails);
            })
            .catch(function (error) {
            this.output = error;
            });
        })
        .catch(function (error) {
            this.output = error;
        });
        axios.get("http://localhost:3030/api/comment")
        .then(response => {
            this.commentsShow = response.data;
            this.postIdShow = true;
        })
        .catch(function (error) {
            this.output = error;
        });
    }
}
</script>
<template>
    <div id="blocCentral">
        <div class="blocPost">
            <form enctype='multipart/form-data' style="margin:0; width:100%;">
                <input type="text" placeholder="What's on your mind?" v-model="message" style="width:inherit;padding:0;box-shadow: 2px 2px 2em rgb(0 0 0 / 16%);border:none;">
                <div class="bloc">
                    <div class="iconePicture"></div>
                    <input id="picture" accept="image/*" type="file">
                    <button type="button" @click="addPost" style="padding: 10px 12px;color: white;text-transform: uppercase;font-weight: bold;background-color: #ff5722;border: none;border-radius: 20px;">Poster</button>
                </div>
            </form>
        </div>
        <div class="posts">
            <div id="post">
                <div id="blocPost">
                    <div class="ssBloc" v-for="item of this.test" :key="item">
                        <div>
                            <div id="info" style="display:none;">
                            </div>
                            <form id="form" style="display:none;width:83%;width: 35%;margin: 0px 15%;position:fixed;top:70%; z-index:1;">
                                <textarea v-model="comment" style="width:100%;padding: inherit;" rows="12" cols="12">
                                </textarea> 
                                <button type="button" @click="publish()">Envoyer</button>
                            </form>
                        </div>
                        <div class="user">
                            <p class="date">{{ item.date }}</p>
                            <div v-for="info of arrayPostDetails" :key="info">
                                <p v-if="info.id === item.userId">{{info.userName}}</p>
                            </div>
                        </div>
                        <div class ="details">
                            <div class="placement" style="width: 90%;margin: 0 auto;display: flex;justify-content: space-evenly;">
                                <div>
                                    <p>{{item.message}}</p>
                                    <img v-bind:src="item.media" class="img"/>
                                </div>
                                <form id="hidden" enctype='multipart/form-data' style="display: none;width: 60%;left: 28%;margin: auto;position: fixed;background-color: #f7ccbb;padding: 5%;flex-direction: column;align-items: center;border: 2.5px solid orange;">
                                    <input type="text" placeholder="What's on your mind?" v-model="newMessage" style="width: 100%; margin-top:20px;box-shadow: 2px 2px 2em rgb(0 0 0 / 16%);border:none;height: 200px;">
                                    <div class="iconePicture"></div>
                                    <input id="newPicture" accept="image/*" type="file" style="position: relative;bottom: 30px;left: 40px;">
                                    <button type="button" @click="modifyPost(newResult)" style="padding: 10px 12px;color: white;text-transform: uppercase;font-weight: bold;background-color: #ff5722;border: none;border-radius: 20px;">Poster</button>
                                </form>
                                <div class="choice" v-if="status === 1 || userId === item.userId">
                                    <div class="effectIcones" v-if="isModifyPost === false">
                                        <div class="modify" v-on:click="modifPostActu(item.id)">
                                        </div>
                                    </div>
                                    <div class="effectIcones" v-if="isModifyPost === false">
                                        <div class="delete" @click="deletePost(item)">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button @click="addComment(item)" v-if="isModifyPost === false"> Ajouter un commentaire
                
                        </button>
                        <button @click="addComment(item)" v-if="isModifyPost === true|| isModifyComment === true" disabled> Ajouter un commentaire
                
                        </button>
                            <div v-for="com of commentsShow" :key="com">
                                <div class="coms" v-if="com.postId === item.id">
                                    <div style="display: flex;flex-direction: column;align-items: center;">
                                    <div v-for="info of arrayPostDetails" :key="info">
                                        <p v-if="info.id === com.userId">{{info.userName}}</p>
                                    </div>
                                        <p>{{ com.date }}</p>
                                        <p>{{ com.message }}</p>
                                        <div class="choice" v-if="status === 1 || userId === com.userId">              
                                            <!--Ca crée un formulaire pour tous les posts pour les modifier
                                            On veux juste développer un formulaire en fonction de l'icone cliquée-->
                                            <div class="effectIcones" v-if="isModifyComment === false">
                                                <div class="modify" v-on:click="modifComActu(com.id)">
                                                    <!-- On va modifier le commentaire, pour ca il faut récupérer l'id du commentaire-->
                                                </div>
                                            </div>
                                                <!--Ca crée un formulaire pour tous les posts pour les modifier
                                                On veux juste développer un formulaire en fonction de l'icone cliquée-->
                                            <div class="effectIcones" v-if="isModifyComment === false">
                                                <div class="delete" @click="deleteComment(com)">
                                                </div>
                                            </div>
                                        </div>
                                        <p v-if="isModifyComment === true" style="font-weight: bold;"> Modifiez votre commentaire :</p>
                                        <form id="infoHiddenCom" enctype='multipart/form-data' style="display:none;width:80%;margin: auto;height:100%;">
                                            <textarea v-model="newComment" style="width:100%; margin:0 auto;" rows="6">
                                            </textarea>
                                            <button type="button" @click="modifyComment(com.id)">Envoyer</button>
                                        </form> 
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.forum {
    width: 75%;
    margin-top: 40px;
}
.iconePicture {
    content: url("../../assets/camera-retro-solid.png");
    width: 6%;
    margin: 0 10px;
}
.blocPost {
    width: 80%;
    margin-left: 12%;
    box-shadow: 2px 2px 2em;
    input {
        width: 95%;
        border: none;
        padding-left: 30px;
    }
    .moreOptions {
        display: flex;
        margin-top: 10px;
        .iconePicture {
            content: url("../../assets/camera-retro-solid.png");
            width: 2%;
            height: 20px;
            filter: invert(1);
        }
        input {
            padding: 0;
        }
        button {
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
.posts {
    width: 85%;
    margin: 0 10%;
    box-shadow: 2px 2px 2em;
    #post {
        margin: 0 auto;
        background-color: white;
        #blockPost {
            margin: 15px;
            .user {
                display: flex;
                align-items: center;
                justify-content: space-around;
                img {
                    width: 20px;
                }
                p {
                    bottom: 10px;
                }
                p.date {
                    margin-left: auto;
                    margin-right: 10px;
                }
            }
            button {
                position: relative;
                top: 150px;
            }
        }
        .blocPost {
            margin : 10px auto;
        }
        .details {
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            .placement {
                flex-wrap: wrap;
                .choice {
                    display: flex;
                    width: 25%;
                    justify-content: space-evenly;
                    margin: 20px;
                    height: 30px;
                    .effectIcones {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        background-color: #ff5722ab;
                        justify-content: center;
                        align-items: center;
                        display: flex;
                        .modify {
                            background-image : url('./../assets/icones/edit-regular.svg');
                            width: 25px;
                            height: 23px;
                            filter: invert(1);
                            background-repeat: no-repeat;
                            background-size: cover;
                        }
                    }
                    .effectIcones {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        background-color: #ff5722ab;
                        justify-content: center;
                        align-items: center;
                        display: flex;
                        .delete {
                            background-image : url('./../assets/icones/trash-alt-regular.svg');
                            width: 25px;
                            height: 23px;
                            filter: invert(1);
                            background-repeat: no-repeat;
                            background-size: cover;
                        }
                    }
                }
            }
        }
        .img {
            width: 15%;
        }
        button {
            width: 20%;
            padding: 10px 12px;
            color: white;
            text-transform: uppercase;
            font-weight: bold;
            background-color: #ff5722;
            border: none;
            margin-bottom: 2%;
            border-radius: 20px;
        }
        .coms {
            .choice {
                display: flex;
                width: 25%;
                justify-content: space-evenly;
                height: 20px;
                margin: 20px;
                .effectIcones {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    background-color: #ff5722ab;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    .modify {
                        background-image : url('./../assets/icones/edit-regular.svg');
                        width: 25px;
                        height: 23px;
                        filter: invert(1);
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                }
                .effectIcones {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    background-color: #ff5722ab;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    .delete {
                        background-image : url('./../assets/icones/trash-alt-regular.svg');
                        width: 25px;
                        height: 23px;
                        filter: invert(1);
                        background-repeat: no-repeat;
                        background-size: cover;
                    }
                }
            }                
        }
    }
}
@media all and (min-width: 768px) {
    .forum {
        width: 100%;
        #blocCentral {
            display: flex;
            flex-direction: column;
            .blocPost {
                height: 220px;
                display: flex;
                margin: 5% 10%;
                form {
                    height: 220px;
                    input {
                        height: inherit;
                    }
                    .bloc {
                        display: flex;
                        align-items: center;
                        margin: 20px auto;
                        input {
                            height: inherit;
                            position: initial;
                        }
                        #picture {
                            width: 35%;
                        }
                    }
                }
            }
            .posts {
                margin: 5% 10%;
                width: 80%;
                #post {
                    background-color: #ff572214;
                    #blocPost {
                        .ssBloc {
                            background-color: #ffffff9e;
                            margin: 10px 0;
                            background-image: url('./../assets/fondPost.png');
                            border: 2.5px solid white;
                            button {
                                width: 35%;
                            }
                            .coms {
                                background-color: white;
                                border: 1.5px solid #8000008f;
                                margin: 2%;
                            }
                        }
                    }
                    .img {
                        width: 50%;
                    }
                }
            }
        }
    }
}
//responsive tablette
@media all and (max-width: 767px) {
    .forum {
        width: 100%;
        #blocCentral {
            display: flex;
            flex-direction: column;
            .blocPost {
                height: 150px;
                display: flex;
                margin: 5% 10%;
                form {
                    height: 150px;
                    input {
                        width: auto;
                        margin: 0 auto;
                        height: 100%;
                    }
                    .bloc {
                        display: flex;
                        align-items: center;
                        margin-top: 2%;
                        .iconePicture {
                            width: 10%;
                            margin-right: 10px;
                        }
                        input {
                            padding: 0;
                            width: auto;
                            margin-right: 10px;
                            margin-left: 0;
                            height: inherit;
                            position: initial;
                        }
                        #picture {
                            width: 100%;
                        }
                        button {
                            margin-left: 0;
                        }
                    }
                }
            }
            .posts {
                margin: 10%;
                width: 80%;
                #post {
                    background-color: #ff572214;
                    #blocPost {
                        .ssBloc {
                            background-color: #ffffff9e;
                            margin: 10px 0;
                            background-image: url('./../assets/fondPost.png');
                            background-position: bottom;
                            background-repeat: no-repeat;
                            background-size: cover;
                            border: 2.5px solid white; 
                            button {
                                width: 50%;
                                font-size: x-small;
                            }
                            .coms {
                                background-color: white;
                                border: 1.5px solid #8000008f;
                                margin: 2%;
                            }
                        }
                    }
                }
            }
        }
    }
}
@media all and (min-width: 300px) and (max-width: 766px) {
    .forum {
        width: 100%;
        #blocCentral {
            .img {
                width: 95%;
            }
            #hidden {
                left: auto !important;
                top: 20%;
            }
            .choice {
                width: inherit !important;
            }
            .coms {
                #infoHiddenCom {
                    form {
                        left: 20% !important;
                        top: 20% !important;
                    }
                }
                .choice {
                    width: inherit !important;
                    height: inherit;
                    .effectIcones {
                        margin: 5%;
                        width: 55px;
                        height: 47px;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
}
</style>