<script setup>
import { ref, onMounted, computed } from 'vue';
import VoluntariosService from '@/service/VoluntariosService';
import EventosService from '../../../service/EventosService';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter();
const voluntarios = ref([]);
const selectedVoluntarios = ref([]);
const filters = ref({ global: { value: null } });
const voluntario = ref({});
const voluntarioDialog = ref(false);
const deleteVoluntarioDialog = ref(false);
const isUpdateOperation = ref(false);
const pagination = ref({ page: 1, pageSize: 10 });
const eventos = ref([]);
const selectedEvent = ref([]);

async function loadVoluntarios(page) {
    try {
        pagination.value.page = page || pagination.value.page;
        console.log(pagination.value.page);
        const response = await VoluntariosService.getVoluntarios(pagination.value.page, pagination.value.pageSize);
        voluntarios.value = response.data;
        if (voluntario.value && voluntario.value.attributes.eventoId) {
            selectedEvent.value = voluntario.value.attributes.eventoId;
        }
        console.log(response.data);
    } catch (error) {
        console.error('An error occurred:', error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al cargar los voluntarios',
            life: 3000
        });
    }
}

async function loadEventos() {
    try {
        const response = await EventosService.getEventos(pagination.value.page, pagination.value.pageSize);
        eventos.value = response.data;
        console.log(eventos.value);
    } catch (error) {
        console.error('An error occurred:', error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al cargar los eventos',
            life: 3000
        });
    }
}
onMounted(async () => {
    const pageSize = await VoluntariosService.getPageSize();
    pagination.value.pageSize = pageSize;
    loadVoluntarios();
    loadEventos();
});

const editVoluntario = async (voluntarioId) => {
    const response = await VoluntariosService.getVoluntario(voluntarioId);
    voluntario.value = response.data;
    voluntarioDialog.value = true;
    isUpdateOperation.value = true;
};
const openNew = () => {
    voluntario.value = { attributes: {} };
    voluntarioDialog.value = true;
    isUpdateOperation.value = false;
};

const hideDialog = () => {
    voluntarioDialog.value = false;
    voluntario.value = {};
};
const confirmDeleteVoluntario = async (voluntarioId) => {
    const response = await VoluntariosService.getVoluntario(voluntarioId);
    voluntario.value = response.data;
    deleteVoluntarioDialog.value = true;
};
const createVoluntario = async () => {
    const data = {
        ...voluntario.value.attributes,
        eventoId: selectedEvent.value
    };

    await VoluntariosService.createVoluntario({ data });
    voluntarioDialog.value = false;
    pagination.value.pageSize = pagination.value.pageSize + 1;
    await loadVoluntarios(pagination.value.page, pagination.value.pageSize);
    toast.add({
        severity: 'success',
        summary: 'Exitoso',
        detail: 'Voluntario Creado',
        life: 3000
    });
};

const updateVoluntario = async () => {
    const data = {
        ...voluntario.value.attributes,
        eventoId: selectedEvent.value
    };
    await VoluntariosService.updateVoluntario(voluntario.value.id, { data });
    console.log(data);
    voluntarioDialog.value = false;
    await loadVoluntarios(pagination.value.page, pagination.value.pageSize);
    toast.add({
        severity: 'success',
        summary: 'Exitoso',
        detail: 'Voluntario Actualizado',
        life: 3000
    });
};

const deleteVoluntario = async () => {
    const res = await VoluntariosService.deleteVoluntario(voluntario.value.id);
    deleteVoluntarioDialog.value = false;
    await loadVoluntarios(pagination.value.page, pagination.value.pageSize);
    toast.add({
        severity: 'success',
        summary: 'Exitoso',
        detail: 'Voluntario Eliminado',
        life: 3000
    });
};

definePageMeta({
    middleware: 'auth'
});
const logout = async () => {
    localStorage.removeItem('auth._token.local');
    router.push('/auth/login');
};
</script>

<template>
    <button @click="logout">Click</button>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:end>
                        <div class="my-2">
                            <Button label="New" icon="pi pi-plus" class="mr-2 p-button-success" @click="openNew" />
                        </div>
                    </template>
                </Toolbar>
                <DataTable
                    ref="dt"
                    v-model:selection="selectedVoluntarios"
                    :value="voluntarios"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :totalRecords="pagination.total"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} voluntarios"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Lista Voluntarios</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="id" header="ID" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">ID</span>
                            {{ slotProps.data.id }}
                        </template>
                    </Column>
                    <Column header="Nombre" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Nombre</span>
                            {{ slotProps.data.attributes.Nombre }}
                        </template>
                    </Column>
                    <Column field="" header="Apellido" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Evento</span>
                            {{ slotProps.data.attributes.Apellido }}
                        </template>
                    </Column>
                    <Column field="eventos" header="Evento" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span>
                                {{ slotProps.data.attributes.eventoId.data && slotProps.data.attributes.eventoId.data.length > 0 ? slotProps.data.attributes.eventoId.data[0].attributes.Nombre : 'No asignado' }}
                            </span>
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2 p-button-rounded p-button-success" @click="editVoluntario(slotProps.data.id)" />
                            <Button icon="pi pi-trash" class="mt-2 p-button-rounded p-button-warning" @click="confirmDeleteVoluntario(slotProps.data.id)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-if="voluntario" v-model:visible="voluntarioDialog" :modal="true" :style="{ width: '60vw' }" :closable="false">
                    <form @submit.prevent="isUpdateOperation ? updateVoluntario() : createVoluntario()">
                        <div class="grid mt-3 p-fluid">
                            <div class="my-3 field col-12 md:col-3">
                                <div class="p-inputgroup">
                                    <span class="p-inputgroup-addon">
                                        <i class="pi pi-user"></i>
                                    </span>
                                    <span class="p-float-label">
                                        <InputText id="nombre" v-model="voluntario.attributes.Nombre" type="text" />
                                        <label for="nombre">Nombre</label>
                                    </span>
                                </div>
                            </div>
                            <div class="my-3 field col-12 md:col-4">
                                <div class="p-inputgroup">
                                    <span class="p-inputgroup-addon">
                                        <i class="pi pi-user"></i>
                                    </span>
                                    <span class="p-float-label">
                                        <InputText id="apellido" v-model="voluntario.attributes.Apellido" type="text" />
                                        <label for="apellido">Apellido</label>
                                    </span>
                                </div>
                            </div>
                            <div class="my-3 field col-12 md:col-4">
                                <span class="p-float-label">
                                    <Dropdown id="evento" v-model="selectedEvent" :options="eventos" optionLabel="attributes.Nombre"></Dropdown>
                                    <label for="evento">Evento</label>
                                </span>
                            </div>
                        </div>

                        <div class="p-d-flex p-jc-end p-mt-3">
                            <Button label="Cancelar" icon="pi pi-times" class="p-button-text p-mr-2" @click="hideDialog" />
                            <Button v-if="isUpdateOperation" label="Actualizar" icon="pi pi-check" class="p-button-text" type="submit" />
                            <Button v-else label="Crear" icon="pi pi-check" class="p-button-text" type="submit" />
                        </div>
                    </form>
                </Dialog>
                <Dialog v-model:visible="deleteVoluntarioDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="mr-3 pi pi-exclamation-triangle" style="font-size: 2rem" />
                        <span v-if="voluntario"
                            >Estas seguro de eliminar el voluntario <b>{{ voluntario.attributes.Nombre }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteVoluntarioDialog = false" />
                        <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteVoluntario" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import '@/assets/layout/styles/theme/lara-light-indigo/theme.css';
</style>
