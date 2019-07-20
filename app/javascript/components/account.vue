<template>
  <div class="card">
    <form>
      <div class="form-group">
        <label>販売者名</label>
        <div class="input-group">
          <input v-model="form.name" type="text" class="form-control"/>
          <button class="c-button_save u-ml20 u-mt4" :disabled="!changed.name">保存</button>
        </div>
      </div>

      <div class="form-group">
        <label>メールアドレス</label>
        <div class="input-group">
          <input v-model="form.email" type="text" class="form-control"/>
          <button class="c-button_save u-ml20 u-mt4" :disabled="!changed.email">保存</button>
        </div>
      </div>

      <div class="form-group">
        <label>紹介文（ユーザーが見る紹介文です）</label>
        <div class="input-group">
          <textarea v-model="form.description" class="form-control"/>
          <button class="c-button_save u-ml20 u-mt4" :disabled="!changed.description">保存</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        account: {
          name: '',
          email: '',
          description: '',
        },
        form: {
          name: '',
          email: '',
          description: '',
        },
        changed: {
          name: false,
          email: false,
          description: false,
        }
      }
    },
    watch: {
      form: {
        handler: function (val) {
          Object.keys(val).forEach(key => {
            if (val[key] !== this.account[key]) {
              this.changed[key] = true
            } else {
              this.changed[key] = false
            }
          })
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  .card {
    width: 1080px;
    height: 100%;
    background: #fff;
    padding: 40px;
    margin: 128px 40px 40px 250px;
  }
</style>
