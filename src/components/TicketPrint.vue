<template>
  <div class="p-6 border max-w-sm mx-auto text-sm print:text-base">
    <h1 class="text-xl font-bold text-center mb-4">VÉ XE KHÁCH</h1>
    
    <div class="mb-2"><strong>Hành khách:</strong> {{ ticket.passenger_name }}</div>
    <div class="mb-2"><strong>Điện thoại:</strong> {{ ticket.passenger_phone }}</div>
    <div class="mb-2"><strong>Email:</strong> {{ ticket.passenger_email }}</div>
    
    <div class="mb-2"><strong>Chuyến đi:</strong> {{ ticket.trip?.id }}</div>
    <div class="mb-2"><strong>Số ghế:</strong> {{ ticket.seat_number }}</div>

    <!-- Thêm 2 trường mới -->
    <div class="mb-2">
      <strong>Số ký hành lý:</strong> {{ ticket.luggage_weight ?? '---' }} kg
      <small class="text-gray-500">(Tối đa 30kg)</small>
    </div>
    <div class="mb-2">
      <strong>Có trẻ em dưới 6 tuổi:</strong> {{ ticket.has_child_under_6 ? 'Có' : 'Không' }}
    </div>
    <div class="mb-2">
      <strong>Phí phụ thu trẻ em:</strong>
      {{ childFeeDisplay }}
    </div>

    <div class="mb-2"><strong>Trạng thái:</strong> {{ ticket.status }}</div>

    <div class="mb-2"><strong>Hóa đơn:</strong> {{ ticket.invoice?.id }}</div>
    <div class="mb-2"><strong>Tài khoản:</strong> {{ ticket.user?.email || ticket.user?.username }}</div>

    <div class="text-center mt-6">
      <small>Xin vui lòng đến sớm 15 phút trước giờ xe chạy.</small>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  ticket: Object
})

// Phí phụ thu trẻ em cố định, bạn có thể thay đổi giá trị này
const CHILD_FEE = 50000

const childFeeDisplay = computed(() => {
  if (props.ticket?.has_child_under_6) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(CHILD_FEE)
  }
  return 'Không'
})
</script>

<style scoped>
@media print {
  body {
    margin: 0;
  }
}
</style>
