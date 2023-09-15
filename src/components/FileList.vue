<template>
    <div class="content-infobar">
        <div class="content-infobar__back-container">
            <div class="content-infobar__back-button" v-if="deepPath" @click="$router.go(-1)">
                BACK
            </div>
        </div>
        <div class="content-infobar__path">{{ homePath }}{{ deepPath }}</div>
    </div>
    <div class="content-container">
        <template v-for="folder in folderList">
            <ListButton :link="folder"/>
        </template>
    </div>
</template>

<script>
import ListButton from "./ListButton.vue";
import { useRoute } from "vue-router";
import { fs } from "@tauri-apps/api";
import { homeDir } from '@tauri-apps/api/path';
import { ref } from "vue";

export default {
    name: 'FileList',
    components: {
        ListButton,
    },
    setup() {
        const values = {
            folderList: ref([]),
            fileList: ref([]),
            homePath: ref(''),
        }

        const deepPath = useRoute().params.path;

        const listSortRules = (a, b) => {
            return a.name > b.name ? 1 : -1;
        }

        fs.readDir(`${deepPath}`, { dir: fs.BaseDirectory.Home })
            .then(async (result) => {
                const homePath = await homeDir();
                const inter = result.sort(listSortRules);

                values.homePath.value = homePath;

                const [folders, files] = inter.reduce((acc, item) => {
                    if (item.children !== undefined) {
                        acc[0].push({ name: item.name, path: `/files/${item.path.substring(homePath.length)}`});
                    } else {
                        acc[1].push({ name: item.name, path: '/'});
                    }
                    return acc;
                }, [[], []]);

                values.folderList.value = folders;
                values.fileList.value = files;
            });

        return {
            ...values,
            deepPath,
        }
    }
}
</script>

<style lang="scss" scoped>
@import "/src/vars.scss";

.content-infobar {
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    border-bottom: $tertiary 1px solid;

    &__back-container {
        height: 100%;
        width: 100px;
        border-right: $tertiary 1px solid;
    }

    &__back-button {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.1s ease-in-out;
        cursor: pointer;

        &:hover {
            background-color: rgba($color: $secondary, $alpha: $semiTransparent);
        }
    }

    &__path {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 0 0 16px;
    }
}

.content-container {
    width: 100%;
}
</style>
