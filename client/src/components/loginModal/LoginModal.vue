<template>
	<div class="relative z-[4]">
		<div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"></div>
		<div class="fixed z-[4] inset-0 overflow-y-auto">
			<div class="flex items-end sm:items-center justify-center min-h-full text-center sm:p-0">
				<div
					class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:max-w-lg sm:w-full">
					<div class="px-4 pt-5 pb-5">
						<div>
							<img class="mx-auto w-[120px] h-auto" src="../../../src/assets/images/black_kiwi.svg" />
							<h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900"> Accedi al tuo account </h2>
						</div>

						<form class="mt-8 space-y-6" @submit.prevent="loginPost">
							<div class="rounded-md shadow-sm -space-y-px">
								<div>
									<label for="username" class="sr-only"> Username </label>
									<input id="username" name="username" autocomplete="username" required
										class="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm"
										placeholder="Username" />
								</div>
								<div>
									<label for="password" class="sr-only"> Password </label>
									<input id="password" name="password" type="password" autocomplete="current-password"
										required
										class="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm"
										placeholder="Password" />
								</div>
							</div>
							<button type="submit"
								class="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white">
								Accedi
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// Import funzioni di impostazione per POST e GET al server
import {
	baseUri,
	setToken,
} from "@/components/js/dataConnection.js";

export default {
	name: 'LoginModal',
	components: {},
	emits: [
		"loginSuccess",
		"login400",
		"login401",
		"login404",
		"loginErrorGeneric"
	],
	setup(_, { emit }) {

		// Funzione di login dell'utente al server
		const loginPost = () => {
			// Acquisizione dei dati inseriti dall'utente
			var formdata = new FormData();
			formdata.append("username", document.getElementById("username").value);
			formdata.append("password", document.getElementById("password").value);
			// Impostazione del metodo POST e invio dei dati al server
			var requestOptions = {
				method: "POST",
				body: formdata,
			};
			fetch(baseUri + "login", requestOptions)
				.then(response => {
					switch (response.status) {
						case 200:
							// Se l'utente è stato autenticato correttamente, viene impostato 
							// il token di sessione (necessario per le richieste successive)
							setToken(response.json().token);
							emit("loginSuccess");
							break;
						case 400:
							emit("login400");
							break;
						case 401:
							emit("login401");
							break;
						case 404:
							emit("login404");
							break;
						default:
							emit("loginErrorGeneric");
							break;
					}
				})
				.catch(() => emit("loginErrorGeneric"));
		};

		return { 
			loginPost 
		};
	},
}
</script>
