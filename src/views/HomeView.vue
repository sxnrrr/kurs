
<script setup>
import { tours } from '../data/tours'

const popularTours = tours.slice(0, 6)
</script>

<template>
  <main class="home-page">
    <section class="hero">
      <div class="hero-content">
        <span class="hero-label">TRAVELGO · ОТКРОЙ МИР</span>

        <h1>Мир ближе, чем кажется</h1>

        <p>
          Открывайте удивительные страны, отдыхайте у моря
          и создавайте воспоминания, которые останутся с вами навсегда.
        </p>

        <div class="hero-actions">
          <RouterLink to="/tours" class="hero-button">
            Найти свой тур <span>→</span>
          </RouterLink>
          <span class="hero-note">16 направлений для вдохновения</span>
        </div>
      </div>
    </section>

    <section class="destinations-section">
      <div class="section-heading">
        <div>
          <span class="section-label">ВЫБОР ПУТЕШЕСТВЕННИКОВ</span>
          <h2>Популярные направления</h2>
          <p>Выбери место для следующего незабываемого отдыха.</p>
        </div>

        <RouterLink to="/tours" class="all-tours-link">
          Все туры <span>→</span>
        </RouterLink>
      </div>

      <div class="tour-grid">
        <article
          v-for="tour in popularTours"
          :key="tour.id"
          class="tour-card"
        >
          <div class="tour-image-wrap">
            <img
              class="tour-image"
              :src="tour.image"
              :alt="tour.title"
              loading="lazy"
            >
            <span class="tour-country">{{ tour.country }}</span>
          </div>

          <div class="tour-card-body">
            <p class="tour-location">
              <span class="location-dot">●</span>
              {{ tour.city }}, {{ tour.country }}
            </p>

            <h3>{{ tour.title }}</h3>

            <div class="tour-info">
              <span>◷ {{ tour.duration }} дней</span>
              <span>{{ tour.date }}</span>
            </div>

            <div class="tour-card-footer">
              <div class="price-block">
                <span class="price-label">Цена за тур</span>
                <p class="tour-price">
                  {{ Number(tour.price).toLocaleString('ru-RU') }} ₸
                </p>
              </div>

              <RouterLink
                :to="`/tours/${tour.id}`"
                class="tour-button"
              >
                Подробнее
              </RouterLink>
            </div>
          </div>
        </article>
      </div>

      <div class="more-tours">
        <p>Не нашли подходящее направление?</p>
        <RouterLink to="/tours" class="more-tours-button">
          Смотреть все направления
        </RouterLink>
      </div>
    </section>

    <section class="advantages-section">
      <div class="advantages-heading">
        <span class="section-label">ПОЧЕМУ TRAVELGO</span>
        <h2>Путешествовать легко</h2>
        <p>Всё необходимое для планирования отдыха — в одном месте.</p>
      </div>

      <div class="advantages">
        <article class="advantage-card">
          <div class="advantage-icon">✈</div>
          <h3>Много направлений</h3>
          <p>
            Сравнивайте страны, стоимость туров и даты поездок
            и выбирайте подходящий вариант.
          </p>
        </article>

        <article class="advantage-card">
          <div class="advantage-icon">♡</div>
          <h3>Удобное бронирование</h3>
          <p>
            Выбирайте путешествие и указывайте количество
            туристов для своей поездки.
          </p>
        </article>

        <article class="advantage-card">
          <div class="advantage-icon">✓</div>
          <h3>Все заявки под контролем</h3>
          <p>
            Просматривайте свои бронирования и проверяйте
            их текущий статус.
          </p>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  width: 100%;
  min-width: 0;
  padding-bottom: 48px;
  color: #183153;
}

.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 430px;
  box-sizing: border-box;
  overflow: hidden;
  padding: 60px clamp(24px, 7%, 90px);
  border-radius: 24px;
  color: #fff;
  background:
    linear-gradient(90deg, rgba(12, 34, 63, 0.91), rgba(12, 34, 63, 0.25)),
    url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85')
    center 48% / cover no-repeat;
}

.hero-content {
  width: 100%;
  max-width: 650px;
  min-width: 0;
}

.hero-label,
.section-label {
  display: inline-block;
  color: #438bd5;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.7px;
  line-height: 1.6;
}

.hero-label {
  color: #b9dcff;
}

.hero h1 {
  max-width: 600px;
  margin: 18px 0;
  font-size: clamp(36px, 5vw, 60px);
  line-height: 1.12;
  letter-spacing: -1.5px;
  overflow-wrap: anywhere;
}

.hero p {
  max-width: 540px;
  margin: 0;
  color: #e0eaf6;
  font-size: 16px;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  margin-top: 28px;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 48px;
  box-sizing: border-box;
  padding: 0 21px;
  border-radius: 12px;
  background: #fff;
  color: #1f65ad;
  font-weight: 800;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}

.hero-button:hover {
  background: #e9f4ff;
  transform: translateY(-2px);
}

