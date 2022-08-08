<template>
    <section class="flex items-center h-full p-16 bg-white text-slate-900">
        <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div class="max-w-md text-center">
                <img class="mx-auto w-[320px] h-auto" src="../../../../src/assets/images/black_kiwi_error.svg"
                    alt="Workflow">
                <h2 class="mb-8 pt-8 font-extrabold text-5xl">
                    Error 404
                </h2>
                <p class="text-2xl font-semibold md:text-3xl">
                    Ci scusiamo, ma si è verificato un errore nel caricare la pagina.
                </p>
                <p class="mt-4 mb-8 dark:text-slate-600">
                    NOn ti preoccupare e visita le altre pagina a disposizione.
                </p>
                <a rel="noopener noreferrer" @click="goBack"
                    class="relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md bg-slate-300 text-slate-900  hover:bg-slate-900 hover:text-white">
                    Indietro
                </a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    // Nominativo del component
    name: '404HTTPError',
    props: [],
    setup() {

        const goBack = () => {
            console.log("Back.");
            // TODO: https://vueschool.io/lessons/vuejs-router-creating-routes
        };

        return { goBack };
    },
}
</script>