<template>
  <div>
    <!-- Combo box chọn tuyến đường -->
    <div class="mb-4 text-center">
      <select
        v-model="selectedRoute"
        class="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        @change="onRouteOrDateChange"
      >
        <option value="" disabled>Chọn tuyến đường</option>
        <option
          v-for="route in routes"
          :key="route.id"
          :value="route.id"
        >
          {{ route.departure_point }} - {{ route.destination_point }}
        </option>
      </select>
    </div>

    <!-- Khung chung chọn tháng + lịch -->
    <div
      class="border border-gray-300 rounded-lg p-4 max-w-md mx-auto shadow-sm bg-white"
    >
      <!-- Combo box chọn tháng nằm ngang với lịch -->
      <div class="mb-3 flex justify-center">
        <select
          v-model="selectedMonth"
          class="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          @change="onMonthChange"
        >
          <option v-for="month in 12" :key="month" :value="month">
            Tháng {{ month }}
          </option>
        </select>
      </div>

      <!-- Hàng thứ -->
      <div
        class="grid grid-cols-7 gap-1 text-center font-semibold text-sm mb-1 select-none bg-gray-100 rounded-t"
        style="border: 1px solid #d1d5db;"
      >
        <div v-for="(dayName, index) in weekDays" :key="index" class="py-2">
          {{ dayName }}
        </div>
      </div>

      <!-- Lịch ngày với offset -->
      <div
        class="grid grid-cols-7 gap-1 text-center text-sm rounded-b border border-t-0 border-gray-300"
      >
        <div v-for="n in startDay" :key="'empty-'+n" class="py-3"></div>
        <div
          v-for="day in daysInMonth"
          :key="day"
          @click="selectDay(day)"
          :class="[
            'border rounded cursor-pointer select-none py-2',
            'hover:bg-blue-100',
            selectedDay === day ? 'bg-blue-500 text-white font-semibold' : 'bg-white'
          ]"
          style="border-color: #cbd5e1;"
        >
          {{ day }}
        </div>
      </div>
    </div>

    <!-- Button giờ chuyến xe phía dưới lịch -->
    <div class="mt-4 flex flex-wrap gap-3 justify-center">
      <button
        v-for="trip in trips"
        :key="trip.id"
        @click="selectTrip(trip)"
        :disabled="trip.status === 'completed'"
        :class="[
          'px-4 py-2 rounded font-semibold flex flex-col items-center transition-colors duration-200',
          trip.status === 'completed' ? 'bg-gray-400 cursor-not-allowed text-white' : '',
          selectedTrip && selectedTrip.id === trip.id ? 'bg-green-600 text-white' : '',
          trip.status === 'few-seats' && (!selectedTrip || selectedTrip.id !== trip.id)
            ? 'bg-red-500 text-white hover:bg-red-600'
            : '',
          trip.status === 'normal' && (!selectedTrip || selectedTrip.id !== trip.id)
            ? 'bg-white text-black border border-gray-300 hover:bg-gray-100'
            : '',
        ]"
      >
        <span class="text-base font-bold leading-none">{{ trip.time }}</span>
        <span class="text-xs leading-none mt-1">{{ trip.soldSeats }}/{{ trip.totalSeats }}</span>
      </button>
    </div>
    <!-- SeatGrid: truyền selectedTrip -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
const emit = defineEmits(['tripSelected'])


const year = 2025
const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

// Reactive state
const routes = ref([])
const selectedRoute = ref('')
const selectedMonth = ref(new Date().getMonth() + 1)
const selectedDay = ref(null)
const daysInMonth = ref(31)
const startDay = ref(0)
const trips = ref([])
const selectedTrip = ref(null)
const API_BASE_URL = import.meta.env.VITE_API_URL || ''

// 1. Fetch danh sách tuyến đường từ API
async function fetchRoutes() {
  try {
        const res = await fetch(`${API_BASE_URL}/route/list`)
    if (!res.ok) throw new Error('Không thể lấy danh sách tuyến đường')
    const json = await res.json()
    if (json.status === 200 && json.data) {
      routes.value = json.data
    } else {
      console.error('Lỗi API tuyến đường:', json)
    }
  } catch (error) {
    console.error('Lỗi fetchRoutes:', error)
  }
}

// 2. Cập nhật lịch (số ngày, ngày bắt đầu tháng)
function updateCalendar() {
  daysInMonth.value = new Date(year, selectedMonth.value, 0).getDate()
  startDay.value = new Date(year, selectedMonth.value - 1, 1).getDay()
  // Reset ngày chọn nếu vượt tháng mới
  if (selectedDay.value > daysInMonth.value) {
    selectedDay.value = null
  }
}

// 3. Gọi API lấy chuyến xe theo tuyến và ngày
async function fetchTrips() {
  if (!selectedRoute.value || !selectedDay.value) {
    trips.value = []
    selectedTrip.value = null
    return
  }

  // Format date dạng YYYY-MM-DD
  const dateStr = `${year}-${String(selectedMonth.value).padStart(2, '0')}-${String(selectedDay.value).padStart(2, '0')}`

  try {
    const url = `${API_BASE_URL}/trip/?route_id=${selectedRoute.value}&date=${dateStr}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Không thể lấy danh sách chuyến xe')
    const json = await res.json()
    if (json.status === 200 && json.data) {
      // Map dữ liệu API về cấu trúc của trips button (giả định)
      trips.value = json.data.map(trip => ({
        id: trip.id,
        time: trip.departure_time.slice(11,16),          // hoặc trip.departure_time tùy API
        soldSeats: trip.sold_tickets,
        totalSeats: trip.total_tickets ,
        status: trip.status || 'normal',
      }))
      selectedTrip.value = null
    } else {
      trips.value = []
      selectedTrip.value = null
      console.error('Lỗi API chuyến xe:', json)
    }
  } catch (error) {
    trips.value = []
    selectedTrip.value = null
    console.error('Lỗi fetchTrips:', error)
  }
}

// 4. Xử lý khi thay đổi tháng (cập nhật lịch và reset ngày, chuyến)
function onMonthChange() {
  updateCalendar()
  selectedDay.value = null
  trips.value = []
  selectedTrip.value = null
}

// 5. Xử lý khi chọn ngày
function selectDay(day) {
  selectedDay.value = day
  selectedTrip.value = null
  fetchTrips()
}

// 6. Xử lý khi chọn tuyến hoặc ngày đổi (reload chuyến)
function onRouteOrDateChange() {
  selectedTrip.value = null
  fetchTrips()
}

// 7. Chọn chuyến
function selectTrip(trip) {
  if (trip.status === 'completed') return
  selectedTrip.value = trip
  emit('tripSelected', trip) // Gửi chuyến xe ra ngoài

}

// Khởi tạo
onMounted(() => {
  fetchRoutes()
  updateCalendar()
})

// Nếu muốn tự động fetch khi selectedRoute hoặc selectedDay thay đổi (ví dụ thay đổi bằng code), có thể dùng watch
watch([selectedRoute, selectedDay], ([newRoute, newDay]) => {
  if (newRoute && newDay) {
    fetchTrips()
  }
})
</script>