.hero-note {
  color: #e0eaf6;
  font-size: 12px;
}

.destinations-section {
  padding-top: 56px;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 26px;
}

.section-heading h2,
.advantages-heading h2 {
  margin: 9px 0;
  font-size: clamp(25px, 3vw, 34px);
  line-height: 1.25;
  letter-spacing: -0.7px;
}

.section-heading p,
.advantages-heading > p {
  margin: 0;
  color: #71829b;
  font-size: 14px;
  line-height: 1.7;
}

.all-tours-link {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 9px;
  color: #2878d0;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
}

.all-tours-link:hover {
  color: #1456a0;
}

.tour-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: 24px;
}

.tour-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  border: 1px solid #e3edf7;
  border-radius: 19px;
  background: #fff;
  box-shadow: 0 8px 25px rgba(29, 75, 125, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.tour-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 34px rgba(29, 75, 125, 0.12);
}

.tour-image-wrap {
  position: relative;
  width: 100%;
  height: 205px;
  min-width: 0;
  overflow: hidden;
  flex-shrink: 0;
  background: #eaf3fc;
}

.tour-image {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.4s ease;
}

.tour-card:hover .tour-image {
  transform: scale(1.04);
}

.tour-country {
  position: absolute;
  top: 13px;
  left: 13px;
  max-width: calc(100% - 50px);
  overflow: hidden;
  padding: 7px 11px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.96);
  color: #2468b2;
  font-size: 12px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tour-card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  box-sizing: border-box;
  padding: 19px;
}

.tour-location {
  margin: 0 0 10px;
  color: #71829b;
  font-size: 12px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.location-dot {
  margin-right: 4px;
  color: #4290dc;
  font-size: 9px;
}

.tour-card-body h3 {
  min-height: 50px;
  margin: 0 0 15px;
  color: #183153;
  font-size: 18px;
  line-height: 1.4;
  overflow-wrap: anywhere;
  word-break: normal;
}

.tour-info {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-bottom: 18px;
  color: #71829b;
  font-size: 12px;
  line-height: 1.5;
}

.tour-card-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #edf1f6;
}

.price-block {
  min-width: 0;
  max-width: 100%;
}

.price-label {
  color: #71829b;
  font-size: 11px;
}

.tour-price {
  margin: 5px 0 0;
  color: #2169b7;
  font-size: clamp(17px, 1.7vw, 21px);
  font-weight: 800;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.tour-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-height: 39px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 13px;
  border-radius: 10px;
  background: #2878d0;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s;
}

.tour-button:hover {
  background: #1456a0;
}

.more-tours {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 32px;
  padding: 22px;
  border: 1px solid #dfebf8;
  border-radius: 16px;
  background: #f6faff;
  text-align: center;
}

.more-tours p {
  margin: 0;
  color: #5e718a;
  font-size: 14px;
}

.more-tours-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  box-sizing: border-box;
  padding: 0 16px;
  border-radius: 10px;
  background: #e3f1ff;
  color: #2169b7;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  transition: background 0.2s;
}

.more-tours-button:hover {
  background: #d2e8ff;
}

.advantages-section {
  margin-top: 66px;
  padding: 36px;
  border: 1px solid #e3edf7;
  border-radius: 22px;
  background: linear-gradient(135deg, #f3f9ff, #fff);
}

.advantages-heading {
  margin-bottom: 26px;
  text-align: center;
}

.advantages-heading > p {
  max-width: 550px;
  margin: 0 auto;
}

.advantages {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.advantage-card {
  min-width: 0;
  box-sizing: border-box;
  padding: 24px;
  border: 1px solid #e6eef7;
  border-radius: 16px;
  background: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
}

.advantage-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(29, 75, 125, 0.07);
}

.advantage-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-bottom: 17px;
  border-radius: 13px;
  background: #eaf4ff;
  color: #2878d0;
  font-size: 23px;
}

.advantage-card h3 {
  margin: 0 0 10px;
  font-size: 17px;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

.advantage-card p {
  margin: 0;
  color: #71829b;
  font-size: 13px;
  line-height: 1.8;
  overflow-wrap: anywhere;
}

@media (max-width: 1000px) {
  .tour-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .advantages {
    grid-template-columns: 1fr;
  }

  .advantages-section {
    padding: 26px;
  }
}

@media (max-width: 600px) {
  .hero {
    min-height: 390px;
    padding: 35px 22px;
    border-radius: 18px;
  }

  .hero h1 {
    letter-spacing: -0.7px;
  }

  .hero p {
    font-size: 14px;
  }

  .hero-actions {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .destinations-section {
    padding-top: 38px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .tour-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }

  .tour-image-wrap {
    height: 220px;
  }

  .tour-card-body h3 {
    min-height: 0;
  }

  .tour-card-footer {
    align-items: flex-start;
  }

  .advantages-section {
    margin-top: 42px;
    padding: 20px;
  }

  .advantage-card {
    padding: 20px;
  }
}
</style>
