// Documentazione: https://vuejs.org
// Documentazione: https://router.vuejs.org
// Documentazione: https://tailwindcss.com

// Le applicazione basate su Vue pongono le basi sulla creazione di una "application instance"
// prodotta dalla funzione "createApp".
import { createApp } from "vue";
// La funzione "createApp" necessita della root component dell'applicazione.
// Una component, Single-File Components (avente estensione .vue), è un file che permette di incapsulare
// il codice (HTML, CSS, JS, VUE) necessario alla creazione di un elemento dell'applicazione.
import App from "./App.vue";
// La libreria Vue Router permette di mappare le diverse componenti in modo tale da creare una gerarchia
// all'interno dell'applicazione.
import router from "./router";
// Import nell'applicazione della libreria CSS di Tailwind.
import "../src/assets/tailwind.css";

// Creazione e caricamento dell'applicazione, dando come root component "App".
// "use(router)" permette all'applicazione di essere router-aware.
createApp(App).use(router).mount("#app");
