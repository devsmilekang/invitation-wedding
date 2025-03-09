<script lang="ts">
export default {
  name: 'CopyAccount',
  props: {
    who: String,
    account: String
  },
  methods: {
    copy() {
      window.navigator.clipboard.writeText(this.account)
          .then(()=>{
            window.alert('계좌번호가 복사되었습니다.');
          });
    }
  },
  data() {
    const sp = this.account?.split(',');
    const accountName = sp.length === 0 ? undefined: sp[1]
    return {
      accountNum: sp[0],
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
  //white-space: nowrap;
  overflow: hidden;
}

.account {
  flex: 1;
  text-align: left;
  //white-space: nowrap;
  text-decoration: none;
  color: black;
  letter-spacing: -0.5px;
  @media (max-width: 375px) {
    //text-align: right;
  }
}

.account em {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: -1px;
}
</style>
