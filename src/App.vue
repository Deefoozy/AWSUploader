<template>
    <div class="page">
        <div class="page-menu">
            <SideBar :links="links" />
        </div>
        <div class="page-content">
            <RouterView :key="$route.path" />
        </div>
    </div>
</template>

<script>
import FileList from "./components/FileList.vue";
import SideBar from "./components/SideBar.vue";
import { RouterLink, RouterView } from "vue-router";

export default {
    name: 'App',
    components: {
        SideBar,
        FileList,
        RouterLink,
        RouterView,
    },
    setup() {
        const links = [
            {
                name: 'main',
                path: '/',
                component: FileList,
            },
            {
                name: 'files',
                path: '/files',
                component: FileList,
            },
        ];

        return {
            links,
        }
    }
}
</script>

<style lang="scss" scoped>
@import "/src/vars.scss";


.page {
    background-color: $primary;

    max-height: 100vh;
    display: flex;
    flex-direction: row;
    width: 100%;
}

.page-content {
    overflow: scroll;
    width: calc(100vw - $menu-width);
}

.page-menu {
    width: $menu-width;
}
</style>
