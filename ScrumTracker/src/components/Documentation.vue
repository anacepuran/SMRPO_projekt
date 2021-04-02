<template>
    <div>
        <div class="row">
            <div class="text-h4 q-ma-md">Documentation</div>
            <q-space />
            <q-btn v-if="editDocumentation===false" label="Edit documentation" class="q-ma-md" color="primary" icon="edit" @click="editDocumentation=true" />
        </div>
        <div class="q-pa-md">
            <form
                v-if="editDocumentation===true"
                autocorrect="off"
                autocapitalize="off"
                autocomplete="off"
                spellcheck="false"
            >
                <q-editor
                    v-model="editor"
                    min-height="5rem"
                    :definitions="{
                        export: {
                          icon: 'save',
                          label: 'export',
                          handler: exportFile
                        },
                        import: {
                          icon: 'cloud_upload',
                          label: 'Import',
                          handler: importFile
                        }
                    }"
                    :toolbar="[
                    [
                    {
                        label: $q.lang.editor.align,
                        icon: $q.iconSet.editor.align,
                        fixedLabel: true,
                        list: 'only-icons',
                        options: ['left', 'center', 'right', 'justify']
                    },
                    ],
                    ['bold', 'italic', 'strike', 'underline'],
                    ['hr', 'link'],
                    [
                    {
                        label: $q.lang.editor.formatting,
                        icon: $q.iconSet.editor.formatting,
                        list: 'no-icons',
                        options: [
                        'p',
                        'code',
                        'h6',
                        'h5',
                        'h4',
                        'h3',
                        'h2',
                        'h1'
                        ]
                    },
                    {
                        label: $q.lang.editor.defaultFont,
                        icon: $q.iconSet.editor.font,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana'
                        ]
                    }
                    ],
                    ['unordered', 'ordered'],
                    ['undo', 'redo'],
                    ['import', 'export']
                ]"
                :fonts="{
                    arial: 'Arial',
                    arial_black: 'Arial Black',
                    comic_sans: 'Comic Sans MS',
                    courier_new: 'Courier New',
                    impact: 'Impact',
                    lucida_grande: 'Lucida Grande',
                    times_new_roman: 'Times New Roman',
                    verdana: 'Verdana'
                }"
            />
            </form>
            <q-card v-else flat bordered>
                <q-card-section v-html="editor" />
            </q-card>
            <div class="row q-ma-md" v-if="editDocumentation===true">
                <q-space />
                <q-btn label="Save" color="teal" @click="updateDocumentation()" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Documentation',
  data () {
    return {
      editor: '',
      editDocumentation: false,
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
    console.log(this.updateProj)
    this.editor = this.$props.project.documentation
  },
  methods: {
    ...mapActions('project', [
      'updateProject'
    ]),
    updateDocumentation () {
      this.updateProj.documentation = this.editor
      /* var userTable = []
      for (var user in this.updateProj.users) {
        var userData = {
          label: this.project.users[user].user_name,
          value: this.project.users[user].user_name,
          role: this.project.users[user].user_role
        }
        userTable.push(userData)
      }
      this.updateProj.users = userTable */
      console.log(this.updateProj.documentation)
      console.log('this.updateProj')
      console.log(this.updateProj)
      this.updateProject(this.updateProj)
      this.editDocumentation = false
    },
    exportFile () {
      this.$q.notify({
        message: 'Saved your text to local storage',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done'
      })
    },
    importFile () {
      this.$q.notify({
        message: 'Server unavailable. Check connectivity.',
        color: 'red-5',
        textColor: 'white',
        icon: 'warning'
      })
    }
  }
}
</script>
