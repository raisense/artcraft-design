<template>
  <Container class="py-8">
    <footer class="flex flex-col md:flex-row md:items-center justify-between">
      <div class="mb-4 xs:mb-0">
        {{ $t("Copyright") }} {{ year }} | ArtCraft Design
      </div>
      <div class="social-links">
        <a href="#">
          <svg-icon icon="telegram" />
        </a>
        <a href="#">
          <svg-icon icon="messenger" />
        </a>
        <a href="#">
          <svg-icon icon="youtube" />
        </a>
        <a href="#">
          <svg-icon icon="twitter" />
        </a>
        <a href="#">
          <svg-icon icon="dribble" />
        </a>
        <a href="#">
          <svg-icon icon="insta" />
        </a>
      </div>
    </footer>
  </Container>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear();
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
