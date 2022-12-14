<template>
  <div>
    <div class="absolute w-full left-0 top-0 p-6 flex justify-between items-center space-x-6">
      <div class="flex-grow flex items-center">
        <span class="mr-1">/</span> <input v-model="post.slug" type="text" class="p-0 border-none focus:ring-0 w-full" spellcheck="false" @click="$event.target.select()">
      </div>
      <div class="flex items-center space-x-6">
        <RelativeTime :date="lastSaved" v-if="lastSaved">
          <template v-slot:default="{ fromNow }">
            <span class="text-sm text-gray-500">{{ fromNow }}</span>
          </template>
        </RelativeTime>
        <button @click="post.published = ! post.published" class="text-sm font-medium" :class="{ 'text-pink-500': post.published }">{{ !post.published ? 'Publish' : 'Unpublish'}}</button>
        <router-link v-if="post.slug" :to="{name: 'post', params: {slug: post.slug}}" class="text-sm font-medium text-gray-800">Preview</router-link>
      </div>
    </div>
    <ResizeTextArea v-if="post.title">
      <template v-slot:default="{ resize, el }">
        <textarea :ref="el" v-model="post.title" v-on:input="resize" class="w-full text-center text-4xl lg:text-6xl leading-10 font-extrabold tracking-tight text-gray-900 border-none focus:ring-0 resize-none p-0"></textarea>
      </template>
    </ResizeTextArea>
    <Editor v-model:modelValue="post.body" v-model:teaserValue="post.teaser" class="mt-16" />
  </div>
</template>

<script>
import useAdminPosts from "../../api/useAdminPosts";
import {onMounted, watch, watchEffect, ref} from "vue";
import _ from 'lodash'
import slugify from 'slugify'
import ResizeTextArea from "../../components/ResizeTextArea.vue";
import Editor from "../../components/Editor.vue";
import dayjs from 'dayjs'
import RelativeTime from "../../components/RelativeTime.vue";

export default {
  components: {RelativeTime, Editor, ResizeTextArea },
  props: {
    uuid: {
      required: true,
      type: String,
    }
  },
  setup(props) {
    const {post, fetchPost, patchPost } = useAdminPosts()
    const lastSaved = dayjs()

    onMounted(async () => await fetchPost(props.uuid))

    const replaceSlug = () => {
      const slug = post.value.slug
      if (slug.charAt(slug.length - 1) === ' ') {
        return
      }
      post.value.slug = slug ? slugify(slug, {strict: true}) : post.value.uuid
    }
    watchEffect(() => {
      if (post.value.slug) replaceSlug()
    })
    watch(() => post, _.debounce(() => {
          updatePost()
        }, 500),
        {deep: true})
    const updatePost = async () => {
      await patchPost(props.uuid)
      lastSaved.value = dayjs()
    }

    return {
      post, lastSaved
    }
  }
}
</script>