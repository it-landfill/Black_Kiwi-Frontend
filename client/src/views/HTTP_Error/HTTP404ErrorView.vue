<template>
    <div class="h-screen relative">
        <HTTPErrorModal />
    </div>
</template>

<script>

import HTTPErrorModal from "@/components/errorModal/HTTPErrorModal/HTTPErrorModal.vue";

export default {
    components: { HTTPErrorModal },
}
</script>
