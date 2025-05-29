<template>
  <div class="w-full">
    <!-- Thanh nút chức năng trên cùng -->
    <div class="flex flex-wrap gap-2 mb-4">
      <!-- Nút In phiếu luôn hoạt động -->
      <button @click="exportTicketsToPDF"
        class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M6 9v6h12V9M6 9V6a2 2 0 012-2h8a2 2 0 012 2v3m-6 6v4m-6-4h12" />
        </svg>
        In phiếu
      </button>

      <!-- Các nút thao tác khác bị disabled khi chuyến xe đã xuất bến -->
      <button :disabled="isStarted" :class="{ 'opacity-50 cursor-not-allowed': isStarted }"
        class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M4 4v5h.582M20 20v-5h-.581M5.5 10.5A7.5 7.5 0 1118.5 13.5" />
        </svg>
        Làm mới
      </button>

      <button :disabled="isStarted" :class="{ 'opacity-50 cursor-not-allowed': isStarted }"
        class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Đón trả
      </button>

      <button :disabled="isStarted" :class="{ 'opacity-50 cursor-not-allowed': isStarted }"
        class="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H3m12 0l-4-4m4 4l-4 4m7 4v-3a4 4 0 00-4-4H7" />
        </svg>
        Trung chuyển
      </button>

      <!-- Nút mở form -->
      <button @click="showTripForm = true" :disabled="isStarted" :class="[
        'bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 flex items-center gap-1',
        isStarted ? 'opacity-50 cursor-not-allowed' : ''
      ]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 5h6M7 7h6M6 11h6M5 15h6M4 19h6" />
        </svg>
        Cập nhật số xe - tài xế
      </button>

      <!-- Popup TripEditForm -->
      <div v-if="showTripForm" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
          <!-- Nút đóng -->
          <button @click="showTripForm = false" class="absolute top-2 right-2 text-gray-500 hover:text-black text-xl">
            ×
          </button>

          <!-- Component form -->
          <TripEditForm :trip="trip" @updated="handleTripUpdated" @cancel="showTripForm = false" />
        </div>
      </div>



      <!-- Nút Xuất bến -->
      <button @click="handleStartTrip" :disabled="isStarted || isStarting" :class="[
        'bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed',
        { 'opacity-50 cursor-not-allowed': isStarted }
      ]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
        </svg>
        {{ isStarted ? 'Đã xuất bến' : 'Xuất bến' }}
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
          <button class="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600" :disabled="isStarted"
            :class="{ 'opacity-50 cursor-not-allowed': isStarted }">C</button>

          <button @click="openForm(seat)" class="bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600"
            :disabled="isStarted" :class="{ 'opacity-50 cursor-not-allowed': isStarted }">D</button>

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
import { ref, watch, onMounted } from 'vue'
import TicketForm from './TicketForm.vue'
import { getPrintWindowContent } from '../utils/printWindowContent.ts'
import axios from 'axios'
import TripEditForm from './TripEditForm.vue'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
const API_BASE_URL = import.meta.env.VITE_API_URL || ''
// ⚠️ Gán vfs đúng cách:
pdfMake.vfs = pdfFonts.vfs



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
  const fullHtml = getPrintWindowContent(template)

  if (printWindow) {
    printWindow.document.open()
    printWindow.document.write(fullHtml)
    printWindow.document.close()
  } else {
    alert('Không thể mở cửa sổ in')
  }
}
const exportTicketsToPDF = () => {
  if (!props.seats || props.seats.length === 0) {
    alert('Không có vé để in')
    return
  }

  const seats = props.seats
  const trip = seats[0].trip || {}
  const route = trip.route || {}

  // Header thông tin chuyến đi
  const header = [
    { text: 'Nhà Xe Huy Hưng', style: 'header', alignment: 'center', margin: [0, 0, 0, 10] },
    {
      columns: [
        { text: `Tuyến: ${route.departure_point || ''} - ${route.destination_point || ''}` },
        { text: `Ngày đi: ${new Date(trip.departure_time).toLocaleString()}`, alignment: 'right' }
      ],
      margin: [0, 0, 0, 5]
    },
    {
      columns: [
        { text: `Xe: ${trip.vehicle?.licenseplate || ''}` },
        { text: `Tài xế: ${trip.driver?.fullname || ''}`, alignment: 'right' }
      ],
      margin: [0, 0, 0, 5]
    },
    { text: `Tổng số ghế: ${trip.vehicle?.chair || ''}`, margin: [0, 0, 0, 10] },
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 760, y2: 0, lineWidth: 1 }] }
  ]

  // Bảng dữ liệu vé
  const body = []

  // Tiêu đề cột
  body.push([
    { text: 'Ghế', style: 'tableHeader' },
    { text: 'Hành khách', style: 'tableHeader' },
    { text: 'Điện thoại', style: 'tableHeader' },
    { text: 'Email', style: 'tableHeader' },
    { text: 'Điểm đón', style: 'tableHeader' },
    { text: 'Hành lý (kg)', style: 'tableHeader' },
    { text: 'Trẻ <6 tuổi', style: 'tableHeader' },
    { text: 'Người đặt', style: 'tableHeader' },
    { text: 'Ghi chú', style: 'tableHeader' }
  ])

  // Dữ liệu từng vé
  seats.forEach(seat => {
    body.push([
      seat.seat_number || '',
      seat.passenger_name || '',
      seat.passenger_phone || '',
      { text: seat.passenger_email || '', noWrap: false },
      { text: seat.pickup_point || '', noWrap: false },
      seat.luggage_weight != null ? seat.luggage_weight.toString() : '',
      seat.has_child_under_6 ? 'Có' : 'Không',
      seat.user?.email || seat.user?.username || '',
      ''
    ])
  })

  const docDefinition = {
    pageSize: 'A4',
    pageOrientation: 'landscape', // CHÌA KHÓA để không bị mất dữ liệu ngang
    pageMargins: [20, 40, 20, 40],
    content: [
      ...header,
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: [30, 90, 70, 170, 150, 40, 40, 70, 50],
          body: body
        },
        layout: {
          fillColor: function (rowIndex) {
            return rowIndex === 0
              ? '#eaeaea'
              : (rowIndex % 2 === 0 ? '#f9f9f9' : null)
          }
        }
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true
      },
      tableHeader: {
        bold: true,
        fontSize: 11,
        color: 'black',
        alignment: 'center'
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      }
    },
    defaultStyle: {
      fontSize: 10,
      noWrap: false // Cho phép nội dung xuống dòng khi cần
    }
  }

  pdfMake.createPdf(docDefinition).download(`Chuyến${trip.id || 'unknown'}_Ngay${trip.departure_time || 'uknown'}_Xe${trip.vehicle.licenseplate || 'unknown'}.pdf`)
}
const isStarted = ref(false)

