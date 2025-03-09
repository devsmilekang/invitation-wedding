<template>
  <section class="container"
           data-aos="fade-up"
           data-aos-offset="200"
           data-aos-easing="ease-out-cubic"
           data-aos-duration="1300">
    <article class="contents">
      <BigContact name="신랑"
                  phone="010-8590-9102"
                  :id="1" />
      <span class="parent">&lt;신랑 측 혼주&gt;</span>
      <div class="parent-contact">
        <SmallContact name="김외진"
                      :id="1"
                      phone="010-0000-0000"
                      relation="아버지" />
        <SmallContact name="최영자"
                      :id="2"
                      phone="010-0000-0000"
                      relation="어머니" />
      </div>
    </article>
    <CircleDivider />
    <article class="contents">
      <BigContact name="신부"
                  phone="010-8411-1858"
                  :id="2" />
      <span class="parent">&lt;신부 측 혼주&gt;</span>
      <div class="parent-contact">
        <SmallContact name="정해만"
                      :id="3"
                      phone="010-0000-0000"
                      relation="아버지" />
        <SmallContact name="김지영"
                      :id="4"
                      phone="010-0000-0000"
                      relation="어머니" />
      </div>
    </article>
  </section>
</template>

<script>
import CircleDivider from "./CircleDivider.vue";
import BigContact from "./contact/BigContact.vue";
import SmallContact from "~/components/contact/SmallContact.vue";
export default {
  name: "PersonContact",
  components: {SmallContact, BigContact, CircleDivider}
}
</script>

<style scoped>
.container {
  background-color: rgba(0, 0, 0, 0.06);
  width: 100%;
}

.contents {
  padding: 32px 32px 48px;
  background-color: rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
}

.parent {
  font-size: 15px;
  line-height: 2;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 14px;
}

.parent-contact {
  display: flex;
  column-gap: 24px;
}
</style>
