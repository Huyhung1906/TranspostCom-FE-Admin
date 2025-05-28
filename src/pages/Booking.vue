<template>
  <div class="flex flex-col h-screen">
    <HeaderBar />

    <div class="flex flex-1">
      <!-- Cột lịch -->
      <div class="w-1/5 p-2 border-r">
        <Calendar @trip-selected="handleTripSelected" />
      </div>

      <!-- Khu vực đặt vé -->
      <div class="w-4/5 p-2 overflow-auto">
          <SeatGrid
  :seats="seatsData"
  :current-trip-id="selectedTrip?.id"
  @reloadTickets="handleTripSelected" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
import Calendar from '@/components/Calendar.vue'
import SeatGrid from '@/components/SeatGrid.vue'
const selectedTrip = ref(null)
const trip = ref(null) // giữ trip đã chọn

const API_BASE_URL = import.meta.env.VITE_API_URL || ''

const seatsData = ref([]) // khai báo reactive biến lưu danh sách vé
// Hàm gọi API khi nhận trip được chọn từ Calendar
async function handleTripSelected(trip) {
  
  selectedTrip.value = trip
  trip.value = selectedTrip // lưu trip

  try {
    const res = await fetch(`${API_BASE_URL}/ticket/getlist/${trip.id}`)
    if (!res.ok) throw new Error('Lỗi gọi API')
    const json = await res.json()
    if (json.status === 200 && json.data) {
      seatsData.value = json.data
    } else {
      seatsData.value = []
      console.error('API lỗi:', json)
    }
  } catch (error) {
    console.error('Lỗi:', error)
    seatsData.value = []
  }
}
</script>
