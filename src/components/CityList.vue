<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CityCard from './CityCard.vue'

const savedCities = ref([])
const weatherApi = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const getCities = async () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'))
    const request = []

    savedCities.value.forEach((city) => {
      request.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&appid=${weatherApi}&units=metric&lang=de`
        )
      )
    })

    const weatherData = await Promise.all(request)

    // Fake Delay to test Skeletton Component
    await new Promise((res) => setTimeout(res, 50))

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value
    })
  }
}

await getCities()

const router = useRouter()
const goToCityView = (city) => {
  router.push({
    name: 'cityView',
    params: { state: city.state, city: city.city },
    query: { id: city.id, lat: city.coords.lat, lon: city.coords.lon },
  })
}
</script>

<template>
  <div v-for="city in savedCities" :city="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0">
    Keine Stadt gefunden. Finden Sie die Stadt in der Suche
  </p>
</template>
