<template>
  <div>
    <div class="row">
      <div class="text-h4 q-ma-md">Project Wall</div>
    </div>
    <template>
      <div class="q-ma-md">
        <q-scroll-area ref="scrollArea" style="height: 400px">
          <q-card class="q-ma-sm" flat v-for="post in updateProj.wall" :key="post.id" :class="getClass(post)">
            <q-card-section dense>
              <div class="row">
                <div class="text-bold q-ma-sm">{{ post.user }}</div>
                <div class="text-caption q-ma-sm">{{ post.time }}</div>
                <q-space/>
                <q-btn round flat v-if="getCurrentUser().username === post.user" icon="delete" color="secondary" @click="deletePost(post.id)" size="sm" />
              </div>
            </q-card-section>
            <q-separator inset />
            <q-card-section class="q-ma-sm" v-html="post.post" />
          </q-card>
        </q-scroll-area>
      </div>
    </template>
    <div class="q-pa-md">
      <form
          v-if="addPost===true"
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
      >
        <q-editor
            v-model="editor"
            min-height="5rem"
            :toolbar="[
              ['bold', 'italic', 'strike', 'underline'],
              ['hr', 'link'],
              ['unordered', 'ordered'],
              ['undo', 'redo']
            ]"
          />
        </form>
        <div class="row">
          <q-space/>
          <q-btn v-if="addPost===false" label="Add post" class="q-ma-md" color="secondary" icon="edit" @click="addPost=true" />
        </div>
        <div class="row q-ma-md" v-if="addPost===true">
            <q-space />
            <q-btn label="Post" color="teal" @click="updateWall()" />
        </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ProjectWall',
  data () {
    return {
      editor: '',
      addPost: false,
      updateProj: {
        name: '',
        users: [],
        description: '',
        documentation: '',
        wall: [],
        _id: ''
      }
    }
  },
  props: {
    project: {
      type: Object
    }
  },
  mounted () {
    this.updateProj = this.$props.project
  },
  methods: {
    ...mapActions('project', [
      'updateProject'
    ]),
    ...mapGetters('user', [
      'getCurrentUser'
    ]),
    deletePost (postId) {
      console.log('postId')
      console.log(postId)
      var updatedPosts = []
      for (var i = 0; i < this.updateProj.wall.length; i++) {
        console.log(this.updateProj.wall[i])
        if (postId === this.updateProj.wall[i].id) {
          console.log('delete this one')
        } else {
          this.updateProj.wall[i].id = updatedPosts.length
          updatedPosts.push(this.updateProj.wall[i])
        }
      }
      console.log(updatedPosts)
      this.updateProj.wall = updatedPosts
      this.updateProject(this.updateProj)
    },
    updateWall () {
      var currentTime = this.formatDate()
      var post = {
        id: this.updateProj.wall.length,
        user: this.getCurrentUser().username,
        post: this.editor,
        time: currentTime
      }
      this.updateProj.wall.push(post)
      console.log(this.updateProj.wall)
      this.updateProject(this.updateProj)
      this.addPost = false
    },
    formatDate () {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      var today = new Date()
      var date = today.getDate() + ' ' + monthNames[today.getMonth()] + ' ' + today.getFullYear()
      if (today.getMinutes() < 10) {
        return date + ', ' + today.getHours() + ':0' + today.getMinutes()
      } else {
        return date + ', ' + today.getHours() + ':' + today.getMinutes()
      }
    },
    getClass (post) {
      if (post.user === this.getCurrentUser().username) {
        return 'postBlue'
      } else {
        return 'postGrey'
      }
    }
  }
}
</script>
<style>
.postBlue {
  width: 90%;
  background-color: lightblue;
  float: right;
}
.postGrey {
  width: 90%;
  background-color: lightgray;
  float: left;
}
</style>
