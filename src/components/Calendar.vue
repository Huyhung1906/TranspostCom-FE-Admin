<template>
  <div>
    <!-- Combo box chọn tuyến đường -->
    <div class="mb-4 text-center">
      <select
        v-model="selectedRoute"
        class="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="" disabled>Chọn tuyến đường</option>
        <option value="tuyen1">Tuyến 1: Bến Tre - TP.HCM</option>
        <option value="tuyen2">Tuyến 2: Bến Tre - Cần Thơ</option>
        <option value="tuyen3">Tuyến 3: Bến Tre - Vĩnh Long</option>
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
          @change="updateCalendar"
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedRoute = ref('')
const selectedMonth = ref(new Date().getMonth() + 1)
const year = 2025
const selectedDay = ref(null)
const daysInMonth = ref(31)
const startDay = ref(0)
const selectedTrip = ref(null)

const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

function updateCalendar() {
  daysInMonth.value = new Date(year, selectedMonth.value, 0).getDate()
  startDay.value = new Date(year, selectedMonth.value - 1, 1).getDay()

  if (selectedDay.value > daysInMonth.value) {
    selectedDay.value = null
  }
}

function selectDay(day) {
  selectedDay.value = day
  selectedTrip.value = null // reset chọn chuyến khi đổi ngày (tuỳ bạn)
}

// Dữ liệu giả định chuyến xe
const trips = ref([
  { id: 1, time: '06:00', soldSeats: 2, totalSeats: 33, status: 'few-seats' },
  { id: 2, time: '07:00', soldSeats: 10, totalSeats: 33, status: 'normal' },
  { id: 3, time: '08:00', soldSeats: 25, totalSeats: 33, status: 'normal' },
  { id: 4, time: '09:00', soldSeats: 31, totalSeats: 33, status: 'normal' },
  { id: 5, time: '10:00', soldSeats: 29, totalSeats: 33, status: 'normal' },
  { id: 6, time: '11:00', soldSeats: 5, totalSeats: 33, status: 'few-seats' },
  { id: 7, time: '12:00', soldSeats: 33, totalSeats: 33, status: 'completed' },
  { id: 8, time: '13:00', soldSeats: 20, totalSeats: 33, status: 'normal' },
  { id: 9, time: '14:00', soldSeats: 31, totalSeats: 33, status: 'normal' },
  { id: 10, time: '15:00', soldSeats: 32, totalSeats: 33, status: 'normal' },
  { id: 11, time: '16:00', soldSeats: 4, totalSeats: 33, status: 'few-seats' },
  { id: 12, time: '17:00', soldSeats: 33, totalSeats: 33, status: 'completed' },
  { id: 13, time: '18:00', soldSeats: 15, totalSeats: 33, status: 'normal' },
  { id: 14, time: '19:00', soldSeats: 7, totalSeats: 33, status: 'few-seats' },
  { id: 15, time: '20:00', soldSeats: 28, totalSeats: 33, status: 'normal' },
])

function selectTrip(trip) {
  if (trip.status === 'completed') return // không chọn được chuyến đã đi
  selectedTrip.value = trip
}

// Khởi tạo
updateCalendar()
</script>
