import Login from './views/public/Login.svelte';
import PublicIndex from './views/public/index.svelte';
import PublicLayout from './views/public/Layout.svelte';
import AuthLayout from './views/auth/Layout.svelte';
import AuthIndex from './views/auth/Index.svelte';

function userIsAdmin() {
    //check if user is admin and returns true or false
    return false;
}

const routes = [
    {
        name: '/',
        component: PublicIndex,
        layout: PublicLayout,
    },
    { name: 'login', component: Login, layout: PublicLayout },
    {
        name: 'auth',
        component: AuthIndex,
        layout: AuthLayout,
        onlyIf: { guard: userIsAdmin, redirect: '/login' }
    }
]

export { routes }