<script setup lang="ts">

import CopyAccount from "~/components/account/CopyAccount.vue";
import AccountAccordion from "~/components/account/AccountAccordion.vue";
</script>
<template>
  <section class="container">
    <div class="header"
         data-aos="fade-up"
         data-aos-offset="200"
         data-aos-easing="ease-out-cubic"
         data-aos-duration="1300"
    >
      <h3 class="title">신랑 & 신부에게<br/>
        마음 전하기</h3>
    </div>
    <p class="thank"
       data-aos="fade-up"
       data-aos-offset="100"
       data-aos-easing="ease-out-cubic"
       data-aos-duration="1300" >
      결혼을 축하하고 축복해주시는 귀한 마음,<br/>
      감사히 받겠습니다.</p>
    <div>
    <article class="phone"
             data-aos="fade-up"
             data-aos-offset="50"
             data-aos-easing="ease-out-cubic"
             data-aos-duration="1300">
      <div class="phone-header">
        <img src="../assets/imgs/ic_phone.png"
             alt="전화"/>
        신랑에게 연락하기
      </div>
      <div class="content-wrapper">
        <div class="content-container">
          <div class="phone-content">
            <a href="tel:01085909102">010-8590-9102</a> 로 연락해주세요.
          </div>
          <AccountAccordion type="신랑"
                            :id="1"
                            account1="카카오뱅크 3333-27-9858278"
                            account2="농협 841-02-275843,김외진"
                            account3="농협 841-12-418550,최영자" />
        </div>
      </div>
      <div class="phone-header">
        <img src="../assets/imgs/ic_phone.png"
             alt="전화"/>
        신부에게 연락하기
      </div>
      <div class="content-wrapper">
        <div class="content-container">
          <div class="phone-content">
            <a href="tel:01084111858">010-8411-1858</a> 로 연락해주세요.
          </div>
          <AccountAccordion type="신부"
                            :id="2"
                            account1="카카오뱅크 3333-23-4343500"
                            account2="기업 434-004340-01018,정해만"
                            account3="기업 381-052787-01-016,김지영" />
        </div>
      </div>
    </article>
    </div>
  </section>
</template>

<style scoped>
.content-wrapper {
  display: flex;
  padding-left: 24px;
}
.content-container {
  //margin-left: 24px;
  //padding-left: 24px;
  flex: 1;
}
.phone-header {
  display: flex;
  align-items: center;
  column-gap: 12px;
  font-size: 20px;
  line-height: 32px;
}
.phone-header img {
  width: 21px;
  height: 21px;
}
.phone-header:nth-of-type(3) {
  margin-top: 24px;
}

.phone-content {
  background-color: white;
  font-size: 18px;
  line-height: 31px;
  padding: 4px 12px;
  border: .5px solid black;
  margin-top: 10px;
  text-align: left;
  margin-bottom: 14px;
}

.phone-content a {
  color: black;
  text-decoration-thickness: .6px;
  text-underline-offset: 4px;
}
.phone {
  padding: 32px 36px 40px;
  width: 100% !important;
  background-color: rgba(0, 0, 0, 0.06);
  //width: 100%;
  //max-width: 100%;
  margin-top: 28px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.container {
  display: flex;
  flex-direction: column;
  //align-items: center;
  text-align: center;
  //padding: 0 24px;
  background-color: white;
  position: relative;
}
.title {
  font-size: 26px;
  line-height: 28px;
  margin: 54px 0 10px;
  font-weight: 400;
}
.thank {
  font-size: 19px;
  line-height: 24px;
  margin: 16px 0 0;
}
</style>
