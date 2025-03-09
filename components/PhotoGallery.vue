<script lang="ts">
// const photos = ['/gallery/img.png', '/gallery/img_1.png', '/gallery/img_2.png', '/gallery/img_3.png'];
const photos = Array.from({length:4}, (_, i)=>`/gallery/studio/${i+1}.jpg`);
export default {
  name: 'PhotoGallery',
  methods: {
    showMore() {
      for(const item of photos.slice(0, 4)) {
        this.photos.push(item);
      }
    }
  },
  data() {
    return {
      photos,
    }
  }
}
</script>

<template>
  <section style="background-color: white">
    <div data-aos="fade-up"
         data-aos-offset="200"
         data-aos-easing="ease-out-cubic"
         class="container"
         data-aos-duration="1300">
      <h3 class="title">결혼 사진</h3>
      <div class="content">
        <article class="grid">
          <img v-for="(photo, idx) in photos"
               :src="photo"
               :key="idx"
               alt="결혼사진" />
        </article>
        <nuxt-link href="/gallery">
          <button class="more">
            사진 더 보기
          </button>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  background-color: white;
}

.container {
  padding-top: 14rem;
  padding-bottom: 48px;
  background-color: white;
}

.title {
  font-size: 8rem;
  margin: 0 0 11.8rem;
  font-weight: 400;
  text-align: center;
}

.content {
  width: 100%;
  padding: 0 7.6rem;
}

.more {
  font-size: 18px;
  padding: 10px;
  background: white;
  border: .5px solid black;
  color: black;
  cursor: pointer;
  width: 100%;
  margin-top: 7.6rem;
}

.grid {
  grid-gap: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.grid img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}
</style>
