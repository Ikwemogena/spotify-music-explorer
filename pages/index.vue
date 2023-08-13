<template>
  <div class="text-white">
    <div>
      <MuseHome />
    </div>
  </div>
</template>

<script setup>
const accessToken = ref('');
const router = useRouter();

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
  
  if (!accessToken.value) {
    router.push('/login');
    return;
  }
});


</script>

<style scoped></style>
