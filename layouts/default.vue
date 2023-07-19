<template>
    <div>

        <main class="flex">
            <MuseSideBar />

            <div class="flex-grow h-screen overflow-y-scroll no-scrollbar">

                <header class="bg-black text-white p-4">
                    <div class="flex justify-between">
                        <div class="flex gap-2">
                            <button>Back</button>
                            <button>Forward</button>
                        </div>


                        <div>
                            profile
                        </div>
                    </div>
                </header>

                <div class="bg-[#1F1F22] no-scrollbar">

                    <!-- <MuseCreatePlaylistModal /> -->
                    <slot />

                </div>
                
            </div>

        </main>

        <div class="sticky bottom-0">
                <MusicPlayer />

                <!-- <TestPlayer /> -->
            </div>
       

    </div>
</template>

<script setup>

</script>

<style scoped>

body {
    background-color: rgba(33, 33, 36, 1);
}



</style>