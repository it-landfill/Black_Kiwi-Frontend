<template>
    <div class="h-screen relative">
        <HTTPErrorModal />
    </div>
</template>

<script>

import HTTPErrorModal from "@/components/HTTP_Error_Modal/HTTPErrorModal.vue";

export default {
    components: { HTTPErrorModal },
}
</script>
