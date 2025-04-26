<template>
<section class="container"
         data-aos="fade-up"
         data-aos-offset="200"
         data-aos-easing="ease-out-cubic"
         data-aos-duration="1300" >
  <h3 class="title">결혼식 오시는 길</h3>
  <div class="location">
    서울특별시 마포구 월드컵로 240 2층<br/>
    <em>월드컵컨벤션 그랜드볼룸홀</em>
  </div>
  <div class="map-wrapper">
    <div id="map" class="map"  />
    <div class="map-button"
         @click="openMap" >

    </div>
  </div>

  <WayByMethod v-for="item in items"
               :title="item.title"
               :contents="item.contents"
               :header="item.header"
               />
</section>
</template>

<script>
import WayByMethod from "./location/WayByMethod.vue";
const [lat, lng] = [37.5683, 126.8975];
let clientKey = '';
const items = [
  {title: '지하철',
    header: '<6호선 월드컵경기장역 2번 출구 ★ 도보 3분(200m)>',
  contents: [
  '월드컵경기장역 2번 출구에 경기장 서축(W) 방향 안내 배너가 있습니다.',
  '환승역: 2호선(힙정), 3호선(약수·연신내), 4호선(삼각지), 5호선 공덕 경의중앙선·공항철도(디지털미디어시티)'
]},
  {title: '버스',
  contents: [
      '간선 : 571, 710, 760',
      '지선 : 7019, 7715, 8777',
      '광역 : 9711'
  ]},
  {
    title: '자동차',
    header: '<네이게이션 검색 시 \'월드컵컨벤션\' 입력>',
    contents: [
        '월드컵경기장 서문 진입 후 ⓟ서측 1,2 주차장 이용',
        '주차 접수대 사전 등록 후 출차 (90분 무료)',
        '경기·행사가 있는 날에는 서측 주차장 만차 시 주차 요원에 안내에 따라 ⓟ 난지천공원, 평화의공원 이용(3시간 무료)',
        '네이버에 상암월드컵컨벤션으로 검색하시면 정확한 주차장 안내를 받으실 수 있습니다.',
        '월드컵경기장 또는 주소 검색 시 홈플러스 주차장으로 안내될 수 있습니다.',
        '홈플러스 주차장은 무료 주차 불가합니다.'
    ]
  }
]

export default {
  name: "WeddingLocation",
  components: {WayByMethod},
  setup(){
    const config = useRuntimeConfig();
    clientKey = config.public.naverClient;
  },
  mounted() {
    this.loadScript();
  },
  methods: {
    loadScript() { // 네이버 스크립트 로드
      const script =  document.createElement('script');
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId${clientKey}`;
      script.onload = this.handleOnLoad;
      document.head.appendChild(script);
    },
    handleOnLoad() {
      // 지도 설정
      const mapOptions = {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 14,
        minZoom: 14,
        zoomControl: false,
        draggable: false,
      };
      const map = new naver.maps.Map('map', mapOptions);
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map
      });
    }
    ,openMap() {
      window.open('https://map.naver.com/p/search/%EC%9B%94%EB%93%9C%EC%BB%B5%EC%BB%A8%EB%B2%A4%EC%85%98/place/1902387925?c=15.00,0,0,0,dh&placePath=%3Fentry%253Dbmp',
      '_blank');
    }
  },
  data(){
    return {
      items
    }
  }
}
</script>

<style scoped>
.container {
  padding: 56px 0 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 40px;
}

.location {
  border: 0.5px solid;
  width: calc(100% - 48px);
  padding: 10px 0;
  font-size: 13px;
  text-align: center;
  line-height: 26px;
}

.location em {
  font-size: 20px;
  font-style: normal;
}

.map {
  width: 100%;
  aspect-ratio: calc(5 / 3);
}

.map-wrapper {
  width: 100%;
  position: relative;
  margin-top: 40px;
}

.map-button {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
}
</style>
