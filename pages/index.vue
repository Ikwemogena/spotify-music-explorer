<template>
  <div class="text-white">
    <div>
      <MuseHome />
    </div>
  </div>
</template>

<script setup>
import { useTokenStore } from '@/store/storeAccessToken';

const accessToken = ref('');
const store = useTokenStore();
const router = useRouter();

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
  
  updateValue(accessToken.value);
  if (!accessToken.value) {
    router.push('/login');
    return;
  }
});

function updateValue(access_token) {
  store.setAccessToken(access_token);
}

</script>

<style scoped></style>
