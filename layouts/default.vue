<template>
    <div>
        <!-- <h1>spotify 2.0</h1> -->
        <!-- <slot /> -->

        <div class="bg-black h-screen overflow-hidden">
            <main class="flex">
                <header class="absolute top-5 right-8">
                    <div class="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="" class="rounded-full w-10 h-10" />
                        <h2 class="">FullName</h2>
                        <p class="h-5 w-5">i</p>
                    </div>
                </header>
                <Sidebar />
                <!-- <MusicCenter /> -->
                <slot />
                
            </main>

            <div class="sticky-bottom-0">
                <MusicPlayer />

            </div>
            <!-- <MusicPlayer /> -->
            
        </div>
        
        <!-- <slot /> -->

        <MusicPlayer />


    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>