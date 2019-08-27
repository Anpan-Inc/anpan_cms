<template>
  <div class="card">
    <form>
      <div class="u-flex u-mb32 u-alignItems_center">
        <label class="accountImageButton">
          <span>アカウント画像を設定</span>
          <input type="file" class="u-none" @change="onChangeImage" ref="image"/>
        </label>
        <div class="c-position_relative">
          <img class="accountImage u-ml16" :src="imageUrl">
          <span class="c-button_close accountCloseButton" @click="onClickImageClose">x</span>
        </div>
        <button class="c-button_save u-ml_auto" :disabled="!hasSomethingToSave" @click="onClickSaveAll">全て保存</button>
      </div>

      <div class="u-mb32">
        <label class="c-formLabel">販売者名</label>
        <div class="c-inputGroup">
          <input v-model="form.name" type="text" class="c-input"/>
          <button class="c-button_save u-ml20 u-mt4" :disabled="!changed.name" @click.prevent="onClickSave('name')">保存</button>
        </div>
      </div>

      <div class="u-mb32">
        <label class="c-formLabel">メールアドレス</label>
        <div class="c-inputGroup">
          <input v-model="form.email" type="text" class="c-input"/>
          <button class="c-button_save u-ml20 u-mt4" :disabled="!changed.email" @click.prevent="onClickSave('email')">保存</button>
        </div>
      </div>

      <div class="u-mb32">
        <label class="c-formLabel">紹介文（ユーザーが見る紹介文です）</label>
        <div class="c-inputGroup">
          <textarea v-model="form.description" class="c-textarea"/>
          <button class="c-button_save u-ml20 u-mt4" :disabled="!changed.description" @click.prevent="onClickSave('description')">保存</button>
        </div>
      </div>

      <div class="u-mb32">
        <label class="c-formLabel ">口座情報</label>
        <div class="c-inputGroup">
          <input v-model="form.bank_account" type="text" class="c-input"/>
          <button class="c-button_save u-ml20 u-mt4" :disabled="!changed.bank_account" @click.prevent="onClickSave('bank_account')">保存</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from "axios";
  // TODO: 置き換える
  const DEFAULT_IMAGE_URL = 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  export default {
    data: function () {
      return {
        account: {
          image: '',
          name: '',
          email: '',
          description: '',
          bank_account: '',
        },
        form: {
          image: null,
          name: '',
          email: '',
          description: '',
          bank_account: '',
        },
        changed: {
          image: false,
          name: false,
          email: false,
          description: false,
          bank_account: false
        },
        imageUrl: DEFAULT_IMAGE_URL,
      }
    },
    watch: {
      form: {
        handler: function (val) {
          Object.keys(val)
            .filter((key) => key !== 'image')
            .forEach(key => {
            if (val[key] !== this.account[key]) {
              this.changed[key] = true
            } else {
              this.changed[key] = false
            }
          })
        },
        deep: true
      },
    },
    computed: {
      hasSomethingToSave() {
        return Object.keys(this.changed).some((key) => this.changed[key])
      }
    },
    methods: {
      onChangeImage(e) {
        e.preventDefault()
        if (e.target.files[0]) {
          this.form.image = e.target.files[0]
          this.changed.image = true

          const reader = new FileReader()
          reader.readAsDataURL(this.form.image)
          reader.onload = () => {
            this.imageUrl = reader.result
          }
        }
      },
      onClickImageClose(e) {
        e.preventDefault()
        this.$refs.image.value = null
        if (this.form.image || this.account.image.url) {
          this.form.image = null
          this.imageUrl = DEFAULT_IMAGE_URL
          this.changed.image = true
        }
      },
      onClickSave(key) {
        axios.put('/api/accounts', {[key]: this.form[key]})
          .then((response) => {
            this.account = response.data
            this.form[key] = response.data[key]
            this.changed[key] = false
          })
      },
      onClickSaveAll(e) {
        e.preventDefault()
        const formData = new FormData()
        Object.keys(this.form).forEach((key) => {
          if (key !== 'image' || this.changed.image) {
            formData.append(key, this.form[key])
          }
        })
        axios.put('/api/accounts', formData)
          .then((response) => {
            this.account = response.data
            this.setForm(response.data)
            this.resetChanged()
          })
      },
      setForm(data) {
        this.imageUrl = data.image.url || DEFAULT_IMAGE_URL
        Object.keys(this.form)
          .filter(key => key !== 'image')
          .forEach((key) => this.form[key] = data[key] || '')
      },
      resetChanged() {
        Object.keys(this.changed).forEach((key) => this.changed[key] = false)
      },
    },
    created() {
      axios.get('/api/accounts').then((response) => {
        this.account = response.data
        this.setForm(response.data)
        this.resetChanged()
      })
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

  .accountImageButton {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #F3EDFF;
    border-radius: 4px;
    width: 200px;
    height: 56px;
    color: #9573D9;
    font-family: YuGo;
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    text-align: center;
  }

  .accountImage {
    object-fit: cover;
    border-radius: 4px;
    width: 56px;
    height: 56px;
  }

  .accountCloseButton {
    position: absolute;
    top: -7px;
    right: -7px;
  }
</style>
