<template>
  <div
    class="slider h-full grid grid-rows-4 lg:grid-rows-1 md:grid-rows-2 md:grid-cols-2 lg:grid-cols-4 "
  >
    <div class="slider-item" v-for="project in projects" :key="project.id">
      <nuxt-img
        class="h-full w-full object-cover"
        :src="project.data.featured_image.url"
        sizes="md:360px lg:580px xl:50vw"
      />
      <div class="slider-overlay absolute bottom-0 left-0">
        <prismic-rich-text
          class="text-3xl md:text-5xl lg:text-5xl xl:text-6xl mb-6 lg:mb-8 lg:mb-12 text-white font-bold"
          :field="project.data.title"
        />
        <nuxt-link :to="localePath(`/projects/${project.uid}`)">
          <button class="block btn-outlined">
            {{ $t("Read more") }}
            <svg-icon class="inline-block" icon="chevron-right" />
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projects: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style>
.slider {
  height: calc(100vh - 64px);
}

.slider-item {
  @apply overflow-hidden relative;
}

.slider-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  @apply transition-opacity duration-200 md:opacity-0 px-6 py-8 md:px-8 md:py-16 flex flex-col justify-end w-full h-full z-30;
}

button .icon {
  @apply transition-transform duration-200  text-lg;
}
button:hover .icon {
  @apply translate-x-5 text-lg text-lg;
}

.slider-item:hover .slider-overlay {
  @apply opacity-100;
}

.slider-item img {
  @apply transition-transform duration-500 ease-in-out;
}
.slider-item:hover img {
  @apply transform scale-125;
}

.btn-outlined {
  @apply border border-2 bg-transparent text-white font-bold focus:text-black hover:text-black transition-all hover:bg-white focus:bg-white focus:text-black py-4 py-2 px-6 md:py-6 md:px-8 xl:px-12;
}

@media (max-width: 768px) {
  .slider {
    height: auto;
  }

  .slider-item {
    height: calc(50vh - 32px);
  }
}
</style>
