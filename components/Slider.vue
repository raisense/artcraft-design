<template>
  <VueSlickCarousel class="full-screen-carousel" v-bind="slickOptions">
    <div class="slider-item" v-for="project in projects" :key="project.id">
      <nuxt-img
        v-if="project.featured_project.data.cover_image"
        class="h-full w-full object-cover"
        :src="project.featured_project.data.cover_image.url"
        sizes="md:640px xl:70vw"
      />
      <div class="slider-overlay absolute bottom-0 left-0">
        <prismic-rich-text
          class="text-3xl md:text-5xl lg:text-5xl xl:text-6xl mb-6 lg:mb-8 lg:mb-12 text-white font-bold"
          :field="project.featured_project.data.title"
        />
        <nuxt-link
          class="block md:inline-block  mb-12 md:mb-0"
          :to="localePath(`/projects/${project.featured_project.uid}`)"
        >
          <button class="block btn-outlined">
            {{ $t("Read more") }}
            <svg-icon class="inline-block" icon="chevron-right" />
          </button>
        </nuxt-link>
      </div>
    </div>
  </VueSlickCarousel>
</template>

<script>
export default {
  props: {
    projects: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      slickOptions: {
        slidesToShow: this.$device.isMobile ? 1 : 4,
        arrows: true,
        autoplay: true,
        pauseOnHover: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              autoplay: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 564,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      }
    };
  }
};
</script>

<style>
.slider {
  height: calc(100vh - 64px);
}

.slider-item {
  /* overflow-hidden */
  @apply relative overflow-hidden h-full;
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
  @apply transform md:scale-125;
}

.btn-outlined {
  @apply border border-2 bg-transparent text-white font-bold focus:text-black hover:text-black transition-all hover:bg-white focus:bg-white focus:text-black py-4 py-2 px-6 w-full md:w-auto md:py-6 md:px-8 xl:px-12;
}

.slick-arrow {
  z-index: 10;
}

.slick-arrow:before {
  font-size: 32px;
}

.slick-prev {
  left: 20px;
}
.slick-next {
  right: 30px;
}

@media (max-width: 768px) {
  .slider {
    height: auto;
  }
}
.full-screen-carousel {
  width: 100%;
  height: calc(100vh - 64px);
}

.full-screen-carousel .slick-list,
.full-screen-carousel .slick-track,
.full-screen-carousel .slick-slide > div {
  height: 100%;
}
</style>
