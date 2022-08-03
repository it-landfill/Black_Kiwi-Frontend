// Import delle funzioni per la creazione di una Vue Router.
// createRouter: permette di creare un'istanza Router utilizzabile dall'applicazione Vue.
// createWebHistory: Crea una cronologia HTML5. L'applicazione deve essere servita tramite il protocollo http.
import { createRouter, createWebHistory } from "vue-router";
// Import delle Single-File Components da utilizzare come riferimento per la Vue Router.
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import HTTP404ErrorView from "../views/HTTP_Error/HTTP404ErrorView.vue";

// Creazione di una routes per l'applicazione.
// In ogni singola componente sono identificati i seguenti parametri:
//		1. path 
//		2. name
//		3. component
const routes = [
	{
		path: "/",
		name: "login",
		component: LoginView,
	},
	{
		path: "/home",
		name: "home",
		component: HomeView,
	},
	{
		path: "/404",
		name: "notFound",
		component: HTTP404ErrorView,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
