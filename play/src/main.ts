import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import screenUI from "@screen-ui-lib/components";

createApp(App).use(screenUI).mount("#app");
