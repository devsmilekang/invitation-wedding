<script lang="ts">
export default {
  name: 'CopyAccount',
  props: {
    who: String,
    account: {
      type: String,
      required: true
    }
  },
  methods: {
    copy() {
      if (this.accountNum) {
        // 은행 이름과 하이픈을 제거한 숫자만 추출
        const cleanedNumber = this.accountNum
          .replace(/국민|우리|농협|신한|하나|기업|새마을|카카오|케이|SC|KB|NH|KEB|IBK|수협|신협|우체국|광주|전북|대구|부산|경남|산업|씨티|지역/g, '')
          .replace(/-/g, '')
          .trim();
          
        window.navigator.clipboard.writeText(cleanedNumber)
            .then(()=>{
              window.alert('계좌번호가 복사되었습니다.');
            });
      }
    }
  },
  data() {
    const sp = this.account ? this.account.split(',') : [];
    const accountName = sp.length > 0 ? sp[1] : undefined;
    return {
      accountNum: sp.length > 0 ? sp[0] : '',
      accountName,
    }
  }
}
</script>

<template>
  <div class="copy-account-btn"
       @click="copy" >
    <span class="who">{{who}}</span>
    <span class="account">
      {{accountNum}}
      <em v-if="accountName">
        ({{accountName}})
      </em>
    </span>
  </div>
</template>

<style scoped>
.copy-account-btn {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  font-size: 15px;
  column-gap: 6px;
  background-color: #F0F0F0;
  border-radius: 0;
  border: 0.5px solid black;
  cursor: pointer;
  position: relative;
  max-width: 100%;
  width: 100%;
  flex: 1;
}
.who {
  min-width: 40px;
  width: 40px;
  text-align: left;
  /* white-space: nowrap; */
  overflow: hidden;
}

.account {
  flex: 1;
  text-align: left;
  /* white-space: nowrap; */
  text-decoration: none;
  color: black;
  letter-spacing: -0.5px;
  @media (max-width: 375px) {
    /* text-align: right; */
  }
}

.account em {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: -1px;
}
</style>
