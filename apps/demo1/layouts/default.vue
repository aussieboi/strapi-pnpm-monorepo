<script setup lang="ts">

type BFooterProps = {
  choose: string;
  privacy: string;
  cookie: string;
  terms: string;
  rights: string;
  linkedIn: string;
  twitter: string;
  facebook: string;
  instagram: string;
  dribble: string;
  behance: string;
  pangea: string;
  amplifyre: string;
  techDynamics: string;
};

const { t } = useI18n();
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

const footerContent: BFooterProps = {
  choose: t("footer.choose"),
  privacy: t("footer.privacy"),
  cookie: t("footer.cookie"),
  terms: t("footer.terms"),
  rights: t("footer.rights"),
  linkedIn: t("footer.linkedin"),
  twitter: t("footer.twitter"),
  facebook: t("footer.facebook"),
  instagram: t("footer.instagram"),
  dribble: t("footer.dribble"),
  behance: t("footer.behance"),
  pangea: t("footer.pangea"),
  amplifyre: t("footer.amplifyre"),
  techDynamics: t("footer.tech-dynamics"),
};
</script>

<template>
  <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">

  <Head>
    <template v-for="link in head.link" :key="link.id">
      <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
    </template>
    <template v-for="meta in head.meta" :key="meta.id">
      <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
    </template>
  </Head>

  <Body>
    <div class="layout default-layout">
      <BSection>
        <BHeader nav-hidden />
      </BSection>

      <div class="page-container">
        <NuxtPage />
      </div>

      <BSection>
        <BFooter v-bind="footerContent" />
      </BSection>
    </div>
  </Body>

  </Html>
</template>

<style scoped lang="postcss"></style>
