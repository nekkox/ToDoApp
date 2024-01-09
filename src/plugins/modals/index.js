import Modal from "./Modal.vue";
import { reactive } from "vue";

const _current = reactive({
  name: "",
  resolve: null,
  reject: null,
});

const api = {
  active() {
    return _current.name;
  },
  show(name) {
    _current.name = name;
    return new Promise((resolve = () => {}, reject = () => {}) => {
      _current.resolve = resolve;
      _current.reject = reject;
    });
  },
  accept() {
    _current.resolve();
    _current.name = "";
  },
  cancel() {
    _current.reject();
    _current.name = "";
  },
};

const plugin = {
  install(App, options) {
    // Register global component
    App.component("Modal", Modal);

    // Provide Plugin API
    App.provide("$modals", api);
  },
};

export default plugin;
