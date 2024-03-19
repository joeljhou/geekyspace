<script setup lang="ts">
import BlogHero from "vuepress-theme-hope/blog/components/BlogHero.js";
import BingHeroBackground from "vuepress-theme-hope/presets/BingHeroBackground.js";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";
</script>

<template>
  <BlogHero>
    <!--必应壁纸-->
    <template #heroBg>
      <BingHeroBackground/>
    </template>
    <!--一言描述-->
    <template #heroInfo="heroInfo">
      <HitokotoBlogHero v-bind="heroInfo"/>
    </template>
  </BlogHero>
</template>
