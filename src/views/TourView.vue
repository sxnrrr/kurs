<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { tours } from '../data/tours'

const route = useRoute()

const tour = computed(() =>
  tours.find(item => item.id === Number(route.params.id))
)

const tourists = ref(1)
const message = ref('')

const reviewName = ref('')
const reviewText = ref('')
const reviewRating = ref(5)
const reviewMessage = ref('')

const reviewStorageKey = computed(() =>
  `travelReviews_${route.params.id}`
)

const exampleReviews = {
  1: [
    {
      id: 'example-1',
      name: 'Анна',
      rating: 5,
      text: 'Отличный отдых! Красивое море, хороший отель и много приятных впечатлений.',
      date: '15.09.2026'
    },
    {
      id: 'example-2',
      name: 'Дмитрий',
      rating: 4,
      text: 'Путешествие понравилось. Хотелось бы немного больше свободного времени на экскурсии.',
      date: '22.08.2026'
    }
  ],
  2: [
    {
      id: 'example-3',
      name: 'Мария',
      rating: 5,
      text: 'Очень красивое место! Понравились прогулки, местная кухня и атмосфера города.',
      date: '10.09.2026'
    },
    {
      id: 'example-4',
      name: 'Алексей',
      rating: 4,
      text: 'Хороший тур, много интересных мест и красивых фотографий.',
      date: '02.08.2026'
    }
  ]
}

function loadReviews() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(reviewStorageKey.value) || '[]'
    )

    if (Array.isArray(saved)) {
      return saved
    }
  } catch {
    return []
  }

  return []
}

const reviews = ref([])

watch(
  reviewStorageKey,
  () => {
    reviews.value = loadReviews()
    reviewName.value = ''
    reviewText.value = ''
    reviewRating.value = 5
    reviewMessage.value = ''
  },
  { immediate: true }
)

const allReviews = computed(() => {
  const examples = exampleReviews[tour.value?.id] || []

  return [...reviews.value, ...examples]
})

const averageRating = computed(() => {
  if (!allReviews.value.length) return '—'

  const total = allReviews.value.reduce(
    (sum, review) => sum + review.rating,
    0
  )

  return (total / allReviews.value.length).toFixed(1)
})

const totalPrice = computed(() => {
  return tour.value
    ? tour.value.price * Number(tourists.value)
    : 0
})

function bookTour() {
  if (!tour.value) return

  const bookings = JSON.parse(
    localStorage.getItem('travelBookings') || '[]'
  )

  bookings.push({
    id: Date.now(),
    tourId: tour.value.id,
    title: tour.value.title,
    tourists: Number(tourists.value),
    totalPrice: totalPrice.value,
    status: 'Ожидает подтверждения'
  })

  localStorage.setItem('travelBookings', JSON.stringify(bookings))
  message.value = 'Демонстрационная заявка сохранена в браузере.'
}

function addReview() {
  if (!tour.value) return

  const name = reviewName.value.trim()
  const text = reviewText.value.trim()

  if (!name || !text) {
    reviewMessage.value = 'Заполни имя и текст отзыва.'
    return
  }

  const newReview = {
    id: Date.now(),
    name,
    rating: Number(reviewRating.value),
    text,
    date: new Date().toLocaleDateString('ru-RU')
  }

  reviews.value = [newReview, ...reviews.value]

  localStorage.setItem(
    reviewStorageKey.value,
    JSON.stringify(reviews.value)
  )

  reviewName.value = ''
  reviewText.value = ''
  reviewRating.value = 5
  reviewMessage.value = 'Спасибо! Твой отзыв добавлен.'
}

function starText(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}
</script>

