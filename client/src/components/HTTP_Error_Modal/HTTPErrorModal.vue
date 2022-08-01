<template>
    <section class="flex items-center h-full p-16 bg-white text-slate-900">
        <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div class="max-w-md text-center">
                <img class="mx-auto w-[320px] h-auto" src="../../../src/assets/images/black_kiwi.svg" alt="Workflow">
                <h2 class="mb-8 pt-8 font-extrabold text-5xl">
                    Error 404
                </h2>
                <p class="text-2xl font-semibold md:text-3xl">
                    Sorry, we couldn't find this page.
                </p>
                <p class="mt-4 mb-8 dark:text-slate-600">
                    But dont worry, you can find plenty of other things on our homepage.
                </p>
                <a rel="noopener noreferrer" href="#"
                    class="relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md bg-slate-300 text-slate-900  hover:bg-slate-900 hover:text-white">
                    Back to homepage
                </a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: [],
}
</script>