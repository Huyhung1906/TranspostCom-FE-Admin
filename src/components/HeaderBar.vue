<template>
  <div class="bg-blue-600 text-white p-4 flex justify-between items-center">
    <!-- Bên trái: logo + ô tìm kiếm -->
    <div class="flex items-center space-x-4">
      <div class="font-bold text-lg flex-shrink-0">
        Thịnh Phát - Bến Tre
      </div>
      <input 
        type="text" 
        placeholder="Tìm kiếm..." 
        class="w-58 md:w-64 rounded px-2 py-1 text-black focus:outline-none focus:ring-2 focus:ring-white"
      />
    </div>

    <!-- Bên phải: các nút -->
    <div class="flex space-x-2 items-center">
      <button class="bg-green-500 hover:bg-green-600 px-4 py-1 rounded font-semibold">
        Đặt vé
      </button>
      <template v-if="isLoggedIn">
        <span class="px-4 py-1 rounded bg-gray-700 font-semibold">
          {{ username }}
        </span>
        <button 
          @click="logout" 
          class="bg-red-500 hover:bg-red-600 px-3 py-1 rounded font-semibold"
        >
          Đăng xuất
        </button>
      </template>

      <template v-else>
        <button 
          @click="login" 
          class="bg-gray-800 hover:bg-gray-900 px-4 py-1 rounded font-semibold"
        >
          Login
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLoggedIn: false, // mặc định chưa đăng nhập
      username: '',      // tên người dùng sau khi đăng nhập
    };
  },
  mounted() {
    // Giả sử có lưu thông tin đăng nhập trong localStorage
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      this.isLoggedIn = true;
      this.username = storedUser;
    }
    
  },
  methods: {
    // Đăng xuất đầy đủ
    logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
      delete axios.defaults.headers.common['Authorization'];
      this.username = '';
      this.isLoggedIn = false;
      this.$router.push('/'); // gọi đúng router

    }
  }
  
};
</script>