<template>
  <main v-if="tour" class="tour-page">
    <RouterLink to="/tours" class="back-link">
      ← Назад к каталогу
    </RouterLink>

    <section class="tour-intro">
      <div class="tour-cover">
        <img :src="tour.image" :alt="tour.title">
        <span class="cover-country">
          {{ tour.country }} · {{ tour.city }}
        </span>
      </div>

      <div class="tour-heading">
        <p class="eyebrow">ВАШЕ СЛЕДУЮЩЕЕ ПУТЕШЕСТВИЕ</p>
        <h1>{{ tour.title }}</h1>
        <p class="tour-description">{{ tour.description }}</p>

        <div class="rating-summary">
          <span class="summary-stars">★</span>
          <strong>{{ averageRating }}</strong>
          <span class="rating-count">
            {{ allReviews.length }}
            {{ allReviews.length === 1 ? 'отзыв' : 'отзывов' }}
          </span>
        </div>
      </div>
    </section>

    <div class="tour-layout">
      <section class="tour-main">
        <div class="details-panel">
          <h2>Информация о туре</h2>

          <div class="details-grid">
            <div class="detail-item">
              <span class="detail-icon">📅</span>
              <div>
                <span class="detail-label">Дата начала</span>
                <strong>{{ tour.date }}</strong>
              </div>
            </div>

            <div class="detail-item">
              <span class="detail-icon">🕒</span>
              <div>
                <span class="detail-label">Продолжительность</span>
                <strong>{{ tour.duration }} дней</strong>
              </div>
            </div>

            <div class="detail-item">
              <span class="detail-icon">👥</span>
              <div>
                <span class="detail-label">Доступные места</span>
                <strong>{{ tour.places }}</strong>
              </div>
            </div>

            <div class="detail-item">
              <span class="detail-icon">📍</span>
              <div>
                <span class="detail-label">Направление</span>
                <strong>{{ tour.city }}, {{ tour.country }}</strong>
              </div>
            </div>
          </div>
        </div>

        <section class="reviews-section">
          <div class="reviews-heading">
            <div>
              <p class="eyebrow">ВПЕЧАТЛЕНИЯ ПУТЕШЕСТВЕННИКОВ</p>
              <h2>Отзывы туристов</h2>
            </div>

            <div class="average-card">
              <strong>{{ averageRating }}</strong>
              <span class="average-stars">★★★★★</span>
              <span>{{ allReviews.length }} отзывов</span>
            </div>
          </div>

          <div v-if="allReviews.length" class="reviews-list">
            <article
              v-for="review in allReviews"
              :key="review.id"
              class="review-card"
            >
              <div class="review-avatar">
                {{ review.name.charAt(0).toUpperCase() }}
              </div>

              <div class="review-content">
                <div class="review-top">
                  <div>
                    <h3>{{ review.name }}</h3>
                    <span class="review-date">{{ review.date }}</span>
                  </div>

                  <span class="review-stars">
                    {{ starText(review.rating) }}
                  </span>
                </div>

                <p>{{ review.text }}</p>
              </div>
            </article>
          </div>

          <div v-else class="no-reviews">
            <span>💬</span>
            <h3>Пока нет отзывов</h3>
            <p>Будь первым, кто поделится впечатлениями об этом туре.</p>
          </div>

          <form class="review-form" @submit.prevent="addReview">
            <h3>Поделись впечатлениями</h3>
            <p class="form-description">
              Расскажи другим туристам, что тебе понравилось.
            </p>

            <label for="review-name">Твоё имя</label>
            <input
              id="review-name"
              v-model.trim="reviewName"
              type="text"
              maxlength="60"
              placeholder="Например, Анастасия"
              required
            >

            <label>Твоя оценка</label>
            <div class="rating-picker" aria-label="Выбери оценку">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                class="rating-star"
                :class="{ selected: star <= reviewRating }"
                :aria-label="`Оценка ${star} из 5`"
                :aria-pressed="star === reviewRating"
                @click="reviewRating = star"
              >
                ★
              </button>
              <span>{{ reviewRating }} из 5</span>
            </div>

            <label for="review-text">Твой отзыв</label>
            <textarea
              id="review-text"
              v-model.trim="reviewText"
              rows="4"
              maxlength="1000"
              placeholder="Поделись своими впечатлениями..."
              required
            ></textarea>

            <button type="submit" class="submit-review">
              Опубликовать отзыв →
            </button>

            <p
              v-if="reviewMessage"
              class="review-message"
              role="status"
            >
              {{ reviewMessage }}
            </p>
          </form>
        </section>
      </section>

      <aside class="booking-card">
        <p class="booking-caption">СТОИМОСТЬ ПУТЕШЕСТВИЯ</p>
        <p class="booking-price">
          {{ Number(tour.price).toLocaleString('ru-RU') }}
          <span>₸</span>
        </p>
        <p class="per-person">за одного человека</p>

        <div class="booking-divider"></div>

        <form @submit.prevent="bookTour">
          <label for="tourists">Количество туристов</label>
          <input
            id="tourists"
            v-model.number="tourists"
            type="number"
            min="1"
            :max="Math.max(1, Number(tour.places) || 1)"
            required
          >

          <div class="total-row">
            <span>Итого</span>
            <strong>
              {{ totalPrice.toLocaleString('ru-RU') }} ₸
            </strong>
          </div>

          <button class="book-button" type="submit">
            Забронировать тур
          </button>
        </form>

        <p v-if="message" class="booking-message" role="status">
          {{ message }}
        </p>

        <p class="booking-note">
          Заявка сохраняется в браузере. Подтверждение бронирования
          на сервере пока не подключено.
        </p>
      </aside>
    </div>
  </main>

  <section v-else class="not-found">
    <span>🧭</span>
    <h1>Тур не найден</h1>
    <p>Возможно, он был удалён или ссылка устарела.</p>
    <RouterLink to="/tours" class="submit-review">
      Вернуться в каталог
    </RouterLink>
  </section>
