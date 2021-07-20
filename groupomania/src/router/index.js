import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Forum from '../views/About.vue'
import Connection from '../views/connect.vue'
import Account from '../views/Profil.vue'
import AccountAdmin from '../views/accountAdmin.vue'
import Groups from '../views/Utilisateurs.vue'
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes : [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Forum',
      name: 'Forum',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Forum
    },
    {
      path: '/Login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Connection
    },
    {
      path: '/Account',
      name: 'MyAccount',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Account
    },
    {
      path: '/AccountAdmin/:id',
      name: 'AccountAdmin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AccountAdmin,
      props: (route) => ({ id: route.query.id }) 
    },
    {
      path: '/Utilisateurs',
      name: 'Utilisateurs',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Groups
    }
  ]
})