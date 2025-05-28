<template>
  <div class="w-full">
    <!-- Thanh nút chức năng trên cùng -->
    <div class="flex flex-wrap gap-2 mb-4">
      <button @click="exportTicketsToPDF"
        class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M6 9v6h12V9M6 9V6a2 2 0 012-2h8a2 2 0 012 2v3m-6 6v4m-6-4h12" />
        </svg>
        In phiếu
      </button>
      <button class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M4 4v5h.582M20 20v-5h-.581M5.5 10.5A7.5 7.5 0 1118.5 13.5" />
        </svg>
        Làm mới
      </button>
      <button class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Đón trả
      </button>

      <button class="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H3m12 0l-4-4m4 4l-4 4m7 4v-3a4 4 0 00-4-4H7" />
        </svg>
        Trung chuyển
      </button>

      <button class="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 5h6M7 7h6M6 11h6M5 15h6M4 19h6" />
        </svg>
        Cập nhập số xe - tài xế
      </button>

      <button class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
        </svg>
        Xuất bến
      </button>
    </div>
    <!-- Header -->
    <div
      class="grid grid-cols-4 gap-x-6 gap-y-2 font-semibold bg-gray-100 p-4 rounded w-full text-center border border-gray-300 shadow-sm">
      <div class="flex flex-col items-center justify-center border-r border-gray-300">
        <div class="text-gray-700 text-sm">Tài xế</div>
        <div class="text-gray-900 text-lg font-medium mt-1">{{ seats[0]?.trip?.driver?.fullname || 'Chưa có tài xế' }}
        </div>
      </div>
      <div class="flex flex-col items-center justify-center border-r border-gray-300">
        <div class="text-gray-700 text-sm">Biển Kiểm soát</div>
        <div class="text-gray-900 text-lg font-medium mt-1">{{ seats[0]?.trip?.vehicle?.licenseplate || 'Chưa có số xe'
        }}</div>
      </div>
      <div class="flex items-center justify-center text-gray-700">Cửa</div>
      <div class="flex items-center justify-center text-gray-700">Ra vào</div>
    </div>

    <!-- Dữ liệu ghế -->
    <div class="grid grid-cols-4 gap-2 mt-2 w-full">
      <div v-for="seat in seats" :key="seat.seatName" class="p-4 rounded shadow text-base flex flex-col justify-between"
        :class="getColorClass(seat.color)">
        <div class="text-left">
          <div :class="getColorClass(seat.status)" class="text-left p-2 rounded">
            <div class="mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 font-medium rounded">
              🚌 {{ seat.pickup_point || 'Điểm Đón' }}
            </div>
            <div class="font-semibold">Ghế số: {{ seat.seat_number }}</div>
            <div>{{ seat.passenger_name || 'Chưa có tên' }}</div>
            <div>{{ seat.passenger_phone || 'Chưa có số điện thoại' }}</div>
            <div>{{ seat.status }}</div>
          </div>
        </div>

        <!-- Nút nhỏ -->
        <div class="flex justify-end space-x-2 mt-2">
          <button class="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600">C</button>
          <button @click="openForm(seat)"
            class="bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600">D</button>
          <button @click="printTicket(seat)"
            class="bg-gray-500 text-white text-xs px-2 py-1 rounded hover:bg-gray-600">In</button>
        </div>
      </div>
    </div>

    <!-- Form cập nhật -->
    <TicketForm v-if="showForm" :ticket="selectedTicket" @updated="handleTicketUpdated" @close="showForm = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TicketForm from './TicketForm.vue'

const props = defineProps({
  seats: Array,
  currentTripId: [Number, String],
})
const selectedTicket = ref(null)
const showForm = ref(false)

const getColorClass = (status) => {
  switch (status) {
    case 'available': return 'bg-white'
    case 'booked': return 'bg-yellow-300'
    case 'cancelled': return 'bg-gray-300'
    case 'pending': return 'bg-pink-300'
    case 'confirmed': return 'bg-green-300'
    default: return 'bg-gray-100'
  }
}

const openForm = (seat) => {
  selectedTicket.value = seat
  showForm.value = true
}
const emit = defineEmits(['reloadTickets'])

function handleTicketUpdated() {
  emit('reloadTickets', { id: props.currentTripId })
}
const updateTicket = (updatedTicket) => {
  console.log('Cập nhật vé:', updatedTicket)
  showForm.value = false
}

const printTicket = async (ticket) => {
  const res = await fetch('ticket-print-template.html')
  let template = await res.text()

  const CHILD_FEE = 50000

  const replacements = {
    passenger_name: ticket.passenger_name || '',
    passenger_phone: ticket.passenger_phone || '',
    passenger_email: ticket.passenger_email || '',
    trip_id: ticket.trip?.route
      ? `${ticket.trip.route.departure_point} - ${ticket.trip.route.destination_point}`
      : '',
    seat_number: ticket.seat_number || '',
    luggage_weight: ticket.luggage_weight ?? '---',
    has_child_under_6: ticket.has_child_under_6 ? 'Có' : 'Không',
    child_fee: ticket.has_child_under_6 ? CHILD_FEE : 'Không',
    status: ticket.status || '',
    invoice_id: ticket.invoice?.id || '',
    user: ticket.user?.email || ticket.user?.username || '',
    pickup_point: ticket.pickup_point || '',
    id: ticket.id || '',
    day: ticket.trip?.departure_time || '',
    price: ticket.trip?.price || '',
    vehicle: ticket.trip?.vehicle?.licenseplate || ''
  }

  // Thay thế các placeholder {{ key }} bằng giá trị thực tế
  Object.entries(replacements).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g')
    template = template.replace(regex, value)
  })

  // Mở cửa sổ mới để in
  const printWindow = window.open('', '_blank', 'width=1000,height=600')

  printWindow.document.open()
  printWindow.document.write(`
    <html>
      <head>
        <title>In vé</title>
        <style>
          @media print {
            @page {
              size: 12.2cm 19.2cm;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        ${template}
      </body>
    </html>
  `)
  printWindow.document.close()
}

</script>

<style scoped>
@media print {
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #print-area {
    width: 12cm;
    height: 18cm;
    margin: 0 auto;
  }

  @page {
    size: 12cm 18cm;
    margin: 0;
  }
}

</style>