</template>

<style scoped>
.tour-page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 10px 0 60px;
  color: #183153;
}

.back-link {
  display: inline-block;
  margin: 0 0 22px;
  color: #3478df;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.tour-intro {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  align-items: center;
  gap: 32px;
  margin-bottom: 32px;
}

.tour-cover {
  position: relative;
  height: 340px;
  overflow: hidden;
  border-radius: 22px;
  background: #e8f1fc;
}

.tour-cover img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-country {
  position: absolute;
  left: 16px;
  bottom: 16px;
  padding: 9px 13px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.95);
  color: #245ca8;
  font-size: 13px;
  font-weight: 800;
}

.tour-heading h1 {
  margin: 8px 0 14px;
  color: #172b4d;
  font-size: clamp(27px, 3.5vw, 38px);
  line-height: 1.2;
  overflow-wrap: anywhere;
}

.eyebrow {
  margin: 0;
  color: #3478df;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.4px;
  line-height: 1.6;
}

.tour-description {
  color: #71829b;
  font-size: 15px;
  line-height: 1.8;
  white-space: pre-line;
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
}

.summary-stars,
.average-stars {
  color: #f5a623;
}

.summary-stars {
  font-size: 22px;
}

.rating-summary strong {
  font-size: 19px;
}

.rating-count {
  color: #7c8ba2;
  font-size: 13px;
}

.tour-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  align-items: start;
  gap: 26px;
}

.tour-main {
  min-width: 0;
}

.details-panel,
.booking-card,
.reviews-section {
  border: 1px solid #e2ebf6;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 8px 28px rgba(36, 88, 145, 0.05);
}

.details-panel {
  padding: 25px;
  margin-bottom: 26px;
}

.details-panel h2,
.reviews-heading h2 {
  margin: 0;
  color: #172b4d;
  font-size: 24px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 23px;
  margin-top: 24px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.detail-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #eff6ff;
  font-size: 19px;
}

.detail-item div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.detail-label {
  color: #8290a5;
  font-size: 12px;
}

.detail-item strong {
  font-size: 13px;
  overflow-wrap: anywhere;
}

.booking-card {
  position: sticky;
  top: 20px;
  padding: 25px;
}

.booking-caption {
  margin: 0;
  color: #7b8aa1;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
}

.booking-price {
  margin: 10px 0 0;
  color: #236bc2;
  font-size: 32px;
  font-weight: 800;
  overflow-wrap: anywhere;
}

.booking-price span {
  font-size: 20px;
}

.per-person {
  margin: 5px 0 0;
  color: #7b8aa1;
  font-size: 13px;
}

.booking-divider {
  height: 1px;
  margin: 22px 0;
  background: #e8eef6;
}

.booking-card label,
.review-form label {
  display: block;
  margin-bottom: 8px;
  color: #344863;
  font-size: 13px;
  font-weight: 700;
}

.booking-card input,
.review-form input,
.review-form textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #dce5f1;
  border-radius: 11px;
  outline: none;
  background: #fbfdff;
  color: #183153;
  font: inherit;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.booking-card input,
.review-form input {
  min-height: 46px;
  padding: 0 12px;
}

.booking-card input:focus,
.review-form input:focus,
.review-form textarea:focus {
  border-color: #4b83f4;
  box-shadow: 0 0 0 3px rgba(75, 131, 244, 0.1);
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 22px 0;
  color: #61738c;
  font-size: 13px;
}

.total-row strong {
  color: #183153;
  font-size: 17px;
  text-align: right;
  overflow-wrap: anywhere;
}

.book-button,
.submit-review {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 48px;
  box-sizing: border-box;
  padding: 12px 16px;
  border: 0;
  border-radius: 11px;
  background: linear-gradient(110deg, #3478f6, #2456d9);
  box-shadow: 0 7px 17px rgba(52, 120, 246, 0.19);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.book-button:hover,
.submit-review:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(52, 120, 246, 0.25);
}

.booking-message {
  margin: 15px 0 0;
  padding: 12px;
  border-radius: 10px;
  background: #effaf3;
  color: #246b45;
  font-size: 13px;
  line-height: 1.6;
}

.booking-note {
  margin: 18px 0 0;
  color: #8491a5;
  font-size: 11px;
  line-height: 1.7;
}

.reviews-section {
  padding: 25px;
}

.reviews-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 23px;
}

.reviews-heading h2 {
  margin-top: 7px;
}

.average-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
  padding: 12px 15px;
  border-radius: 13px;
  background: #f4f8ff;
}

.average-card strong {
  color: #183153;
  font-size: 25px;
}

