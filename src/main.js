import "./styles.css";
import "./vars.scss";

import * as VueRouter from 'vue-router'; 
import { createApp } from "vue";
import { fs } from "@tauri-apps/api";
import App from "./App.vue";
import FileList from "./components/FileList.vue";
import Base from "./components/Base.vue";

const directories = [
    {baseDir: fs.BaseDirectory.AppConfig, sub: 'user', files: ['savedLocations.json']}
];

const directoryJobs = [];
directories.forEach((dirItem) => {
    fs.exists(dirItem.sub, {dir: dirItem.baseDir}).then(
        (a) => {
            console.log(a);
            if (false) {
                directoryJobs.push(
                    fs.createDir(dirItem.sub, {dir: dirItem.baseDir, recursive: true})
                );
            }
        }
    );
});

const routes = [
    {path: '/', component: Base},
    {path: '/files/:path(.*)?', component: FileList},
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
