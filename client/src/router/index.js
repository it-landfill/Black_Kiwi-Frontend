import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import HTTP404ErrorView from "../views/HTTP_Error/HTTP404ErrorView.vue";

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
