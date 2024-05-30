import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import PerfilPage from '@/views/PerfilPage.vue';

// Define some dummy routes for the router
const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component:  PerfilPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// eslint-disable-next-line max-lines-per-function
describe('HomePage', () => {
  it('renders properly', async () => {
    // Mount the component with the router
    const wrapper = mount(HomePage, {
      global: {
        plugins: [router]
      }
    });

    // Ensure the router is ready
    await router.isReady();

    expect(wrapper.text()).toContain('Quer rapidez na entrega?');
  });

  it('redirect to login page', async () => {
    // Mount the component with the router
    const wrapper = mount(HomePage, {
      global: {
        plugins: [router]
      }
    });

    router.push('/');
    await router.isReady();
    // Ensure the router is ready
    await router.isReady();

    const link = wrapper.find('#enter');
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe('Entrar'); 

    await link.trigger('click');
    await router.isReady();

    expect(wrapper.vm.$route.path).toBe('/login'); 
  });
});

