import Swiper, { Navigation, Pagination, Lazy, Autoplay } from 'swiper';
import WebsiteGlobal from 'Assets/js/WebsiteGlobal'
import 'swiper/swiper-bundle.css'
import './carousel.css'


const CarouselPage = (function() {
  let instance

  function initDemoCarousel() {
    Swiper.use([Navigation, Pagination, Lazy, Autoplay]);
    
    const demoCarousel = new Swiper('.demo-carousel', {
      spaceBetween: 20,
      lazy: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 5000
      },
      loop: true
    });
  }

  function init() {
    console.log('Carousel script initiated...')
    initDemoCarousel()
  }

  return {
    getInstance: function() {
      if(!instance) {
        instance = init()
      }

      return instance
    }
  }
})()



document.addEventListener('DOMContentLoaded', function onDOMLoad() {
  const websiteGlobal = WebsiteGlobal.getInstance()
  const carouselPage = CarouselPage.getInstance()
})