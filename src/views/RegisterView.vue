<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const message = ref('')

function register() {
  message.value = 'Форма заполнена. Регистрацию необходимо подключить к Laravel API.'
}
</script>

<template>
  <section class="register-page">
    <div class="register-decoration decoration-one"></div>
    <div class="register-decoration decoration-two"></div>

    <form class="register-card" @submit.prevent="register">
      <div class="register-icon">
        <span>✈</span>
      </div>

      <p class="register-label">ДОБРО ПОЖАЛОВАТЬ В TRAVELGO</p>
      <h1>Создайте аккаунт</h1>
      <p class="register-description">
        Зарегистрируйтесь, чтобы открывать новые места и бронировать путешествия.
      </p>

      <div class="form-group">
        <label for="name">Ваше имя</label>
        <input
          id="name"
          v-model.trim="name"
          type="text"
          placeholder="Введите ваше имя"
          autocomplete="name"
          required
        >
      </div>

      <div class="form-group">
        <label for="email">Электронная почта</label>
        <input
          id="email"
          v-model.trim="email"
          type="email"
          placeholder="example@mail.com"
          autocomplete="email"
          required
        >
      </div>

      <div class="form-group">
        <label for="password">Пароль</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Минимум 8 символов"
          autocomplete="new-password"
          minlength="8"
          required
        >
        <span class="field-hint">Используйте не менее 8 символов.</span>
      </div>

      <button type="submit" class="register-button">
        Зарегистрироваться
        <span>→</span>
      </button>

      <transition name="message">
        <div v-if="message" class="success-message" role="status">
          <span class="message-icon">✓</span>
          <p>{{ message }}</p>
        </div>
      </transition>

      <div class="register-bottom">
        <span class="bottom-line"></span>
        <p>Ваше следующее путешествие начинается здесь</p>
        <span class="bottom-line"></span>
      </div>
    </form>
  </section>
</template>

<style scoped>
.register-page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 650px;
  padding: 54px 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #f0f7ff 0%, #f8fbff 50%, #eaf4ff 100%);
}

.register-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 460px;
  padding: 38px 40px 30px;
  border: 1px solid rgba(219, 232, 248, 0.9);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 20px 60px rgba(38, 83, 135, 0.11);
}

.register-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  margin: 0 auto 22px;
  border-radius: 18px;
  color: #fff;
  background: linear-gradient(135deg, #3988ed, #2164c5);
  box-shadow: 0 8px 20px rgba(43, 116, 213, 0.25);
}

.register-icon span {
  font-size: 28px;
  transform: rotate(-12deg);
}

.register-label {
  margin: 0 0 10px;
  color: #3478ce;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.6px;
  text-align: center;
}

.register-card h1 {
  margin: 0;
  color: #172b49;
  font-size: clamp(25px, 4vw, 31px);
  font-weight: 800;
  letter-spacing: -0.8px;
  text-align: center;
}

.register-description {
  max-width: 330px;
  margin: 12px auto 28px;
  color: #78869a;
  font-size: 14px;
  line-height: 1.7;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 20px;
}

.form-group label {
  color: #263c59;
  font-size: 13px;
  font-weight: 700;
}

.form-group input {
  width: 100%;
  min-width: 0;
  height: 49px;
  padding: 0 15px;
  border: 1px solid #dfe8f3;
  border-radius: 12px;
  outline: none;
  color: #213650;
  background: #f9fbfe;
  font: inherit;
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.form-group input::placeholder {
  color: #a5b1c1;
}

.form-group input:hover {
  border-color: #b9d2f1;
}

.form-group input:focus {
  border-color: #3988ed;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(57, 136, 237, 0.11);
}

.field-hint {
  color: #8b98aa;
  font-size: 11px;
}

.register-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  min-height: 51px;
  margin-top: 8px;
  padding: 12px 18px;
  border: none;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(110deg, #3988ed, #2467c8);
  box-shadow: 0 8px 18px rgba(43, 116, 213, 0.2);
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

.register-button span {
  font-size: 20px;
  transition: transform 0.2s ease;
}

.register-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(43, 116, 213, 0.27);
  filter: brightness(1.04);
}

.register-button:hover span {
  transform: translateX(4px);
}

.register-button:active {
  transform: translateY(0);
}

.register-button:focus-visible {
  outline: 3px solid #9bc7ff;
  outline-offset: 3px;
}

.success-message {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 18px;
  padding: 13px;
  border: 1px solid #c9eadb;
  border-radius: 12px;
  color: #246b4a;
  background: #effaf4;
}

.success-message p {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
}

.message-icon {
  display: flex;
  flex: 0 0 22px;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: white;
  background: #39a873;
  font-size: 13px;
  font-weight: 800;
}

.message-enter-active,
.message-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

.register-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 27px;
}

.register-bottom p {
  margin: 0;
  color: #96a2b2;
  font-size: 10px;
  text-align: center;
}

.bottom-line {
  width: 17px;
  height: 1px;
  background: #dce6f1;
}

.register-decoration {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.decoration-one {
  top: 7%;
  left: 8%;
  width: 180px;
  height: 180px;
  border: 30px solid rgba(81, 151, 239, 0.07);
}

.decoration-two {
  right: 7%;
  bottom: 5%;
  width: 230px;
  height: 230px;
  background: rgba(81, 151, 239, 0.06);
}

@media (max-width: 600px) {
  .register-page {
    min-height: auto;
    padding: 32px 14px;
  }

  .register-card {
    padding: 30px 22px 25px;
    border-radius: 20px;
  }

  .register-description {
    margin-bottom: 24px;
    font-size: 13px;
  }

  .form-group {
    margin-bottom: 17px;
  }

  .register-bottom {
    gap: 6px;
  }

  .register-bottom p {
    font-size: 9px;
  }

  .decoration-one {
    left: -100px;
  }

  .decoration-two {
    right: -130px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .register-button,
  .register-button span,
  .form-group input,
  .message-enter-active,
  .message-leave-active {
    transition: none;
  }
}
</style>