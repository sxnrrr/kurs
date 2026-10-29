<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const message = ref('')

function login() {
  message.value = 'Форма работает. Для настоящего входа необходимо подключить Laravel API.'
}
</script>

<template>
  <section class="login-page">
    <div class="login-decoration decoration-one"></div>
    <div class="login-decoration decoration-two"></div>

    <form class="login-card" @submit.prevent="login">
      <div class="login-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M20 7.5 9.5 18 4 12.5"></path>
          <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"></path>
          <path d="M3 12h10"></path>
        </svg>
      </div>

      <p class="login-eyebrow">СНОВА РАДЫ ВАС ВИДЕТЬ</p>
      <h1>С возвращением!</h1>
      <p class="login-description">
        Войдите в аккаунт, чтобы управлять своими путешествиями и бронированиями.
      </p>

      <div class="login-field">
        <label for="login-email">Электронная почта</label>
        <div class="input-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="3"></rect>
            <path d="m4 7 8 6 8-6"></path>
          </svg>
          <input
            id="login-email"
            v-model.trim="email"
            type="email"
            placeholder="example@mail.com"
            autocomplete="email"
            required
          >
        </div>
      </div>

      <div class="login-field">
        <label for="login-password">Пароль</label>
        <div class="input-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true">
            <rect x="4" y="10" width="16" height="11" rx="2.5"></rect>
            <path d="M8 10V7a4 4 0 0 1 8 0v3"></path>
          </svg>
          <input
            id="login-password"
            v-model="password"
            type="password"
            placeholder="Введите пароль"
            autocomplete="current-password"
            required
          >
        </div>
      </div>

      <button type="submit" class="login-button">
        <span>Войти в аккаунт</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </button>

      <div v-if="message" class="login-message" role="status">
        <span class="message-icon">✓</span>
        <p>{{ message }}</p>
      </div>

      <div class="login-divider">
        <span></span>
        <span>НОВЫЙ ПУТЕШЕСТВЕННИК?</span>
        <span></span>
      </div>

      <p class="register-prompt">
        Ещё нет аккаунта?
        <RouterLink to="/register">Создать аккаунт</RouterLink>
      </p>

      <p class="login-security">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true">
          <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
        Ваши путешествия начинаются здесь
      </p>
    </form>
  </section>
</template>

<style scoped>
.login-page {
  position: relative;
  isolation: isolate;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 650px;
  padding: 54px 20px 70px;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 10% 10%, #dceeff 0, transparent 42%),
    radial-gradient(ellipse at 90% 85%, #e2eaff 0, transparent 40%),
    #f6f9ff;
}

.login-decoration {
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  pointer-events: none;
}

.decoration-one {
  width: 300px;
  height: 300px;
  top: -130px;
  right: -70px;
  background: linear-gradient(135deg, #b7d9ff, #e6efff);
  opacity: 0.6;
}

.decoration-two {
  width: 230px;
  height: 230px;
  bottom: -110px;
  left: -55px;
  background: linear-gradient(135deg, #d5e5ff, #c4d9ff);
  opacity: 0.7;
}

.login-card {
  width: 100%;
  max-width: 460px;
  padding: 38px 40px 28px;
  border: 1px solid rgba(219, 230, 247, 0.9);
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 24px 70px rgba(32, 75, 135, 0.12);
  animation: card-appear 0.5s ease both;
}

.login-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  margin: 0 auto 22px;
  border-radius: 18px;
  color: #fff;
  background: linear-gradient(135deg, #3478f6, #2456d9);
  box-shadow: 0 9px 22px rgba(52, 120, 246, 0.25);
}

.login-icon svg {
  width: 29px;
  height: 29px;
}

.login-eyebrow {
  margin: 0 0 10px;
  color: #3974e8;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.7px;
  text-align: center;
}

.login-card h1 {
  margin: 0;
  color: #172b4d;
  font-size: clamp(26px, 4vw, 32px);
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.2;
  text-align: center;
}

.login-description {
  max-width: 340px;
  margin: 13px auto 29px;
  color: #71809a;
  font-size: 14px;
  line-height: 1.7;
  text-align: center;
}

.login-field {
  margin-bottom: 19px;
}

.login-field label {
  display: block;
  margin-bottom: 8px;
  color: #263955;
  font-size: 13px;
  font-weight: 700;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 11px;
  min-height: 52px;
  padding: 0 14px;
  border: 1px solid #dce5f2;
  border-radius: 12px;
  background: #fbfcff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease,
    background 0.2s ease;
}

.input-wrapper:focus-within {
  border-color: #4b83f4;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(75, 131, 244, 0.11);
}

.input-wrapper svg {
  flex-shrink: 0;
  width: 19px;
  height: 19px;
  color: #8b9bb4;
}

.input-wrapper input {
  width: 100%;
  min-width: 0;
  height: 48px;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: #172b4d;
  font: inherit;
  font-size: 14px;
}

.input-wrapper input::placeholder {
  color: #a5b0c2;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  min-height: 53px;
  margin-top: 26px;
  padding: 13px 20px;
  border: 0;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(110deg, #3478f6, #2456d9);
  box-shadow: 0 9px 20px rgba(52, 120, 246, 0.23);
  cursor: pointer;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  transition: transform 0.2s ease, box-shadow 0.2s ease,
    filter 0.2s ease;
}

.login-button svg {
  width: 19px;
  height: 19px;
  transition: transform 0.2s ease;
}

.login-button:hover {
  filter: brightness(1.06);
  box-shadow: 0 12px 26px rgba(52, 120, 246, 0.3);
  transform: translateY(-2px);
}

.login-button:hover svg {
  transform: translateX(3px);
}

.login-button:active {
  transform: translateY(0);
}

.login-message {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 18px;
  padding: 13px;
  border: 1px solid #cde8d8;
  border-radius: 12px;
  background: #f0fbf4;
  color: #246b45;
  font-size: 13px;
  line-height: 1.6;
}

.login-message p {
  margin: 0;
}

.message-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background: #d2f2de;
  font-weight: 800;
}

.login-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 27px 0 18px;
  color: #9aa7bb;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1px;
  white-space: nowrap;
}

.login-divider span:first-child,
.login-divider span:last-child {
  flex: 1;
  height: 1px;
  background: #e7edf6;
}

.register-prompt {
  margin: 0;
  color: #71809a;
  font-size: 13px;
  text-align: center;
}

.register-prompt a {
  margin-left: 4px;
  color: #3478f6;
  font-weight: 800;
  text-decoration: none;
  transition: color 0.2s ease;
}

.register-prompt a:hover {
  color: #194dbd;
  text-decoration: underline;
}

.login-security {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin: 25px 0 0;
  color: #8b9ab0;
  font-size: 11px;
}

.login-security svg {
  width: 16px;
  height: 16px;
  color: #6b91d9;
}

@keyframes card-appear {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .login-page {
    min-height: auto;
    padding: 35px 15px 45px;
  }

  .login-card {
    max-width: 420px;
    padding: 30px 23px 24px;
    border-radius: 22px;
  }

  .login-description {
    margin-bottom: 25px;
    font-size: 13px;
  }

  .decoration-one {
    width: 200px;
    height: 200px;
  }

  .decoration-two {
    width: 160px;
    height: 160px;
  }
}

@media (max-width: 360px) {
  .login-card {
    padding: 26px 17px 22px;
  }

  .login-divider {
    gap: 7px;
    font-size: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>