<script setup>
import { uid } from 'uid'
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BaseModal from './BaseModal.vue'

const modalActive = ref(null)
const savedCities = ref([])

const router = useRouter()
const route = useRoute()

const toggleModal = () => (modalActive.value = !modalActive.value)

const addCity = () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'))
  }

  const locationObject = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lon: route.query.lon,
    },
  }

  savedCities.value.push(locationObject)
  localStorage.setItem('savedCities', JSON.stringify(savedCities.value))

  let query = Object.assign({}, route.query)
  delete query.preview
  query.id = locationObject.id

  router.replace({ query })
}
</script>

<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3 flex-1">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">All Weather</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview"
        ></i>
      </div>

      <BaseModal :modal-active="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">All Weather:</h1>
          <p class="mb-4">
            Mit dem All Weather App können Sie das aktuelle und zukünftige Wetter
            für Städte Ihrer Wahl.
          </p>
          <h2 class="text-2xl">Wie funktioniert All Weather App:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Suchen Sie nach Ihrer Stadt, indem Sie den Namen in die Suchleiste eingeben.
            </li>
            <li>
              Wählen Sie eine Stadt aus den Ergebnissen aus, um das aktuelle
              Wetter für die gesuchte Stadt anzuzeigen.
            </li>
            <li>
              Folgen Sie dem Wetter in der gefundenen Stadt, indem Sie auf das "+"-Symbol oben rechts klicken. So
              wird die Stadt gespeichert und kann zu einem späteren Zeitpunkt auf der Startseite angezeigt werden.
            </li>
          </ol>

          <h2 class="text-2xl">Stadt aus der Liste entfernen</h2>
          <p>
            Wenn Sie eine Stadt nicht mehr verfolgen möchten, wählen Sie einfach die Stadt auf der
            Startseite. Unten auf der Seite gibt es eine Option, die Stadt aus der Liste zu löschen.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>
