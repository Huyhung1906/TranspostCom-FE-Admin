<template>
  <div class="flex flex-col h-screen">
    <HeaderBar />

    <div class="flex flex-1">
      <!-- Cột lịch -->
      <div class="w-1/5 p-2 border-r">
        <Calendar />
      </div>

      <!-- Khu vực đặt vé -->
      <div class="w-4/5 p-2 overflow-auto">
          <SeatGrid :seats="seatsData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderBar from '@/components/HeaderBar.vue'
import Calendar from '@/components/Calendar.vue'
import SeatGrid from '@/components/SeatGrid.vue'

const seatsData = [
  { seatName: '1A', routeCode: 'BTE-HCM', customerName: 'Nguyễn Văn A', phone: '0974556253', color: 'yellow' },
  { seatName: '1B', routeCode: 'BTE-HCM', customerName: '', phone: '', color: 'gray' },          // ghế trống
  { seatName: '1C', routeCode: 'BTE-HCM', customerName: 'Lê Văn C', phone: '0912345678', color: 'pink' },
  { seatName: '1D', routeCode: 'BTE-HCM', customerName: '', phone: '', color: 'gray' },          // ghế trống
  { seatName: '2A', routeCode: 'BTE-HCM', customerName: 'Võ Văn E', phone: '0908765432', color: 'yellow' },
  { seatName: '2B', routeCode: 'BTE-HCM', customerName: 'Đặng Thị F', phone: '0945678901', color: 'blue' },
  { seatName: '2C', routeCode: 'BTE-HCM', customerName: '', phone: '', color: 'gray' },          // ghế trống
  { seatName: '2D', routeCode: 'BTE-HCM', customerName: 'Ngô Thị H', phone: '0956789012', color: 'green' },
  { seatName: '3A', routeCode: 'BTE-HCM', customerName: 'Trịnh Văn I', phone: '0919876543', color: 'yellow' },
  { seatName: '3B', routeCode: 'BTE-HCM', customerName: '', phone: '', color: 'gray' },          // ghế trống
  { seatName: '3C', routeCode: 'BTE-HCM', customerName: 'Phan Văn K', phone: '0901234567', color: 'pink' },
  { seatName: '3D', routeCode: 'BTE-HCM', customerName: 'Lý Thị L', phone: '0932109876', color: 'green' },
  { seatName: '4A', routeCode: 'BTE-HCM', customerName: 'Trần Văn M', phone: '0911122233', color: 'yellow' },
  { seatName: '4B', routeCode: 'BTE-HCM', customerName: '', phone: '', color: 'gray' },          // ghế trống
  { seatName: '4C', routeCode: 'BTE-HCM', customerName: 'Lê Văn O', phone: '0922233445', color: 'pink' },
  { seatName: '4D', routeCode: 'BTE-HCM', customerName: 'Nguyễn Thị P', phone: '0955566778', color: 'green' },
  { seatName: '5A', routeCode: 'BTE-HCM', customerName: '', phone: '', color: 'gray' },          // ghế trống
  { seatName: '5B', routeCode: 'BTE-HCM', customerName: 'Đỗ Thị R', phone: '0978899001', color: 'blue' },
  { seatName: '5C', routeCode: 'BTE-HCM', customerName: 'Trần Văn S', phone: '0909988776', color: 'pink' },
  { seatName: '5D', routeCode: 'BTE-HCM', customerName: 'Phan Thị T', phone: '0934455667', color: 'green' },
  { seatName: '6A', routeCode: 'BTE-HCM', customerName: 'Lê Văn U', phone: '0912233445', color: 'yellow' },
  { seatName: '6B', routeCode: 'BTE-HCM', customerName: '', phone: '', color: 'gray' },          // ghế trống
  { seatName: '6C', routeCode: 'BTE-HCM', customerName: 'Trần Văn W', phone: '0923344556', color: 'pink' },
  { seatName: '6D', routeCode: 'BTE-HCM', customerName: 'Phạm Thị X', phone: '0956677889', color: 'green' },
  { seatName: '7A', routeCode: 'BTE-HCM', customerName: 'Võ Văn Y', phone: '0917788990', color: 'yellow' },
  { seatName: '7B', routeCode: 'BTE-HCM', customerName: '', phone: '', color: 'gray' },          // ghế trống
  { seatName: '7C', routeCode: 'BTE-HCM', customerName: 'Hoàng Văn AA', phone: '0909988776', color: 'pink' },
  { seatName: '7D', routeCode: 'BTE-HCM', customerName: 'Ngô Thị BB', phone: '0934455667', color: 'green' },
  { seatName: '8A', routeCode: 'BTE-HCM', customerName: 'Trịnh Văn CC', phone: '0912233445', color: 'yellow' },
  { seatName: '8B', routeCode: 'BTE-HCM', customerName: '', phone: '', color: 'gray' }           // ghế trống
]


</script>
