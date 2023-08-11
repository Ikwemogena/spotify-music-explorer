<template>
    <div class="bg-[#1c3e6022] text-white">
        <div v-if="props.shareModal" class="overlay" @click="closeModal()"></div>
        <div v-if="props.shareModal" class="fixed inset-0 flex flex-col items-center justify-center z-50">
            <div class="bg-[#000]  w-[25rem] h-[20rem] rounded-lg shadow-lg p-4">

                <div class="modal-content">
                    <div class="flex justify-between items-center">
                        <h1>Share Song</h1>
                        <span class="" @click="closeModal()"><Icon name="mdi:close-box-outline" class="social-icon cursor-pointer" /></span>
                    </div>
                    <div class="social-icons text-3xl flex gap-4 mt-2">
                        <a :href="twitterShareLink" target="_blank">
                        <Icon name="mdi:twitter" class="social-icon" />
                        </a>
                        <a :href="whatsappShareLink" target="_blank">
                        <Icon name="mdi:whatsapp" class="social-icon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>

const props = defineProps({
    shareModal: Boolean,
    externalUrl: Boolean, 
});

const playlistTitle = ref('');
const playlistDescription = ref('');
const accessToken = ref('');

onMounted(async () => {
    accessToken.value = localStorage.getItem('accessToken') || '';
    console.log(props.externalUrl)
});

const emits = defineEmits(['close']);

function closeModal() {
    emits('close');
    playlistTitle.value = '';
    playlistDescription.value = '';
}
const text = ref(`Listen to this amazing song: ${props.externalUrl.artists[0].name} by ${props.externalUrl.name}!`);

const twitterShareLink = computed(() => {    
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text.value)}&url=${encodeURIComponent(props.externalUrl.external_urls.spotify)}`;
});

const whatsappShareLink = computed(() => {
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text.value)} ${encodeURIComponent(props.externalUrl.external_urls.spotify)}`;
});

const instagramShareLink = computed(() => {
    return `https://www.instagram.com/intent/album/${encodeURIComponent(text.value)}&media=${encodeURIComponent(songImageUrl)}`;
});
const facebookShareLink = computed(() => {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(props.externalUrl.external_urls.spotify)}&quote=${encodeURIComponent(text.value)}`;
});

const pinterestShareLink = computed(() => {
    return `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(props.externalUrl.external_urls.spotify)}&description=${encodeURIComponent(text.value)}&media=${encodeURIComponent(songImageUrl)}`;
});


const emailShareLink = computed(() => {
    const body = `Hi, I wanted to share this awesome song with you: "${songName}" by ${artistName}. Listen to it here: ${props.externalUrl.external_urls.spotify}`;
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

</script>
  
<style scoped>
.overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
    backdrop-filter: blur(2px);
}

.form-container {
    width: 25rem;
    height: 20rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    padding: 1rem;
}

.close {
    font-size: 2rem;
    cursor: pointer;
}

.create-button {
    background-color: #183440;
}
</style>
  