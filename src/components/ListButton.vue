<template>
    <RouterLink class="button" :to="link.path">
        {{ link.name }}
    </RouterLink>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
    name: 'App',
    props: {
        link: {
            type: Object,
            default: {path: '/', name: 'NO_VALUE'},
        }
    },
    components: {
        RouterLink,
    },
    setup() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
@import "/src/vars.scss";

.button {
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    padding: 0 0 0 16px;
    border-bottom: $tertiary 1px solid;
    background-color: rgba($color: $secondary, $alpha: $transparent);
    color: $tertiary;
    transition: background-color 0.1s ease-in-out;

    &:hover {
        background-color: rgba($color: $secondary, $alpha: $semiTransparent);
    }
}
</style>
