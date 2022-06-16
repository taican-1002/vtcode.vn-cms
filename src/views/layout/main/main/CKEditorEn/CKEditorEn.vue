<template>
  <ckeditor
    :editor="editor"
    v-model="editorData"
    @input="(event) => handle_change(event)"
    :config="editorConfig"
  ></ckeditor>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import TodoList from "@ckeditor/ckeditor5-list/src/todolist";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";

/**Basic style */
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import Code from "@ckeditor/ckeditor5-basic-styles/src/code";
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import List from "@ckeditor/ckeditor5-list/src/list";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
/**Image, EasyImage, UploadIm */
import EasyImagePlugin from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import ImagePlugin from "@ckeditor/ckeditor5-image/src/image";
import ImageUploadPlugin from "@ckeditor/ckeditor5-image/src/imageupload";
import CloudServicesPlugin from "@ckeditor/ckeditor5-cloud-services/src/cloudservices";
import Font from "@ckeditor/ckeditor5-font/src/font";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
/**Heading */
import Heading from "@ckeditor/ckeditor5-heading/src/heading";

export default {
  props: {
    modelValue: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: this.modelValue,
      editorConfig: {
        plugins: [
          Heading,
          Font,
          Alignment,
          EssentialsPlugin,
          Bold,
          Italic,
          Underline,
          Strikethrough,
          Code,
          Subscript,
          Superscript,
          Indent,
          IndentBlock,
          LinkPlugin,
          ParagraphPlugin,
          EasyImagePlugin,
          ImagePlugin,
          ImageUploadPlugin,
          CloudServicesPlugin,
          MediaEmbed,
          Autoformat,
          List,
          TodoList,
          CodeBlock,
          Table,
          TableToolbar,
          BlockQuote,
        ],
        cloudServices: {
          tokenUrl:
            "https://89901.cke-cs.com/token/dev/a3569ae970a35ac828ac570b3251fb87f9ab9d272ed044558d088f28b297?limit=10",
          uploadUrl: "https://89901.cke-cs.com/easyimage/upload/",
        },
        mediaEmbed: {
          previewsInData: true,
          removeProviders: ["youtube"],
          providers: [
            {
              // hint: this is just for previews. Get actual HTML codes by making API calls from your CMS
              name: "iframely previews",

              // Match all URLs or just the ones you need:
              url: /.+/,

              html: (match) => {
                const id = this.getId(match[0]);
                // console.log(match);
                return (
                  `<iframe src="https://www.youtube.com/embed/${id}" ` +
                  'style="position: relative; width: 100%; height: 500px; top: 0; left: 0; " ' +
                  'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                  "</iframe>"
                );
              },
            },
            {
              name: "afreecaTV",
              url: [
                /^v\.afree\.ca\/ST\/([\w-]+)/,
                /^vod\.afreecatv\.com\/([\w-]+)/,
                /^play\.afreecatv\.com\/([\w-]+)/,
              ],
              html: (match) => {
                const id = match[1];

                return (
                  `<iframe src="https://openapi.afreecatv.com/oembed/embedinfo/${id}" ` +
                  'style="position: relative; width: 100%; height: 500px; top: 0; left: 0; " ' +
                  'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                  "</iframe>"
                );
              },
            },
          ],
        },
        toolbar: {
          items: [
            "heading",
            "|",
            "fontfamily",
            "fontsize",
            "|",
            "alignment",
            "|",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "underline",
            "subscript",
            "superscript",
            "|",
            "link",
            "|",
            "outdent",
            "indent",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "|",
            "code",
            "codeBlock",
            "|",
            "insertTable",
            "|",
            "uploadImage",
            "blockQuote",
            "|",
            "undo",
            "redo",
          ],
          shouldNotGroupWhenFull: false,
        },
      },
    };
  },
  methods: {
    handle_change: function (event) {
      //console.log(event)
      this.$emit("update:modelValue", event);
    },
    getId(url) {
      let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
      return regex.exec(url)[3];
    },
  },
};
</script>

<style></style>
