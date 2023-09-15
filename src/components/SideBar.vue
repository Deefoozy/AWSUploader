<template>
    <div class="sidebar">
        <!-- <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" /> -->
        <div class="sidebar__list">
            <template v-for="link in links">
                <ListButton :link="link"/>
            </template>
        </div>
    </div>
</template>

<script>
import ListButton from "./ListButton.vue";
import { RouterLink } from "vue-router";

export default {
    name: 'App',
    props: {
        links: {
            type: Array,
            default: () => [],
        }
    },
    components: {
        ListButton,
        RouterLink,
    },
    setup() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
@import "/src/vars.scss";

.sidebar {
    background-color: $primary;
    height: 100vh;
    border-right: $tertiary 1px solid;

    &__list {
        display: flex;
        flex-direction: column;
    }
}
</style>
