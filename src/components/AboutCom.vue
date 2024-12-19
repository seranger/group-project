<template>
  <div class="carousel-container">
    <div class="carousel">
      <!-- Slide -->
      <div class="slide" v-for="(slide, index) in slides" :key="index" :class="{ active: currentSlide === index }">
        <span>
                    <img src="../assets/MTech.jpg" alt="" class="logo-About">
                </span>
                <h1 style="text-align:center">Meet The Team</h1>
        <img :src="slide.img" :alt="slide.alt" />
        <div class="slide-content">
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.description }}</p>
          <button class="contact-btn" @click="showContact(slide)">Contact</button>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <button class="nav-btn prev" @click="prevSlide">❮</button>
      <button class="nav-btn next" @click="nextSlide">❯</button>
    </div>

    <!-- Dots Navigation -->
    <div class="dots">
      <span v-for="(slide, index) in slides" :key="index" class="dot" :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"></span>
    </div>

    <!-- Contact Modal -->
    <div class="modal" v-if="isModalVisible">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&times;</span>
        <h2>Contact Information</h2>
        <p><strong>Name:</strong> {{ currentContact.title }}</p>
        <p><strong>Contact:</strong> {{ currentContact.contactInfo }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import mogale from "@/assets/mogale.jpg";
import sino from "@/assets/sino.jpg";
import surur from "@/assets/surur.jpg";

export default {
  data() {
    return {
      slides: [
        {
          img: mogale,
          alt: "First slide",
          title: "Mogale Kgasago - Project Lead",
          description:
            "Organizes software projects and can assign tasks to the team according to the specifications of the task.",
          contactInfo: "mogalekgasago17@gmail.com | +27 65 875 6146",
        },
        {
          img: sino,
          alt: "Second slide",
          title: "Sinovuyo Mjulwa - Lead Developer",
          description:
            "In charge of managing the code of the team and coding the main functionality of the application.",
          contactInfo: "sinovuyo@gmail.com.com | +27 63 529 1242",
        },
        {
          img: surur,
          alt: "Third slide",
          title: "UI/UX Designer",
          description:
            "In charge of designing the UI/UX of the application, making sure the website is user friendly and visually appealing.",
          contactInfo: "msururs1@gmail.com | +27 71 874 9000",
        },
      ],
      currentSlide: 0,
      isModalVisible: false,
      currentContact: {},
    };
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
    showContact(contact) {
      this.currentContact = contact;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped>
.carousel-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.carousel {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.slide {
  display: none;
  text-align: center;
  position: relative;
  transition: opacity 0.5s ease-in-out;
}

.slide.active {
  display: block;
  opacity: 1;
}

img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-bottom: 4px solid #ddd;
}

.slide-content {
  padding: 20px;
  background: #fff;
  text-align: center;
}

h2 {
  margin: 15px 0 10px;
  font-size: 1.8em;
  color: #333;
}

p {
  font-size: 1em;
  color: #555;
  margin-bottom: 20px;
}

.contact-btn {
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.contact-btn:hover {
  background-color: #0056b3;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.5em;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
}

.nav-btn.prev {
  left: 10px;
}

.nav-btn.next {
  right: 10px;
}

.dots {
  margin-top: 10px;
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 5px;
  background: #ddd;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot.active {
  background: #007bff;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.modal-content h2 {
  margin-bottom: 10px;
}

.modal-content p {
  font-size: 1em;
  color: #333;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 1.5em;
  color: #333;
  cursor: pointer;
  background: none;
  border: none;
}

.logo-About {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  align-items: center;}

</style>
