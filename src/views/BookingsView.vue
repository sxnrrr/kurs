<script setup>
import { ref } from 'vue'

const bookings = ref(
  JSON.parse(localStorage.getItem('travelBookings') || '[]')
)

function cancelBooking(id) {
  bookings.value = bookings.value.map(booking =>
    booking.id === id
      ? { ...booking, status: 'Отменено' }
      : booking
  )

  localStorage.setItem('travelBookings', JSON.stringify(bookings.value))
}

function deleteBooking(id) {
  bookings.value = bookings.value.filter(booking => booking.id !== id)

  localStorage.setItem('travelBookings', JSON.stringify(bookings.value))
}
</script>

<template>
  <section class="bookings-page">
    <div class="bookings-heading">
      <div>
        <span class="page-label">ВАШИ ПУТЕШЕСТВИЯ</span>
        <h1 class="section-title">Мои бронирования</h1>
        <p class="bookings-description">
          Управляйте своими заявками и следите за их статусом.
        </p>
      </div>

      <RouterLink to="/tours" class="add-booking-button">
        <span>＋</span> Найти тур
      </RouterLink>
    </div>

    <div v-if="bookings.length" class="bookings-list">
      <article
        v-for="booking in bookings"
        :key="booking.id"
        class="booking-card"
      >
        <div class="booking-top">
          <div class="booking-icon">
            <span>✈</span>
          </div>

          <div class="booking-main">
            <span class="booking-number">ЗАЯВКА №{{ booking.id }}</span>
            <h2>{{ booking.title }}</h2>
          </div>

          <span
            class="booking-status"
            :class="booking.status === 'Отменено' ? 'status-cancelled' : 'status-active'"
          >
            <span class="status-dot"></span>
            {{ booking.status }}
          </span>
        </div>

        <div class="booking-details">
          <div class="detail-item">
            <span class="detail-icon">♙</span>
            <div>
              <span class="detail-label">Туристы</span>
              <strong>{{ booking.tourists }}</strong>
            </div>
          </div>

          <div class="detail-item">
            <span class="detail-icon">₸</span>
            <div>
              <span class="detail-label">Общая стоимость</span>
              <strong>
                {{ Number(booking.totalPrice).toLocaleString('ru-RU') }} ₸
              </strong>
            </div>
          </div>
        </div>

        <div class="booking-footer">
          <p v-if="booking.status === 'Отменено'" class="cancelled-note">
            Эта заявка отменена. Вы можете удалить её из списка.
          </p>

          <p v-else class="active-note">
            Ваша заявка сохранена в системе.
          </p>

          <button
            v-if="booking.status !== 'Отменено'"
            type="button"
            class="cancel-button"
            @click="cancelBooking(booking.id)"
          >
            <span>×</span>
            Отменить заявку
          </button>

          <button
            v-else
            type="button"
            class="delete-button"
            @click="deleteBooking(booking.id)"
          >
            <span>🗑</span>
            Удалить заявку
          </button>
        </div>
      </article>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">✈</div>
      <h2>Пока нет бронирований</h2>
      <p>
        Здесь появятся ваши заявки на путешествия.
        Самое время выбрать новое направление!
      </p>
      <RouterLink to="/tours" class="empty-button">
        Посмотреть туры <span>→</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.bookings-page {
  width: 100%;
  max-width: 1120px;
  min-height: 480px;
  margin: 0 auto;
  padding: 42px 24px 56px;
  color: #20334e;
}

.bookings-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 30px;
}

.page-label {
  display: inline-block;
  margin-bottom: 9px;
  color: #347bd0;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.7px;
}

.section-title {
  margin: 0;
  color: #172b49;
  font-size: clamp(27px, 4vw, 35px);
  font-weight: 800;
  letter-spacing: -0.8px;
}

.bookings-description {
  margin: 10px 0 0;
  color: #7d8ba0;
  font-size: 14px;
  line-height: 1.7;
}

.add-booking-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-shrink: 0;
  padding: 12px 18px;
  border: 1px solid #d8e7f8;
  border-radius: 12px;
  color: #286fc3;
  background: #fff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.add-booking-button span {
  font-size: 18px;
}

.add-booking-button:hover {
  transform: translateY(-2px);
  border-color: #a8c9f1;
  background: #f2f8ff;
}

.bookings-list {
  display: grid;
  gap: 18px;
}

.booking-card {
  padding: 24px;
  border: 1px solid #e5edf6;
  border-radius: 19px;
  background: #fff;
  box-shadow: 0 7px 24px rgba(37, 70, 111, 0.045);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.booking-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(37, 70, 111, 0.09);
}

