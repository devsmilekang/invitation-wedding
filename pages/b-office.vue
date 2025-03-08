<script lang="ts">
import {createClient} from "@supabase/supabase-js";
import dayjs from "dayjs";
let supabase = undefined;

export default {
  setup(){
    const config = useRuntimeConfig();
    const supbaseUrl = config.public.supabaseUrl;
    const supabaseKey = config.public.supabaseKey;
    supabase = createClient(supbaseUrl, supabaseKey);
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      data: [],
      man: 0,
      woman: 0,
      total: 0,
      mealEnable: 0,
      mealNotEnable: 0,
      mealUndetermined: 0
    }
  },
  methods: {
    dayjs,
    async getData() {
      const {data, error} = await supabase.from('memo')
          .select()
          .order('created_at', {ascending: false});
      if(error) {
        console.error(error);
      } else {
        this.data = data;
        this.man = data.filter((d)=>d.friend === '신랑측')
            .reduce((a, b)=>a+b.cnt, 0);
        this.woman = data.filter((d)=>d.friend === '신부측')
            .reduce((a, b)=>a+b.cnt, 0);
        this.total = this.man + this.woman;
        this.mealEnable = data.filter((d)=>d.meal==='예정')
            .reduce((a,b)=>a+b.cnt, 0);
        this.mealNotEnable = data.filter((d)=>d.meal==='안함')
            .reduce((a,b)=>a+b.cnt, 0);
        this.mealUndetermined = data.filter((d)=>d.meal==='미정')
            .reduce((a,b)=>a+b.cnt, 0);
      }
    }
  },
}
</script>

<template>
  <section class="container">
    <h1 class="title">참석 의사 확인</h1>
    <article class="grid">
      <div class="card">
        <h6>참석 인원</h6>
        <ul>
          <li>전체: {{total}}</li>
          <li>신랑측: {{man}}</li>
          <li>신부측: {{woman}}</li>
        </ul>
      </div>
      <div class="card">
        <h6>식사 여부</h6>
        <ul>
          <li>예정: {{mealEnable}}</li>
          <li>미정: {{mealUndetermined}}</li>
          <li>안함: {{mealNotEnable}}</li>
        </ul>
      </div>
    </article>
    <h2 class="subtitle">상세 정보</h2>
    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>구분</th>
        <th>성함</th>
        <th>참석인원</th>
        <th>동행인</th>
        <th>식사여부</th>
        <th>작성시각</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(d, idx) of data"
          :key="`item-${idx}`">
        <td>{{idx+1}}</td>
        <td>{{d.friend}}</td>
        <td>{{d.name}}</td>
        <td>{{d.cnt}}명</td>
        <td>{{d.other}}</td>
        <td>{{d.meal}}</td>
        <td>{{dayjs(d.created_at).format('YYYY-MM-DD HH:mm')}}</td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 12px 16px;
  margin-bottom: 20px;
}

.card {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
}

.card h6 {
  font-size: 16px;
  margin-bottom: 8px;
}

.card ul li {
  font-size: 14px;
  line-height: 20px;
}
.title {
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 24px;
}

.subtitle {
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 12px;
}

.container {
  padding: 28px 20px 20px;
  background-color: white;
  min-height: 100vh;
}

.table {
  font-size: 14px;
  border: 1px solid;
  width: 100%;
  border-collapse: collapse;
}

.table th {
  padding: 8px 0;
  border: 1px solid;
  background-color: rgba(0, 0, 0, 0.1);
}
.table td {
  padding: 8px 12px;
  border: 1px solid;
}
</style>
