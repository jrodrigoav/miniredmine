import App from './App.svelte';

const app = new App({
	target: document.body
});

window = Object.assign(window, { app: app });

export default app;