<template>
	<div class="relative z-[4]">
		<div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"></div>
		<div class="fixed z-[4] inset-0 overflow-y-auto">
			<div class="flex items-end sm:items-center justify-center min-h-full text-center sm:p-0">
				<div
					class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:max-w-lg sm:w-full">
					<div class="px-4 pt-5 pb-5">
						<div>
							<img class="mx-auto w-[120px] h-auto" src="../../src/assets/images/black_kiwi.svg"
								alt="Workflow" />
							<h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900">
								Accedi al tuo account
							</h2>
						</div>

						<form class="mt-8 space-y-6" @submit.prevent="loginPost">
							<input type="hidden" name="remember" value="true" />
							<div class="rounded-md shadow-sm -space-y-px">
								<div>
									<label for="email-address" class="sr-only">
										Indirizzo Email
									</label>
									<input id="email-address" name="email" type="email" autocomplete="email" required
										class="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm"
										placeholder="Email address" />
								</div>
								<div>
									<label for="password" class="sr-only"> Password </label>
									<input id="password" name="password" type="password" autocomplete="current-password"
										required
										class="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm"
										placeholder="Password" />
								</div>
							</div>

							<div class="flex items-center justify-between">
								<div class="flex items-center">
									<input id="remember-me" name="remember-me" type="checkbox"
										class="h-4 w-4 text-slate-600 border-slate-600 rounded" />
									<label for="remember-me" class="ml-2 block text-sm text-slate-600">
										Ricordami
									</label>
								</div>

								<div class="text-sm">
									<a href="404"
										class="font-medium text-slate-600 hover:text-slate-900 hover:line-through">
										Hai dimenticato la password?
									</a>
								</div>
							</div>

							<div>
								<button type="submit"
									class="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-slate-300 text-slate-900 hover:bg-slate-900 hover:text-white">
									Accedi
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	// Nominativo del component
	name: 'LoginModal',
	props: [],
	emits: [
		"loginPost",
		"login400",
		"login401",
		"login404",
		"loginErrorGeneric"
	],
	setup(_, { emit }) {

		const loginPost = () => {
			console.log("Premuto il bottone per il login.");
			var formdata = new FormData();
			formdata.append("username", document.getElementById("email-address").value);
			formdata.append("password", document.getElementById("password").value);
			var requestOptions = {
				method: "POST",
				body: formdata,
			};

			fetch("http://casadiale.noip.me:62950/login", requestOptions)
				.then((response) => {
					console.log(response);
					switch (response.status) {
						case 200:
							console.log("Login effettuato con successo.");
							emit("loginPost");
							break;
						case 400:
							console.log("Bad request.");
							// emit("login400");
							break;
						case 401:
							console.log("Authorization information is missing or invalid.");
							// emit("login401");
							break;
						case 404:
							console.log("A user with the specified ID was not found.");
							emit("login404");
							break;
						default:
							console.log("Errore sconosciuto.");
							break;
					}
				})
				.catch((error) => console.log("error", error));

		};

		return { loginPost };
	},
}
</script>
