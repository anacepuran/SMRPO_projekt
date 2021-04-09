<template>
    <div>
        <div class="row">
            <div class="text-h4 q-ma-md">Documentation</div>
        </div>
        <q-card class="row q-ma-md bg-secondary">
            <q-btn color="white" text-color="black" dense size="sm" class="q-ma-lg" label="import" @click="importFile" icon="cloud_upload" />
            <q-btn color="white" text-color="black" dense size="sm" class="q-ma-lg" label="export" @click="exportFile" icon="file_download" />
            <q-space />
            <q-btn v-if="editDocumentation===false" label="Edit documentation" class="q-ma-md" color="primary" icon="edit" @click="editDocumentation=true" />
        </q-card>
        <div>
            <div class="q-ma-md" v-if="chooseFile===true">
                <span style="color: red">Warning!</span><p class="text-caption"> If you upload a file, the current documentation will be overwritten.</p>
            </div>
            <input :class="getClass" type="file" id="input-file"/>
            <q-btn v-if="uploadButton===true" class="q-ma-md" color="secondary" label="upload" @click="uploadDocumentation" />
            <q-btn round flat v-if="uploadButton===false && chooseFile===true" class="q-ma-md" color="secondary" icon="close" @click="closeImport" />
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
                    ['undo', 'redo']
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
const TurndownService = require('turndown').default
console.log(new TurndownService())
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
      },
      chooseFile: false,
      uploadedText: '',
      uploadButton: false
    }
  },
  props: {
    project: {
      type: Object
    }
  },
  computed: {
    getClass () {
      if (this.chooseFile === true) {
        return 'q-ma-md'
      } else {
        return 'hidden q-ma-md'
      }
    }
  },
  mounted () {
    this.updateProj = this.$props.project
    this.editor = this.$props.project.documentation
  },
  methods: {
    ...mapActions('project', [
      'updateProject'
    ]),
    updateDocumentation () {
      this.updateProj.documentation = this.editor
      this.updateProject(this.updateProj)
      this.editDocumentation = false
    },
    exportFile () {
      var turndownService = new TurndownService()
      var markdownContent = turndownService.turndown(this.editor)
      var filename = 'README.md'
      this.download(filename, markdownContent)
    },
    download (filename, text) {
      var element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      element.setAttribute('download', filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    importFile () {
      this.chooseFile = true
      document.getElementById('input-file')
        .addEventListener('change', this.getFile)
    },
    getFile (event) {
      console.log('get file')
      this.uploadButton = true
      const input = event.target
      if ('files' in input && input.files.length > 0) {
        this.placeFileContent(
          input.files[0]
        )
      }
    },
    placeFileContent (file) {
      console.log('place file content')
      this.readFileContent(file).then(content => {
        this.uploadedText = content
        console.log(this.uploadedText)
      }).catch(error => console.log(error))
    },
    readFileContent (file) {
      console.log('read file content')
      const reader = new FileReader()
      return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
      })
    },
    uploadDocumentation () {
      const showdown = require('showdown'),
        converter = new showdown.Converter(),
        text = this.uploadedText,
        html = converter.makeHtml(text)
      console.log(html)
      this.editor = html
      this.updateDocumentation()
      this.chooseFile = false
      this.uploadButton = false
      this.uploadedText = ''
    },
    closeImport () {
      this.chooseFile = false
      this.uploadButton = false
      this.uploadedText = ''
    }
  }
}
</script>
