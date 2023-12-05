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
const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

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

   
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenido/a</div>
                    </div>
                    
                    <form @submit.prevent="handleSubmit">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Correo Electronico</label>
                        <InputText id="email1" v-model="email" type="text" placeholder="Dirección de Correo Electronico" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2v">Contraseña</label>
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
                        ></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Recordar</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">¿Has olvidado tu contraseña?</a>
                        </div>
                        <Button type="submit" label="Iniciar Sesión" class="w-full p-3 text-xl"></Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
