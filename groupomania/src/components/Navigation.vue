
<script>
export default {
	name: 'Navigation'
}
</script>
<template>
  <div id="informationsUser">
    <!--list acceder aux différentes parties du site-->
    <ul>
      <li>
        <div class="people">
          <img src="../../assets/user-alt-solid.svg" alt="icone" title="icone" />
          <p>People</p>
        </div>
      </li>
      <li>
        <div class="posts">
          <img src="../../assets/comments-solid.svg" alt="icone" title="icone" />
          <p>Posts</p>
        </div>
      </li>
      <li>
        <div class="location">
          <img src="../../assets/map-marker-alt-solid.svg" alt="icone" title="icone" />
          <p>Location</p>
        </div>
      </li>
      <li>
        <div class="groups">
          <img src="../../assets/user-friends-solid.svg" alt="icone" title="icone" />
          <p>Groups</p>
        </div>
      </li>
      <li>
        <div class="inbox">
          <img src="../../assets/envelope-solid.svg" alt="icone" title="icone" />
          <p>Inbox</p>
        </div>
      </li>
    </ul>
    <!-- fin list-->
    <!--divider-->
    <span class="divider"></span>
    <!--list acceder aux reglages et aide du site-->
    <ul>
      <li>Settings</li>
      <li>Help</li>
    </ul>
    <!-- fin list-->
    <span class="divider"></span>
  </div>
</template>
<style lang="scss">
#informationsUser {
    padding: 0 2%;
    ul {
        padding: 0;
        width: 22%;
        li {
            list-style: none;
            font-weight : bold;
            .people, .posts, .location, .groups, .inbox {
                margin-right: 10px;
                display: flex; 
                flex-direction : row;
                justify-content: space-evenly;
                img {
                    width : 10%;
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
        width: 22%;
    }
    ul:nth-child(3n) {
        padding-left: 75px;
        li {
            margin: 30px 0;
            text-align: left;
        }
    }
}
</style>