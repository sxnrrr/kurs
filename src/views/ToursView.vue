
<script setup>
import { computed, ref } from 'vue'
import { tours } from '../data/tours'

const country = ref('')
const maxPrice = ref('')
const startDate = ref('')

const countries = [...new Set(tours.map(tour => tour.country))]

const filteredTours = computed(() => {
  return tours.filter(tour => {
    const countryMatches =
      !country.value || tour.country === country.value

    const priceMatches =
      !maxPrice.value || tour.price <= Number(maxPrice.value)

    const dateMatches =
      !startDate.value || tour.date >= startDate.value

    return countryMatches && priceMatches && dateMatches
  })
})

function resetFilters() {
  country.value = ''
  maxPrice.value = ''
  startDate.value = ''
}
</script>

<template>
  <main class="catalog-page">
    <section class="catalog-hero">
      <span class="catalog-label">TRAVELGO · ПУТЕШЕСТВИЯ</span>
      <h1>Найди своё идеальное путешествие</h1>
      <p>Выбирай направление, сравнивай цены и планируй отдых мечты.</p>
    </section>

    <section class="catalog-content">
      <div class="catalog-heading">
        <div>
          <h2>Каталог туров</h2>
          <p>Подбери поездку под свои предпочтения</p>
        </div>

        <span class="results-count">
          Найдено: {{ filteredTours.length }}
        </span>
      </div>

      <div class="filters">
        <div class="filter-field">
          <label for="country">Страна</label>
          <select id="country" v-model="country">
            <option value="">Все страны</option>
            <option v-for="item in countries" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>

        <div class="filter-field">
          <label for="price">Максимальная цена, ₸</label>
          <input
            id="price"
            v-model="maxPrice"
            type="number"
            min="0"
            placeholder="Например, 350000"
          >
        </div>

        <div class="filter-field">
          <label for="date">Дата поездки от</label>
          <input id="date" v-model="startDate" type="date">
        </div>

        <button class="reset-button" type="button" @click="resetFilters">
          Сбросить
        </button>
      </div>

      <div v-if="filteredTours.length" class="tour-grid">
        <article
          v-for="tour in filteredTours"
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
            <span class="country-badge">{{ tour.country }}</span>
          </div>

          <div class="tour-card-body">
            <p class="tour-location">{{ tour.city }}, {{ tour.country }}</p>

            <h3>{{ tour.title }}</h3>

            <div class="tour-details">
              <span>◷ {{ tour.duration }} дней</span>
              <span>Дата: {{ tour.date }}</span>
            </div>

            <div class="tour-card-bottom">
              <div>
                <span class="price-caption">Стоимость тура</span>
                <p class="tour-price">
                  {{ Number(tour.price).toLocaleString('ru-RU') }} ₸
                </p>
              </div>

              <RouterLink
                :to="`/tours/${tour.id}`"
                class="details-button"
              >
                Подробнее →
              </RouterLink>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <h3>Туры не найдены</h3>
        <p>Попробуй изменить параметры поиска.</p>
        <button class="reset-button" type="button" @click="resetFilters">
          Показать все туры
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.catalog-page {
  width: 100%;
  min-width: 0;
  color: #183153;
  padding-bottom: 48px;
}

.catalog-hero {
  padding: 42px 36px;
  margin-bottom: 32px;
  border-radius: 24px;
  background: linear-gradient(120deg, #eaf5ff, #f5faff);
  border: 1px solid #dcecff;
}

.catalog-label {
  display: inline-block;
  margin-bottom: 14px;
  color: #2878d0;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.catalog-hero h1 {
  max-width: 680px;
  margin: 0 0 14px;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.2;
}

.catalog-hero p,
.catalog-heading p {
  margin: 0;
  color: #71829b;
  line-height: 1.6;
}

.catalog-content {
  width: 100%;
  min-width: 0;
}

.catalog-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
}

.catalog-heading h2 {
  margin: 0 0 8px;
  font-size: 28px;
}

.results-count {
  flex-shrink: 0;
  padding: 10px 15px;
  border-radius: 12px;
  background: #edf6ff;
  color: #2468b2;
  font-weight: 700;
}

