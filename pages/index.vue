<template>
  <div>
    <!-- <div class="home-screen w-screen h-screen bg-no-repeat bg-cover"> -->
    <Navbar />
    <Slider class="w-screen h-screen" :projects="projects" />
    <!-- <div class="hero-wrapper container h-full mx-auto">
      <div class="flex justify-between items-center h-full">
        <div class="mb-16 xs:mb-0 text-center mx-auto">
          <prismic-rich-text
            class="block px-5 md:px-0 text-4xl md:text-6xl mb-5 sm:mb-10 font-bold"
            :field="document.results[0].data.headline"
          />

          <nuxt-link :to="localePath('/projects')" class="">
            <button
              class="border border-2 bg-transparent text-white font-bold focus:text-black hover:text-black transition-all hover:bg-white focus:bg-white focus:text-black py-4 xs:py-6 px-16"
            >
              {{ $t("navbar.projects") }}
            </button>
          </nuxt-link>
        </div>
      </div>
    </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { resolveLang } from "~/utils/lang";

export default {
  layout: "homepage",
  head() {
    return {
      title: this.$t("Homepage")
    };
  },
  async asyncData({ $prismic, i18n, error }) {
    const lang = resolveLang(i18n.locale);

    const document = await $prismic.api.query(
      $prismic.predicates.at("document.type", "homepage"),
      { fetchLinks: "projects.title,projects.featured_image", lang }
    );

    const {
      first_project,
      second_project,
      third_project,
      fourth_project
    } = document.results[0].data;

    const projects = [
      first_project,
      second_project,
      third_project,
      fourth_project
    ];

    if (document) {
      return { document, projects };
    } else {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
  methods: {
    async fetchProject(project) {
      const data = await this.$prismic.api.getByUID("projects", project.uid);

      this.projectsList.push(data);
    }
  },

  mounted() {
    // this.projects.forEach(project => {
    //   this.fetchProject(project);
    // });
  }
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.home-screen {
  background-image: url("/home.jpg");
}

.hero-wrapper {
  height: calc(100% - 88px - 118px);
}
</style>
