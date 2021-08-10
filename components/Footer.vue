<template>
  <Container id="footer" class="py-8">
    <footer class="flex flex-col md:flex-row md:items-center justify-between">
      <div class="mb-4 xs:mb-0">
        {{ $t("Copyright") }} {{ year }} | Voxe Media Group
      </div>
      <div class="social-links">
        <a
          v-for="item in socialLinks"
          :href="item.data.link_address.url"
          :key="item.id"
          :title="$prismic.asText(item.data.title)"
        >
          <svg-icon :icon="getSiteName(item.data.link_address.url)" />
        </a>
      </div>
    </footer>
  </Container>
</template>

<script>
import psl from "psl";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      socialLinks: state => state.socialLinks
    }),
    year() {
      return new Date().getFullYear();
    }
  },
  methods: {
    getSiteName(link) {
      if (!link) {
        return "#";
      }

      const parsed = psl.parse(new URL(link).hostname);
      return parsed.sld;
    }
  }
};
</script>

<style scoped>
.social-links {
  @apply flex text-2xl;
}
.social-links > a {
  @apply mx-2;
}
</style>
