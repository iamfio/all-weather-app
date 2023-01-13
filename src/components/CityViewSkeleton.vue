<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>

<template>
  <div class="flex flex-col flex-1">
    <!-- Overview Area -->
    <div class="flex flex-col py-12 items-center">
      <AnimatedPlaceholder class="max-w-[300px] w-full mb-2" />
      <AnimatedPlaceholder class="max-w-[300px] w-full mb-12" />
      <AnimatedPlaceholder class="max-w-[300px] h-[100px] w-full mb-8" />
      <AnimatedPlaceholder class="max-w-[300px] w-full mb-8" />
      <AnimatedPlaceholder class="max-w-[300px] h-[75px] w-full" />
    </div>

    <!-- Hourly Area -->
    <div class="flex flex-col py-12 items-center">
      <AnimatedPlaceholder class="max-w-screen-md h-[100px] w-full mb-12" />
    </div>
  </div>

  <!-- Weekly Area -->
  <div class="flex flex-col py-12 items-center">
    <AnimatedPlaceholder class="max-w-screen-md h-[100px] w-full mb-12" />
  </div>
</template>