.filters {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
  align-items: end;
  gap: 16px;
  margin-bottom: 26px;
  padding: 22px;
  border: 1px solid #e1ebf6;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 8px 26px rgba(36, 88, 145, 0.06);
}

.filter-field {
  min-width: 0;
}

.filter-field label {
  display: block;
  margin-bottom: 9px;
  color: #425875;
  font-size: 13px;
  font-weight: 700;
}

.filter-field input,
.filter-field select {
  display: block;
  width: 100%;
  min-width: 0;
  height: 46px;
  box-sizing: border-box;
  padding: 0 12px;
  border: 1px solid #dce6f1;
  border-radius: 11px;
  outline: none;
  background: #fbfdff;
  color: #183153;
  font: inherit;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.filter-field input:focus,
.filter-field select:focus {
  border-color: #5a9be2;
  box-shadow: 0 0 0 3px rgba(67, 145, 224, 0.12);
}

.reset-button {
  min-height: 46px;
  padding: 0 16px;
  border: 1px solid #cfe2f7;
  border-radius: 11px;
  background: #f0f7ff;
  color: #2468b2;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.reset-button:hover {
  background: #e0efff;
  transform: translateY(-1px);
}

.tour-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: 24px;
}

.tour-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid #e4edf7;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 7px 24px rgba(36, 88, 145, 0.07);
  transition: transform 0.25s, box-shadow 0.25s;
}

.tour-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 32px rgba(36, 88, 145, 0.13);
}

.tour-image-wrap {
  position: relative;
  width: 100%;
  height: 210px;
  overflow: hidden;
  background: #eaf3fc;
}

.tour-image {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.35s;
}

.tour-card:hover .tour-image {
  transform: scale(1.04);
}

.country-badge {
  position: absolute;
  left: 14px;
  top: 14px;
  padding: 7px 11px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.95);
  color: #2468b2;
  font-size: 12px;
  font-weight: 800;
}

.tour-card-body {
  display: flex;
  flex-direction: column;
  min-height: 205px;
  padding: 19px;
}

.tour-location {
  margin: 0 0 9px;
  color: #71829b;
  font-size: 13px;
}

.tour-card-body h3 {
  margin: 0 0 14px;
  font-size: 19px;
  line-height: 1.4;
}

.tour-details {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 20px;
  color: #71829b;
  font-size: 13px;
}

.tour-card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 12px;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #edf1f6;
}

.price-caption {
  color: #71829b;
  font-size: 11px;
}

.tour-price {
  margin: 5px 0 0;
  color: #1e67b7;
  font-size: 20px;
  font-weight: 800;
  white-space: nowrap;
}

.details-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 13px;
  border-radius: 10px;
  background: #2878d0;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s;
}

.details-button:hover {
  background: #1456a0;
}

.empty-state {
  padding: 48px 20px;
  border: 1px dashed #cbdced;
  border-radius: 18px;
  text-align: center;
  background: #f8fbff;
}

.empty-state h3 {
  margin: 0 0 10px;
}

.empty-state p {
  margin: 0 0 20px;
  color: #71829b;
}

@media (max-width: 1050px) {
  .tour-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .filters {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .catalog-hero {
    padding: 28px 20px;
    border-radius: 18px;
  }

  .catalog-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .filters,
  .tour-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    padding: 16px;
  }

  .tour-image-wrap {
    height: 210px;
  }

  .tour-card-bottom {
    align-items: flex-start;
    flex-direction: column;
  }
}

.tour-card,
.tour-card-body,
.tour-card-bottom,
.tour-image-wrap {
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}

.tour-card-body h3 {
  overflow-wrap: anywhere;
  word-break: normal;
}

.tour-details,
.tour-location {
  overflow-wrap: anywhere;
}

.tour-card-bottom {
  flex-wrap: wrap;
}

.tour-price {
  white-space: normal;
  overflow-wrap: anywhere;
}

.details-button {
  max-width: 100%;
  box-sizing: border-box;
}

.tour-image {
  object-fit: cover;
}

</style>
