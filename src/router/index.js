
import HomeView from '../views/HomeView.vue'
import ToursView from '../views/ToursView.vue'
import TourView from '../views/TourView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import BookingsView from '../views/BookingsView.vue'
import AdminView from '../views/AdminView.vue'

export const routes = [
  { path: '/', component: HomeView },
  { path: '/tours', component: ToursView },
  { path: '/tours/:id', component: TourView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/bookings', component: BookingsView },
  { path: '/admin', component: AdminView }
]
