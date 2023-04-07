<script setup lang="ts">
import { BHeader, BSection } from '@demo/ui';
import { LocaleObject } from 'vue-i18n-routing';

const route = useRoute()
const { t } = useI18n()
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const availableLocales = computed(() => (locales.value as LocaleObject[]).filter(i => i.code !== locale.value))
</script>

<template>
  <Html :lang="head.htmlAttrs!.lang" :dir="head.htmlAttrs!.dir">

  <Head>
    <Title>{{ "Demo" }}</Title>
    <template v-for="link in head.link" :key="link.id">
      <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
    </template>
    <template v-for="meta in head.meta" :key="meta.id">
      <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
    </template>
  </Head>

  <div class="layout default-layout">
    <BSection>
      <BHeader />
    </BSection>
    <div class="page-container">
      <NuxtPage />
    </div>
  </div>

  </Html>
</template>

<style scoped lang="postcss">
</style>
