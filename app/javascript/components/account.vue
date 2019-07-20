<template>
  <div class="card">
    <form>
      <div class="u-flex u-mb32 u-alignItems_center">
        <label class="accountImageButton">
          <span>アカウント画像を設定</span>
          <input type="file" class="u-none" @change="onChangeImage" />
        </label>
        <div class="c-position_relative">
          <img class="accountImage u-ml16" :src="imageUrl">
          <span class="c-button_close accountCloseButton" @click="onClickImageClose">x</span>
        </div>
        <button class="c-button_save u-ml_auto" :disabled="!isChangedSomething" @click="onClickSaveAll">全て保存</button>
      </div>

      <div class="u-mb32">
        <label class="c-formLabel">販売者名</label>
        <div class="c-inputGroup">
          <input v-model="form.name" type="text" class="c-input"/>
          <button class="c-button_save u-ml20 u-mt4" :disabled="!changed.name" @click="onClickSave('name')">保存</button>
        </div>
      </div>

      <div class="u-mb32">
        <label class="c-formLabel">メールアドレス</label>
        <div class="c-inputGroup">
          <input v-model="form.email" type="text" class="c-input"/>
          <button class="c-button_save u-ml20 u-mt4" :disabled="!changed.email" @click="onClickSave('email')">保存</button>
        </div>
      </div>

      <div class="u-mb32">
        <label class="c-formLabel">紹介文（ユーザーが見る紹介文です）</label>
        <div class="c-inputGroup">
          <textarea v-model="form.description" class="c-textarea"/>
          <button class="c-button_save u-ml20 u-mt4" :disabled="!changed.description" @click="onClickSave('description')">保存</button>
        </div>
      </div>

      <div class="u-mb32">
        <label class="c-formLabel ">口座情報</label>
        <div class="c-inputGroup">
          <input v-model="form.bankAccount" type="text" class="c-input"/>
          <button class="c-button_save u-ml20 u-mt4" :disabled="!changed.bankAccount" @click="onClickSave('bankAccount')">保存</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
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
          bankAccount: '',
        },
        form: {
          image: null,
          name: '',
          email: '',
          description: '',
          bankAccount: '',
        },
        changed: {
          image: false,
          name: false,
          email: false,
          description: false,
          bankAccount: false
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
      'form.image': function () {
        if (this.form.image) {
          const reader = new FileReader()
          reader.readAsDataURL(this.form.image)
          reader.onload = () => {
            this.imageUrl = reader.result
          }
        } else if(this.account.image) {
          this.imageUrl = this.account.image
        } else {
          this.imageUrl = DEFAULT_IMAGE_URL
        }
      }
    },
    computed: {
      isChangedSomething() {
        return Object.keys(this.changed).some((key) => this.changed[key])
      }
    },
    methods: {
      onChangeImage(e) {
        e.preventDefault()
        this.form.image = e.target.files[0]
        this.changed.image = true
      },
      onClickImageClose(e) {
        e.preventDefault()
        if (this.form.image) {
          this.form.image = null
          this.imageUrl = DEFAULT_IMAGE_URL
          this.changed.image = true
        }
      },
      onClickSave(key) {
        //  TODO: put and update account
        this.changed[key] = false
      },
      onClickSaveAll(e) {
        e.preventDefault()
        //  TODO: put and update account
        Object.keys(this.changed).forEach((key) => this.changed[key] = false)
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
