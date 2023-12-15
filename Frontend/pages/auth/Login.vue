<script setup>
import { ref, computed } from 'vue';
import { useLayout } from '@/layouts/composables/layout';
import AuthService from '../../service/AuthService';
import { useRouter } from 'vue-router';

const { layoutConfig } = useLayout();

const email = ref('');
const password = ref('');
const router = useRouter();
const checked = ref(false);
const logoUrl = ref('/layout/images/rsu.jpg');

const handleSubmit = async () => {
    if (!email.value || !password.value) {
        console.error('Please fill in both fields');
        return;
    }

    try {
        const response = await AuthService.login(email.value, password.value);
        router.push('/admin/voluntarios');
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

definePageMeta({
    layout: false
});
</script>

<template>
    <div class="flex min-h-screen overflow-hidden surface-ground align-items-center justify-content-center min-w-screen">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="flex-shrink-0 mb-5 w-6rem" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, #01793D 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full px-5 py-8 surface-card sm:px-8" style="border-radius: 53px">
                    <div class="flex justify-center mb-5 text-center">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" />
                    </div>
                    <div class="mb-3 text-3xl font-medium text-center text-900">Bienvenido/a</div>
                    <form @submit.prevent="handleSubmit">
                        <label for="email1" class="block mb-2 text-xl font-medium text-900">Correo Electronico</label>
                        <InputText autocomplete="current-email" id="email1" v-model="email" type="text" placeholder="Dirección de Correo Electronico" class="w-full mb-5 md:w-30rem" style="padding: 1rem" />

                        <label for="password1" class="block text-xl font-medium text-900 mb-2v">Contraseña</label>
                        <Password
                            id="password1"
                            v-model="password"
                            placeholder="Contraseña"
                            :toggleMask="true"
                            class="w-full mb-3"
                            inputClass="w-full"
                            :inputStyle="{ padding: '1rem' }"
                            :weakLabel="'Débil'"
                            :mediumLabel="'Medio'"
                            :strongLabel="'Fuerte'"
                            :autocomplete="'current-password'"
                        ></Password>

                        <div class="flex gap-5 mb-5 align-items-center justify-content-between">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Recordar</label>
                            </div>
                            <a class="ml-2 font-medium text-right no-underline cursor-pointer" style="color: var(--primary-900)">¿Has olvidado tu contraseña?</a>
                        </div>
                        <Button type="submit" label="Iniciar Sesión" class="w-full p-3 text-xl "></Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import '@/assets/layout/styles/theme/lara-light-indigo/theme.css';
</style>