.average-stars {
  font-size: 13px;
  letter-spacing: 1px;
}

.average-card > span:last-child {
  color: #7b8aa1;
  font-size: 10px;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.review-card {
  display: flex;
  gap: 13px;
  padding: 17px;
  border: 1px solid #e7eef7;
  border-radius: 15px;
  background: #fcfdff;
}

.review-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 43px;
  height: 43px;
  border-radius: 14px;
  background: #e7f1ff;
  color: #2b6cc1;
  font-size: 17px;
  font-weight: 800;
}

.review-content {
  min-width: 0;
  flex: 1;
}

.review-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.review-top h3 {
  margin: 0 0 4px;
  color: #243954;
  font-size: 14px;
}

.review-date {
  color: #8a97aa;
  font-size: 11px;
}

.review-stars {
  flex-shrink: 0;
  color: #f5a623;
  font-size: 14px;
  letter-spacing: 1px;
}

.review-content > p {
  margin: 12px 0 0;
  color: #64758d;
  font-size: 13px;
  line-height: 1.8;
  overflow-wrap: anywhere;
}

.no-reviews {
  padding: 28px 15px;
  border: 1px dashed #d5e3f4;
  border-radius: 15px;
  text-align: center;
}

.no-reviews > span {
  font-size: 28px;
}

.no-reviews h3 {
  margin: 10px 0 7px;
  font-size: 16px;
}

.no-reviews p {
  margin: 0;
  color: #7b8aa1;
  font-size: 13px;
  line-height: 1.6;
}

.review-form {
  margin-top: 27px;
  padding-top: 24px;
  border-top: 1px solid #e8eef6;
}

.review-form > h3 {
  margin: 0;
  color: #172b4d;
  font-size: 20px;
}

.form-description {
  margin: 8px 0 21px;
  color: #7b8aa1;
  font-size: 13px;
  line-height: 1.6;
}

.review-form label {
  margin-top: 17px;
}

.review-form textarea {
  display: block;
  min-height: 115px;
  padding: 12px;
  resize: vertical;
  line-height: 1.6;
}

.rating-picker {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating-star {
  padding: 0 2px;
  border: 0;
  background: transparent;
  color: #d2dbe8;
  cursor: pointer;
  font-size: 29px;
  line-height: 1.4;
  transition: color 0.15s, transform 0.15s;
}

.rating-star.selected {
  color: #f5a623;
}

.rating-star:hover {
  transform: scale(1.12);
}

.rating-picker > span {
  margin-left: 8px;
  color: #7b8aa1;
  font-size: 12px;
}

.review-form .submit-review {
  margin-top: 20px;
}

.review-message {
  margin: 14px 0 0;
  color: #267347;
  font-size: 13px;
  line-height: 1.6;
}

.not-found {
  max-width: 550px;
  margin: 60px auto;
  padding: 40px 20px;
  border-radius: 20px;
  background: #f4f8ff;
  text-align: center;
}

.not-found > span {
  font-size: 42px;
}

.not-found h1 {
  margin-bottom: 10px;
}

.not-found p {
  margin-bottom: 24px;
  color: #71829b;
}

@media (max-width: 900px) {
  .tour-intro {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .tour-cover {
    height: 320px;
  }

  .tour-layout {
    grid-template-columns: minmax(0, 1fr) 290px;
    gap: 18px;
  }

  .details-panel,
  .reviews-section,
  .booking-card {
    padding: 20px;
  }
}

@media (max-width: 680px) {
  .tour-page {
    padding-bottom: 35px;
  }

  .tour-intro {
    gap: 18px;
    margin-bottom: 22px;
  }

  .tour-cover {
    height: 230px;
    border-radius: 16px;
  }

  .tour-heading h1 {
    font-size: 29px;
  }

  .tour-description {
    font-size: 14px;
  }

  .tour-layout {
    grid-template-columns: 1fr;
  }

  .booking-card {
    position: static;
    grid-row: 1;
  }

  .details-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .details-panel,
  .reviews-section,
  .booking-card {
    padding: 18px;
    border-radius: 16px;
  }

  .reviews-heading {
    align-items: flex-start;
  }

  .reviews-heading h2 {
    font-size: 21px;
  }

  .average-card {
    padding: 10px;
  }

  .review-card {
    padding: 13px;
    gap: 10px;
  }

  .review-top {
    flex-direction: column;
    gap: 7px;
  }

  .review-stars {
    font-size: 13px;
  }
}

@media (max-width: 380px) {
  .reviews-heading {
    flex-direction: column;
  }

  .average-card {
    align-items: flex-start;
  }

  .review-avatar {
    width: 35px;
    height: 35px;
    border-radius: 11px;
  }

  .rating-star {
    font-size: 26px;
  }
}
</style>
