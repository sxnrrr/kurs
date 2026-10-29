<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { name: 'Главная', path: '/' },
  { name: 'Все туры', path: '/tours' },
  { name: 'Мои бронирования', path: '/bookings' }
]
</script>

<template>
  <div class="site-wrapper">
    <header class="header">
      <div class="header-inner">
        <RouterLink to="/" class="logo">
          <span class="logo-icon">✈</span>
          <span>Travel<span class="logo-accent">Go</span></span>
        </RouterLink>

        <nav class="navigation">
          <RouterLink
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            class="nav-link"
            :class="{ active: route.path === link.path }"
          >
            {{ link.name }}
          </RouterLink>
        </nav>

        <div class="header-actions">
          <RouterLink to="/login" class="login-link">
            Войти
          </RouterLink>

          <RouterLink
            to="/register"
            class="register-header-button"
          >
            Регистрация
            <span>→</span>
          </RouterLink>
        </div>
      </div>
    </header>

    <main class="main-content">
      <RouterView v-slot="{ Component, route: currentRoute }">
        <Transition name="page" mode="out-in">
          <component
            :is="Component"
            :key="currentRoute.fullPath"
          />
        </Transition>
      </RouterView>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <RouterLink to="/" class="logo footer-logo">
          <span class="logo-icon">✈</span>
          <span>Travel<span class="logo-accent">Go</span></span>
        </RouterLink>

        <p class="footer-description">
          Открывайте мир вместе с нами.
        </p>

        <span class="copyright">
          © 2026 TravelGo. Все права защищены.
        </span>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

:root {
  font-family: 'Manrope', Arial, sans-serif;
  color: #172b4d;
  background: #f5f9ff;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --blue: #2878d0;
  --blue-dark: #1456a0;
  --sky: #eaf4ff;
  --text: #172b4d;
  --muted: #71829b;
  --border: #e5edf7;
  --white: #ffffff;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  width: 100%;
  min-width: 320px;
  scroll-behavior: smooth;
}

body {
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  overflow-x: hidden;
}

body,
button,
input,
select,
textarea {
  font-family: 'Manrope', Arial, sans-serif;
}

button,
input,
select,
textarea {
  font: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

img,
video,
iframe {
  max-width: 100%;
}

img {
  height: auto;
}

#app {
  width: 100%;
  min-width: 0;
}

.site-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(220, 233, 248, 0.9);
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(18px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: min(1240px, calc(100% - 48px));
  min-height: 76px;
  margin: 0 auto;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;
  color: #12345c;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -1px;
}

.logo-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 13px;
  color: white;
  background: linear-gradient(135deg, #4da8f7, #2368c8);
  box-shadow: 0 6px 15px rgba(40, 120, 208, 0.2);
  font-size: 21px;
}

.logo-accent {
  color: #348de3;
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-width: 0;
}

.nav-link {
  position: relative;
  padding: 11px 13px;
  border-radius: 10px;
  color: #64758d;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  transition: color 0.2s ease, background 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--blue);
  background: #edf6ff;
}

.nav-link::after {
  position: absolute;
  right: 13px;
  bottom: 5px;
  left: 13px;
  height: 2px;
  border-radius: 2px;
  background: var(--blue);
  content: '';
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}

.header-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  flex-shrink: 0;
}

.login-link {
  color: #536782;
  font-size: 12px;
  font-weight: 800;
  transition: color 0.2s ease;
}

.login-link:hover {
  color: var(--blue);
}

.register-header-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 41px;
  padding: 0 15px;
  border: 1px solid transparent;
  border-radius: 11px;
  color: white;
  background: linear-gradient(135deg, #49a5f6, #226ac8);
  box-shadow: 0 6px 15px rgba(40, 120, 208, 0.17);
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.register-header-button span {
  font-size: 16px;
  transition: transform 0.2s ease;
}

.register-header-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 9px 20px rgba(40, 120, 208, 0.27);
}

.register-header-button:hover span {
  transform: translateX(3px);
}

