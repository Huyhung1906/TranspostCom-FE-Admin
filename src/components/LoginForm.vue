<template>
  <div class="w-full max-w-md md:max-w-xl bg-white shadow-xl rounded-xl p-8">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Đăng nhập</h2>

    <form @submit.prevent="handleLogin">
      <!-- Username -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1" for="username">Tên đăng nhập</label>
        <div class="relative">
          <input
            v-model="username"
            id="username"
            type="text"
            class="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập tên đăng nhập"
            required
            :disabled="loading"
          />
          <span class="absolute left-3 top-2.5 text-gray-400">
            <i class="fas fa-user"></i>
          </span>
        </div>
      </div>

      <!-- Password -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1" for="password">Mật khẩu</label>
        <div class="relative">
          <input
            v-model="password"
            id="password"
            type="password"
            class="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập mật khẩu"
            required
            :disabled="loading"
          />
          <span class="absolute left-3 top-2.5 text-gray-400">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>

      <!-- Login Button -->
      <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        :disabled="loading"
      >
        {{ loading ? "Đang đăng nhập..." : "Đăng nhập" }}
      </button>

      <!-- Error Message -->
      <p v-if="error" class="text-center text-sm text-red-600 mt-4">{{ error }}</p>

      <!-- Forgot password -->
      <p class="text-center text-sm text-gray-600 mt-4">
        Quên mật khẩu? <a href="#" class="text-blue-600 hover:underline">Khôi phục</a>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, LoginPayload } from '../api/modules/authApi' // Đường dẫn đúng tới file api

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const username = ref('')
    const password = ref('')
    const loading = ref(false)
    const error = ref<string | null>(null)
    const router = useRouter()

    const handleLogin = async () => {
      error.value = null
      loading.value = true

      // Gửi username chứ không phải email
      const payload: LoginPayload = {
        username: username.value,
        password: password.value,
      }

      try {
        const response = await login(payload)
        const token = response.data.access_token // Lấy đúng token từ response
        const name = username.value
        // Lưu token vào 
        // localStorage
        localStorage.setItem('access_token', token)
        localStorage.setItem('username', name);

        router.push('/booking')
        alert('Đăng nhập thành công!')

        // TODO: redirect hoặc xử lý tiếp theo sau khi login thành công
      } catch (err: any) {
        error.value = err.response?.data?.message?.non_field_errors?.[0] || 'Lỗi đăng nhập'
      } finally {
        loading.value = false
      }
    }

    return {
      username,
      password,
      loading,
      error,
      handleLogin,
    }
  }
})
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
</style>
