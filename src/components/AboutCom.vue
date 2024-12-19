<template>
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <!-- Carousel inner -->
    <div class="carousel-inner">
      <!-- Loop through the slides and create each one dynamically -->
      <div 
        class="carousel-item"
        v-for="(slide, index) in slides" 
        :key="index"
        :class="{ 'active': index === currentIndex }"
      >
        <img :src="slide.img" class="d-block w-100 carousel-image" :alt="slide.alt" />
        <div class="carousel-caption d-none d-md-block">
          <h5>{{ slide.title }}</h5>
          <p>{{ slide.description }}</p>
          <p><button class="button_">Contact</button></p>
        </div>
      </div>
    </div>

    <!-- Carousel controls -->
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" @click="prevSlide">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" @click="nextSlide">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
import mogale from '@/assets/mogale.jpg'
import sino from '@/assets/sino.jpg'
import surur from '@/assets/surur.jpg'

export default {
  data() {
    return {
      currentIndex: 0,
      slides: [
        {
          img: mogale,
          alt: "First slide",
          title: "Mogale Kgasago - Project Lead",
          description: "Organizes software projects and can assign tasks to the team according to the specifications of the task."
        },
        {
          img: sino,
          alt: "Second slide",
          title: "Sinovuyo Mjulwa - Lead Developer",
          description: "In charge of managing the code of the team and coding the main functionality of the application."
        },
        {
          img: surur,
          alt: "Third slide",
          title: "UI/UX Designer - ",
          description: "In charge of designing the UI/UX of the application, making sure the website is user friendly and visually appealing."
        }
      ]
    };
  },
  methods: {
    nextSlide() {
      // Move to the next slide, wrapping around if necessary
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    },
    prevSlide() {
      // Move to the previous slide, wrapping around if necessary
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    }
  },
  mounted() {
    // Ensure the carousel starts at the first slide
    this.currentIndex = 0;
  }
};
</script>

<style scoped>
main{
  display: flex;
}

.carousel-inner {
  position: relative;
  overflow: hidden;
}

.carousel-inner img {
  width: 100%;
  height: auto;
  object-fit: cover; /* Ensures the image covers the area without distortion */
}

.carousel-caption {
  background-color: rgba(0, 0, 0, 0.5); /* Adds background for readability */
  padding: 15px;
}

.carousel-control-prev,
.carousel-control-next {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background for controls */
}

.button_ {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.button_:hover {
  background-color: #0056b3;
}
</style>
