
<script setup>
import { ref } from 'vue'
import { tours } from '../data/tours'

const bookings = ref(
  JSON.parse(localStorage.getItem('travelBookings') || '[]')
)

function updateStatus(id, status) {
  bookings.value = bookings.value.map(booking =>
    booking.id === id ? { ...booking, status } : booking
  )

  localStorage.setItem('travelBookings', JSON.stringify(bookings.value))
}
</script>

<template>
  <section class="page">
    <h1 class="section-title">Панель администратора</h1>
    <p class="muted">Демонстрационный интерфейс управления туристическим агентством.</p>

    <h2>Список туров</h2>
    <div class="info-panel">
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Страна</th>
            <th>Цена</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tour in tours" :key="tour.id">
            <td>{{ tour.title }}</td>
            <td>{{ tour.country }}</td>
            <td>{{ tour.price.toLocaleString('ru-RU') }} ₸</td>
            <td>{{ tour.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="booking-heading">Заявки клиентов</h2>

    <div v-if="bookings.length">
      <article v-for="booking in bookings" :key="booking.id" class="info-panel">
        <h3>{{ booking.title }}</h3>
        <p>Заявка № {{ booking.id }}</p>
        <p>Туристов: {{ booking.tourists }}</p>
        <p>Стоимость: {{ booking.totalPrice.toLocaleString('ru-RU') }} ₸</p>
        <p>Текущий статус: <strong>{{ booking.status }}</strong></p>

        <div class="actions">
          <button class="primary-button" @click="updateStatus(booking.id, 'Подтверждено')">
            Подтвердить
          </button>
          <button class="secondary-button" @click="updateStatus(booking.id, 'Отменено')">
            Отменить
          </button>
        </div>
      </article>
    </div>

    <p v-else class="info-panel">Заявок пока нет. Создай тестовое бронирование в каталоге туров.</p>

    <p class="notice">
      Для реального проекта доступ администратора должен проверяться на сервере Laravel.
    </p>
  </section>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 12px;
  border-bottom: 1px solid #eaecf0;
}

.booking-heading {
  margin-top: 40px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.secondary-button {
  padding: 12px 18px;
  border: 1px solid #d0d5dd;
  background: white;
  border-radius: 10px;
  cursor: pointer;
}
</style>
