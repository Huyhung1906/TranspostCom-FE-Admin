<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-xl pointer-events-auto text-sm print:text-base">
      <h2 class="text-xl font-semibold mb-4">Thông tin vé</h2>
      <form @submit.prevent="submitForm">
        <!-- Thông tin chuyến đi & ghế -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block font-medium">Mã chuyến</label>
            <input :value="ticket?.trip?.id || ''" disabled class="w-full border px-3 py-1 rounded bg-gray-100" />
          </div>
          <div>
            <label class="block font-medium">Số ghế</label>
            <input :value="ticket?.seat_number || ''" disabled class="w-full border px-3 py-1 rounded bg-gray-100" />
          </div>
        </div>

        <!-- Thông tin hành khách -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block font-medium">Tên hành khách</label>
            <input v-model="form.passenger_name" class="w-full border px-3 py-1 rounded" />
          </div>
          <div>
            <label class="block font-medium">Số điện thoại</label>
            <input v-model="form.passenger_phone" class="w-full border px-3 py-1 rounded" />
          </div>
          <div class="col-span-2">
            <label class="block font-medium">Email</label>
            <input v-model="form.passenger_email" class="w-full border px-3 py-1 rounded" />
          </div>
        </div>

        <!-- Số ký hành lý -->
        <div class="mb-4">
          <label class="block font-medium">Số ký hành lý (kg)</label>
          <input
            type="number"
            v-model.number="form.luggage_weight"
            min="0"
            max="30"
            step="0.1"
            class="w-full border px-3 py-1 rounded"
          />
          <p class="text-sm text-gray-500">Tối đa 30kg</p>
        </div>

        <!-- Điểm đón -->
        <div class="mb-4">
          <label class="block font-medium">Điểm đón</label>
          <input v-model="form.pickup_point" class="w-full border px-3 py-1 rounded" placeholder="Nhập điểm đón..." />
        </div>

        <!-- Trẻ em dưới 6 tuổi -->
        <div class="mb-4 flex items-center gap-2">
          <input type="checkbox" id="has_child" v-model="form.has_child_under_6" class="form-checkbox" />
          <label for="has_child" class="font-medium select-none">Có trẻ em dưới 6 tuổi</label>
        </div>

        <!-- Phí phụ thu nếu có trẻ em -->
        <div v-if="form.has_child_under_6" class="mb-4 text-red-600 font-semibold">
          Phí phụ thu trẻ em: {{ childFeeDisplay }}
        </div>

        <!-- Trạng thái -->
        <div class="mb-4">
          <label class="block font-medium">Trạng thái</label>
          <select v-model="form.status" class="w-full border px-3 py-1 rounded">
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="cancelled">Cancelled</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
          </select>
        </div>

        <!-- Hóa đơn và người dùng -->
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block font-medium">Mã hóa đơn</label>
            <input :value="ticket?.invoice?.id || ''" disabled class="w-full border px-3 py-1 rounded bg-gray-100" />
          </div>
          <div>
            <label class="block font-medium">Người dùng</label>
            <input
              :value="ticket?.user?.email || ticket?.user?.username || ''"
              disabled
              class="w-full border px-3 py-1 rounded bg-gray-100"
            />
          </div>
        </div>

        <!-- Nút hành động -->
        <div class="flex justify-end gap-2 mt-4 no-print">
          <button type="button" @click="$emit('close')" class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
            Đóng
          </button>
          <button type="submit" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
            Lưu
          </button>
          <button type="button" @click="printTicket" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
            In vé
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'

const props = defineProps({
  ticket: Object,
})

const emit = defineEmits(['submit', 'close', 'updated'])

const CHILD_FEE = 50000

const form = reactive({
  passenger_name: '',
  passenger_phone: '',
  passenger_email: '',
  status: '',
  luggage_weight: 0,
  has_child_under_6: false,
  pickup_point: ''
})

watch(
  () => props.ticket,
  (newVal) => {
    if (newVal) {
      form.passenger_name = newVal.passenger_name || ''
      form.passenger_phone = newVal.passenger_phone || ''
      form.passenger_email = newVal.passenger_email || ''
      form.status = newVal.status || ''
      form.luggage_weight = newVal.luggage_weight || 0
      form.has_child_under_6 = newVal.has_child_under_6 || false
      form.pickup_point = newVal.pickup_point || ''
    }
  },
  { immediate: true }
)

const childFeeDisplay = computed(() => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(CHILD_FEE)
})

const API_BASE_URL = import.meta.env.VITE_API_URL || ''

function submitForm() {
  const updatedData = {
    passenger_name: form.passenger_name,
    passenger_phone: form.passenger_phone,
    passenger_email: form.passenger_email,
    status: form.status,
    luggage_weight: form.luggage_weight,
    has_child_under_6: form.has_child_under_6,
    pickup_point: form.pickup_point
  }

  fetch(`${API_BASE_URL}/ticket/${props.ticket.id}/update/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  })
    .then(res => {
      if (!res.ok) throw new Error('Update failed')
      return res.json()
    })
    .then(data => {
      console.log('Cập nhật thành công:', data)
      emit('updated', data)
      emit('close')
    })
    .catch(err => {
      console.error('Cập nhật thất bại:', err)
      alert('Cập nhật vé thất bại.')
    })
}

function printTicket() {
  window.print()
}
</script>

<style scoped>
@media print {
  .no-print {
    display: none;
  }
  input,
  select {
    border: none !important;
    background: transparent !important;
    padding: 0 !important;
  }
}
</style>