const checkStartedStatus = (trip) => {
  if (!trip || !trip.notes) {
    isStarted.value = false
    return
  }
  const noteLower = trip.notes.toLowerCase()
  isStarted.value = noteLower.includes('đã xuất phát') // hoặc từ khóa bạn dùng trong note
}

// gọi hàm check khi props thay đổi, ví dụ props.seats hoặc props.seats[0].trip
watch(() => props.seats, (newSeats) => {
  if (newSeats && newSeats.length > 0) {
    checkStartedStatus(newSeats[0].trip)
  } else {
    isStarted.value = false
  }
}, { immediate: true })

const handleStartTrip = async () => {
  const tripId = props.seats?.[0]?.trip?.id
  if (!tripId) {
    alert('Không tìm thấy chuyến xe')
    return
  }
  if (isStarted.value) {
    alert('Chuyến xe đã xuất bến')
    return
  }
  isStarted.value = true // disable nút ngay lập tức để tránh bấm lại

  try {
    const response = await axios.post(`${API_BASE_URL}/trip/${tripId}/start/`)
    alert(response.data.message || 'Đã xuất bến thành công')

    // Cập nhật lại trạng thái từ API trả về (nếu có)
    if (response.data.data && response.data.data.notes) {
      const noteLower = response.data.data.notes.toLowerCase()
      isStarted.value = noteLower.includes('xuất bến')
    } else {
      // Nếu API không trả về note, giữ nguyên trạng thái
      isStarted.value = true
    }
  } catch (error) {
    console.error(error)
    alert('Có lỗi khi xuất bến')
    isStarted.value = false
  }
}
const showTripForm = ref(false);
// phải được truyền từ cha hoặc set ở đâu đó
const fetchTrip = async () => {
  const seats = props.seats
  if (!seats || seats.length === 0) {
    console.error("seats is empty or undefined");
    return;
  }
  const trip = seats[0].trip || {}
  if (!trip || !trip.id) {
    console.error("trip or trip.id is undefined");
    return;
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/trip/update/${trip.id}`);
    console.log(trip)
    trip.value = response.data.data;
  } catch (error) {
    console.error("Lỗi khi load lại trip:", error);
  }
};

const handleTripUpdated = async () => {
  await fetchTrip();
  showTripForm.value = false;
};
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