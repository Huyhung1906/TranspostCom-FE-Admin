<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-6 text-gray-800">Cập nhật chuyến đi</h3>

    <form @submit.prevent="submitForm" class="space-y-5">

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-700">Chọn Xe:</label>
        <select v-model="selectedVehicleId"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">
            {{ vehicle.name }} - {{ vehicle.licenseplate }}
          </option>
        </select>
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-700">Chọn Tài Xế:</label>
        <select v-model="selectedDriverId"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option v-for="driver in drivers" :key="driver.id" :value="driver.id">
            {{ driver.fullname }} - {{ driver.phone }}
          </option>
        </select>
      </div>

      <div class="flex justify-end gap-3">
        <button type="button" @click="$emit('cancel')"
                class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-700 font-medium transition">
          Hủy
        </button>
        <button type="submit"
                class="px-5 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
          Lưu
        </button>
      </div>
    </form>
  </div>
</template>
<script>
const API_BASE_URL = import.meta.env.VITE_API_URL || ''

export default {
    props: {
        trip: Object,
    },
    data() {
        return {
            drivers: [],
            vehicles: [],
            selectedDriverId: this.trip?.driver?.id || null,
            selectedVehicleId: this.trip?.vehicle?.id || null,
        };
    },
    methods: {
        async fetchDrivers() {
            const res = await fetch(`${API_BASE_URL}/driver/list`)

            const json = await res.json();
            this.drivers = json.data || [];
        },
        async fetchVehicles() {
            const res = await fetch(`${API_BASE_URL}/vehicle/list`)
            const json = await res.json();
            this.vehicles = json.data || [];
        },
        async submitForm() {
            const payload = {
                driver_id: this.selectedDriverId,
                vehicle_id: this.selectedVehicleId,
            };

            try {
                const res = await fetch(`${API_BASE_URL}/trip/update/${this.trip.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) throw new Error('Cập nhật thất bại');
                const updatedTrip = await res.json();
                this.$emit('updated', updatedTrip);
            } catch (error) {
                alert('Lỗi: ' + error.message);
            }
        },
    },
    mounted() {
        this.fetchDrivers();
        this.fetchVehicles();
    },
};
</script>
