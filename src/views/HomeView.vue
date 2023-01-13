<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'
import CityCardSkeleton from '../components/CityCardSkeleton.vue'
import CityList from '../components/CityList.vue'

const router = useRouter()

const searchQuery = ref('')
const queryTimeout = ref(null)
const mapboxSearchResults = ref(null)
const searchError = ref(null)

const endpoint = import.meta.env.VITE_MAPBOX_API_ENDPOINT
const mapboxAPI = import.meta.env.VITE_MAPBOX_API_KEY

const getSearchResult = () => {
  clearTimeout(queryTimeout.value)

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await api.get(
          `/${endpoint}/${searchQuery.value}.json?access_token=${mapboxAPI}&types=place`
        )
        mapboxSearchResults.value = result.data.features
      } catch (error) {
        searchError.value = true
      }
      return
    }

    mapboxSearchResults.value = null
  }, 300)
}

const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(',')

  router.push({
    name: 'cityView',
    params: { state: state.replaceAll(' ', ''), city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lon: searchResult.geometry.coordinates[0],
      preview: true,
    },
  })
}
</script>

<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        placeholder="Stadt eingeben"
        v-model="searchQuery"
        @input="getSearchResult"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004e71]"
      />
      <ul
        v-if="mapboxSearchResults"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>

        <p v-if="!searchError && mapboxSearchResults.length === 0">
          No results match your query, try a different term.
        </p>

        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            @click="previewCity(searchResult)"
            class="py-2 cursor-pointer"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />

        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>
