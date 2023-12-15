<script setup>
import { ref, onMounted } from 'vue';
import EventosService from '@/service/EventosService';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { formatFecha} from '@/components/FormatoFecha'

const toast = useToast();
const router = useRouter();
const eventos = ref([]);
const selectedEventos = ref([]);
const filters = ref({ global: { value: null } });
const evento = ref({});
const eventoDialog = ref(false);
const deleteEventoDialog = ref(false);
const isUpdateOperation = ref(false);
const pagination = ref({ page: 1, pageSize: 10 });

async function loadEventos(page) {
    try {
        pagination.value.page = page || pagination.value.page;
        console.log(pagination.value.page);
        const response = await EventosService.getEventos(pagination.value.page, pagination.value.pageSize);
        eventos.value = response.data;
        console.log(response);
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
    const pageSize = await EventosService.getPageSize();
    pagination.value.pageSize = pageSize;
    loadEventos();
});
const editEvento = async (eventoId) => {
    const response = await EventosService.getEvento(eventoId);
    evento.value = response.data;
    eventoDialog.value = true;
    isUpdateOperation.value = true;
};
const openNew = () => {
    evento.value = { attributes: {} };
    eventoDialog.value = true;
    isUpdateOperation.value = false;
};

const hideDialog = () => {
    eventoDialog.value = false;
    evento.value = {};
};
const confirmDeleteEvento = async (eventoId) => {
    const response = await EventosService.getEvento(eventoId);
    evento.value = response.data;
    deleteEventoDialog.value = true;
};
const createEvento = async () => {
    await EventosService.createEvento({ data: evento.value.attributes });

    eventoDialog.value = false;
    pagination.value.pageSize = pagination.value.pageSize + 1;
    await loadEventos(pagination.value.page, pagination.value.pageSize);
    toast.add({
        severity: 'success',
        summary: 'Exitoso',
        detail: 'Evento Creado',
        life: 3000
    });
};
const updateEvento = async () => {
    await EventosService.updateEvento(evento.value.id, { data: evento.value.attributes });

    eventoDialog.value = false;
    const response = await EventosService.getEventos();
    eventos.value = response.data;
    await loadEventos(pagination.value.page, pagination.value.pageSize);
    toast.add({
        severity: 'success',
        summary: 'Exitoso',
        detail: 'Evento Actualizado',
        life: 3000
    });
};
const deleteEvento = async () => {
    const res = await EventosService.deleteEvento(evento.value.id);
    deleteEventoDialog.value = false;
    const response = await EventosService.getEventos(pagination.value.page, pagination.value.pageSize); // Recarga la lista de eventos
    eventos.value = response.data;
    toast.add({
        severity: 'success',
        summary: 'Exitoso',
        detail: 'Evento Eliminado',
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

function handlePageChange(event) {
    const page = event.page + 1;
    loadEventos(page);
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
                    v-model:selection="selectedEventos"
                    :value="eventos"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :totalRecords="pagination.total"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} eventos"
                    responsiveLayout="scroll"
                    @page="handlePageChange"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Lista Eventos</h5>
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
                    <Column field="attributes.Nombre" header="Nombre" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Nombre</span>
                            {{ slotProps.data.attributes.Nombre }}
                        </template>
                    </Column>
                    <Column field="attributes.lugar" header="Lugar" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Lugar</span>
                            {{ slotProps.data.attributes.lugar ? slotProps.data.attributes.lugar : 'N/A' }}
                        </template>
                    </Column>
                    <Column field="attributes.fecha" header="Fecha" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Fecha</span>
                            {{ formatFecha(slotProps.data.attributes.fecha) }}
                        </template>
                    </Column>

                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2 p-button-rounded p-button-success" @click="editEvento(slotProps.data.id)" />
                            <Button icon="pi pi-trash" class="mt-2 p-button-rounded p-button-warning" @click="confirmDeleteEvento(slotProps.data.id)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-if="evento" v-model:visible="eventoDialog" :modal="true" :style="{ width: '50vw' }" :closable="false">
                    <form @submit.prevent="isUpdateOperation ? updateEvento() : createEvento()">
                        <div class="p-column-title">
                            <label for="nombre">Nombre</label>
                            <InputText id="nombre" v-model="evento.attributes.Nombre" required="true" autofocus />
                        </div>
                        <div class="p-field">
                            <label for="fecha" class="p-d-block">Fecha</label>
                            <input type="date" id="fecha" v-model="evento.attributes.fecha" class="p-inputtext p-component" required autofocus />
                        </div>

                        <div class="field">
                            <label for="lugar">Lugar</label>
                            <InputText id="lugar" v-model="evento.attributes.lugar" required="true" autofocus />
                        </div>
                        <div class="p-d-flex p-jc-end p-mt-3">
                            <Button label="Cancelar" icon="pi pi-times" class="p-button-text p-mr-2" @click="hideDialog" />
                            <Button v-if="isUpdateOperation" label="Actualizar" icon="pi pi-check" class="p-button-text" type="submit" />
                            <Button v-else label="Crear" icon="pi pi-check" class="p-button-text" type="submit" />
                        </div>
                    </form>
                </Dialog>
                <Dialog v-model:visible="deleteEventoDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="mr-3 pi pi-exclamation-triangle" style="font-size: 2rem" />
                        <span v-if="evento"
                            >Estas seguro de eliminar el evento <b>{{ evento.attributes.Nombre }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteEventoDialog = false" />
                        <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteEvento" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import '@/assets/layout/styles/theme/lara-light-indigo/theme.css';
</style>