.main-content {
  flex: 1;
  width: 100%;
  min-width: 0;
  min-height: 60vh;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(7px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Компактный футер */

.footer {
  margin-top: 32px;
  padding: 13px 0;
  border-top: 1px solid rgba(220, 233, 248, 0.12);
  color: #d7e7fb;
  background: #102b50;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  width: min(1240px, calc(100% - 48px));
  min-height: 54px;
  margin: 0 auto;
}

.footer-logo {
  gap: 8px;
  color: white;
  font-size: 19px;
}

.footer-logo .logo-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  font-size: 17px;
  box-shadow: none;
}

.footer-description {
  margin: 0;
  color: #c1d2e8;
  font-size: 11px;
  line-height: 1.5;
}

.copyright {
  color: #a9bfdc;
  font-size: 10px;
  text-align: right;
}

/* Общие стили кнопок страниц */

.primary-button,
.details-button,
.tour-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 11px 17px;
  border: 1px solid transparent;
  border-radius: 11px;
  color: white;
  background: linear-gradient(135deg, #3988ed, #2467c8);
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.primary-button:hover,
.details-button:hover,
.tour-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(43, 116, 213, 0.2);
}

.primary-button:focus-visible,
.details-button:focus-visible,
.tour-button:focus-visible,
.register-header-button:focus-visible,
.nav-link:focus-visible,
.login-link:focus-visible {
  outline: 3px solid #9bc7ff;
  outline-offset: 3px;
}

/* Карточки туров */

.tours-grid,
.tour-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: 24px;
}

.tour-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid #e2edf8;
  border-radius: 20px;
  background: white;
  box-shadow: 0 8px 28px rgba(28, 83, 140, 0.07);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.tour-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 32px rgba(28, 83, 140, 0.13);
}

.tour-card img,
.tour-image,
.tour-photo {
  display: block;
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.tour-card-content {
  min-width: 0;
  padding: 20px;
  overflow-wrap: anywhere;
}

/* Планшеты и небольшие ноутбуки */

@media (max-width: 1000px) {
  .header-inner {
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px 18px;
    padding: 12px 0;
  }

  .navigation {
    order: 3;
    justify-content: flex-start;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .nav-link {
    padding: 10px 12px;
  }

  .tours-grid,
  .tour-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Телефоны */

@media (max-width: 600px) {
  .header-inner,
  .footer-inner {
    width: calc(100% - 28px);
  }

  .header-inner {
    gap: 12px;
  }

  .logo {
    gap: 7px;
    font-size: 20px;
  }

  .logo-icon {
    width: 34px;
    height: 34px;
    border-radius: 11px;
    font-size: 18px;
  }

  .header-actions {
    gap: 10px;
  }

  .login-link {
    font-size: 11px;
  }

  .register-header-button {
    min-height: 36px;
    gap: 5px;
    padding: 0 10px;
    border-radius: 9px;
    font-size: 10px;
  }

  .navigation {
    gap: 2px;
  }

  .nav-link {
    padding: 9px 10px;
    font-size: 11px;
  }

  .nav-link::after {
    right: 10px;
    left: 10px;
  }

  .tours-grid,
  .tour-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 17px;
  }

  .tour-card img,
  .tour-image,
  .tour-photo {
    height: 210px;
  }

  .tour-card-content {
    padding: 16px;
  }

  .footer {
    margin-top: 22px;
    padding: 12px 0;
  }

  .footer-inner {
    min-height: auto;
    flex-direction: column;
    justify-content: center;
    gap: 7px;
    text-align: center;
  }

  .footer-logo {
    font-size: 18px;
  }

  .footer-logo .logo-icon {
    width: 29px;
    height: 29px;
    font-size: 16px;
  }

  .footer-description {
    font-size: 10px;
  }

  .copyright {
    font-size: 9px;
    text-align: center;
  }
}

/* Маленькие телефоны */

@media (max-width: 360px) {
  .header-inner,
  .footer-inner {
    width: calc(100% - 20px);
  }

  .logo {
    font-size: 18px;
  }

  .header-actions {
    gap: 7px;
  }

  .register-header-button {
    padding: 0 8px;
    font-size: 9px;
  }

  .nav-link {
    padding: 8px;
    font-size: 10px;
  }
}

/* Учитываем настройки уменьшения анимации */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>