.booking-top {
  display: flex;
  align-items: center;
  gap: 15px;
}

.booking-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 52px;
  width: 52px;
  height: 52px;
  border-radius: 15px;
  color: #337bd1;
  background: #edf5ff;
}

.booking-icon span {
  font-size: 24px;
  transform: rotate(-12deg);
}

.booking-main {
  flex: 1;
  min-width: 0;
}

.booking-number {
  color: #8b9ab0;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
}

.booking-main h2 {
  margin: 5px 0 0;
  color: #20334e;
  font-size: 19px;
  font-weight: 750;
  overflow-wrap: anywhere;
}

.booking-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
  padding: 8px 11px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
}

.status-active {
  color: #238052;
  background: #eaf8f0;
}

.status-cancelled {
  color: #a34d55;
  background: #fff0f0;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.booking-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 23px;
  padding: 19px 0;
  border-top: 1px solid #edf1f6;
  border-bottom: 1px solid #edf1f6;
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
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  color: #397bc8;
  background: #f1f6fc;
  font-size: 17px;
  font-weight: 700;
}

.detail-item > div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.detail-label {
  color: #8592a5;
  font-size: 11px;
}

.detail-item strong {
  color: #263b57;
  font-size: 14px;
  overflow-wrap: anywhere;
}

.booking-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding-top: 18px;
}

.active-note,
.cancelled-note {
  margin: 0;
  color: #8491a4;
  font-size: 12px;
  line-height: 1.6;
}

.cancelled-note {
  color: #a05b62;
}

.cancel-button,
.delete-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-shrink: 0;
  min-height: 39px;
  padding: 9px 14px;
  border-radius: 10px;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.cancel-button {
  border: 1px solid #f2cccc;
  color: #c04e56;
  background: #fff5f5;
}

.cancel-button:hover {
  transform: translateY(-1px);
  border-color: #e7a4a8;
  color: #fff;
  background: #d9535d;
}

.cancel-button span {
  font-size: 19px;
  line-height: 1;
}

.delete-button {
  border: 1px solid #d8e7f8;
  color: #286fc3;
  background: #edf5ff;
}

.delete-button:hover {
  transform: translateY(-1px);
  border-color: #286fc3;
  color: #fff;
  background: #286fc3;
}

.cancel-button:active,
.delete-button:active {
  transform: translateY(0);
}

.cancel-button:focus-visible,
.delete-button:focus-visible,
.add-booking-button:focus-visible,
.empty-button:focus-visible {
  outline: 3px solid #a6cbf7;
  outline-offset: 3px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 58px 24px;
  border: 1px dashed #d9e6f4;
  border-radius: 22px;
  background: #fbfdff;
  text-align: center;
}

.empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  margin-bottom: 20px;
  border-radius: 23px;
  color: #347bd0;
  background: #edf5ff;
  font-size: 31px;
  transform: rotate(-5deg);
}

.empty-state h2 {
  margin: 0;
  color: #20334e;
  font-size: 23px;
}

.empty-state > p {
  max-width: 370px;
  margin: 12px 0 24px;
  color: #8290a4;
  font-size: 13px;
  line-height: 1.8;
}

.empty-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 13px 20px;
  border-radius: 11px;
  color: #fff;
  background: linear-gradient(110deg, #3988ed, #2467c8);
  box-shadow: 0 7px 17px rgba(43, 116, 213, 0.19);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.empty-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(43, 116, 213, 0.27);
}

.empty-button span {
  font-size: 18px;
}

@media (max-width: 650px) {
  .bookings-page {
    padding: 30px 15px 40px;
  }

  .bookings-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 23px;
  }

  .add-booking-button {
    width: 100%;
  }

  .booking-card {
    padding: 18px;
    border-radius: 16px;
  }

  .booking-top {
    flex-wrap: wrap;
    gap: 12px;
  }

  .booking-icon {
    flex-basis: 44px;
    width: 44px;
    height: 44px;
  }

  .booking-main h2 {
    font-size: 16px;
  }

  .booking-status {
    margin-left: 56px;
  }

  .booking-details {
    grid-template-columns: minmax(0, 1fr);
    gap: 17px;
    margin-top: 18px;
    padding: 17px 0;
  }

  .booking-footer {
    align-items: stretch;
    flex-direction: column;
    gap: 13px;
  }

  .cancel-button,
  .delete-button {
    align-self: flex-start;
  }

  .empty-state {
    padding: 42px 18px;
  }

  .empty-state h2 {
    font-size: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .booking-card,
  .cancel-button,
  .delete-button,
  .add-booking-button,
  .empty-button {
    transition: none;
  }
}
</style>
