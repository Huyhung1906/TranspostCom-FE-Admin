<template>
  <div class="w-full">
    <!-- Thanh nút chức năng trên cùng -->
    <div class="flex flex-wrap gap-2 mb-4">
      <button class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-1">
        <!-- Icon In phiếu: Printer -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M6 9v6h12V9M6 9V6a2 2 0 012-2h8a2 2 0 012 2v3m-6 6v4m-6-4h12" />
        </svg>
        In phiếu
      </button>

      <button class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1">
        <!-- Icon Làm mới: Refresh -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M4 4v5h.582M20 20v-5h-.581M5.5 10.5A7.5 7.5 0 1118.5 13.5" />
        </svg>
        Làm mới
      </button>

      <button class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex items-center gap-1">
        <!-- Icon Đón trả: User group -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Đón trả
      </button>

      <button class="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 flex items-center gap-1">
        <!-- Icon Trung chuyển: Arrow path -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H3m12 0l-4-4m4 4l-4 4m7 4v-3a4 4 0 00-4-4H7" />
        </svg>
        Trung chuyển
      </button>

      <button class="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 flex items-center gap-1">
        <!-- Icon Cập nhập số xe - tài xế: Pencil -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 5h6M7 7h6M6 11h6M5 15h6M4 19h6" />
        </svg>
        Cập nhập số xe - tài xế
      </button>

      <button class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1">
        <!-- Icon Xuất bến: Logout/Exit -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
        </svg>
        Xuất bến
      </button>
    </div>


    <!-- Header -->
    <div class="grid grid-cols-4 gap-2 font-bold bg-gray-200 p-4 rounded w-full text-center">
      <div>Tài Xế</div>
      <div>Tuyến Đường</div>
      <div>Cửa</div>
      <div>Ra vào</div>
    </div>

    <!-- Dữ liệu ghế -->
    <div class="grid grid-cols-4 gap-2 mt-2 w-full">
      <div v-for="seat in seats" :key="seat.seatName" class="p-4 rounded shadow text-base flex flex-col justify-between"
        :class="getColorClass(seat.color)">

        <!-- Thông tin căn trái -->
        <div class="text-left">
          <div :class="getColorClass(seat.status)" class="text-left p-2 rounded">
            <div class="font-semibold">Ghế số: {{ seat.seat_number }}</div>
            <div>{{ seat.passenger_name || 'Chưa có tên' }}</div>
            <div>{{ seat.passenger_phone || 'Chưa có số điện thoại' }}</div>
            <div>{{ seat.status }}</div>
          </div>
        </div>

          <!-- Nút nhỏ căn phải -->
          <div class="flex justify-end space-x-2 mt-2">
            <button class="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600">C</button>
            <button class="bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600">D</button>
            <button class="bg-gray-500 text-white text-xs px-2 py-1 rounded hover:bg-gray-600">In</button>
          </div>

        </div>
      </div>
    </div>
</template>

<script setup>
defineProps(['seats'])

const getColorClass = (status) => {
  switch (status) {
    case 'available': return 'bg-blue-400 text-white'
    case 'booked': return 'bg-yellow-300'
    case 'cancelled': return 'bg-gray-300'
    case 'pending': return 'bg-pink-300'
    case 'confirmed': return 'bg-green-300'
    default: return 'bg-gray-100'
  }
}

</script>
