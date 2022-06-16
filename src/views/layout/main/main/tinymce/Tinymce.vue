<template>
  <editor
    api-key="tlnzbqb99mrno9qaku25q76sn0vgtyfmh7y6q9fyai1i7fve"
    :init="config"
  />
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
const config = {
  // plugins:
  //   "preview powerpaste casechange importcss  searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap pagebreak nonbreaking anchor  insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker  help formatpainter permanentpen pageembed charmap  mentions quickbars linkchecker emoticons advtable export",

  // // enable title field in the Image dialog
  // image_title: true,
  // // enable automatic uploads of images represented by blob or data URIs
  // automatic_uploads: true,
  // // add custom filepicker only to Image dialog
  // file_picker_types: "image",
  // file_picker_callback: function (cb, value, meta) {
  //   console.log(value, meta);
  //   var input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");

  //   input.onchange = function () {
  //     var file = this.files[0];
  //     console.log(file);
  //     var reader = new FileReader();
  //     reader.onload = function () {
  //       var id = "blobid" + new Date().getTime();
  //       var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
  //       var base64 = reader.result.split(",")[1];
  //       var blobInfo = blobCache.create(id, file, base64);
  //       blobCache.add(blobInfo);
  //       // call the callback and populate the Title field with the file name
  //       cb(blobInfo.blobUri(), { title: file.name });
  //     };
  //     reader.readAsDataURL(file);
  //   };

  //   input.click();
  // },

  width: 755,
  height: 500,
  resize: false,
  autosave_ask_before_unload: false,
  powerpaste_allow_local_images: true,
  plugins: [
    "advlist",
    "anchor",
    "autolink",
    "codesample",
    "fullscreen",
    "help",
    "image",
    "tinydrive",
    "lists",
    "link",
    "media",
    "preview",
    "searchreplace",
    "table",
    "template",
    "visualblocks",
    "wordcount",
  ],

  toolbar:
    "insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image",
  spellchecker_dialog: true,
  spellchecker_ignore_list: ["Ephox", "Moxiecode"],
  // tinydrive_demo_files_url: "../_images/tiny-drive-demo/demo_files.json",
  tinydrive_token_provider: (success, failure) => {
    console.log(failure);
    success({
      token: "6bb7987e1eb5d4d5926682f9543dc7353094db3c7b97f2f68a0e17422ce490bb",
    });
  },
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
};
export default {
  components: {
    editor: Editor,
  },
  data() {
    return {
      config,
    };
  },
  content: {
    get() {
      return this.value;
    },
    set(val) {
      this.$emit("input", val);
    },
  },
};
</script>
<style>
.tox .tox-tinymce {
  z-index: 999 !important;
}
</style>
