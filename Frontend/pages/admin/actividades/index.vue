<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import ActividadesService from '@/service/ActividadesService';
import { useToast } from 'primevue/usetoast';
import { formatFecha } from '@/components/FormatoFecha';
import Calendar from 'primevue/calendar';


const toast = useToast();
const actividades = ref([]);
const selectedActividades = ref([]);
const filters = ref({ global: { value: null } });
const actividad = ref({});
const actividadDialog = ref(false);
const deleteActividadDialog = ref(false);
const isUpdateOperation = ref(false);
const pagination = ref({ page: 1, pageSize: 10 });
const hora12 = ref(null);
const position = ref('right');


async function loadActividades(page) {
    try {
        pagination.value.page = page || pagination.value.page;
        console.log(pagination.value.page);
        const response = await ActividadesService.getActividades(pagination.value.page, pagination.value.pageSize);
        actividades.value = response.data;
        console.log(response);
    } catch (error) {
        console.error('An error occurred:', error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al cargar los actividades',
            life: 3000
        });
    }
}

onMounted(async () => {
    const pageSize = await ActividadesService.getPageSize();
    pagination.value.pageSize = pageSize;
    pagination.value.page = 1;
    loadActividades();
});
const convertTo12HourFormat = (time) => {
    let [hours, minutes] = time.split(':');
    let date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString('en-PE', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase();
};

const convertTo24HourFormat = (date) => {
    if (!(date instanceof Date)) {
        return '';
    }

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}:00.000`;
};
const editActividad = async (actividadId) => {
    const response = await ActividadesService.getActividad(actividadId);
    actividad.value = response.data;
    hora12.value = convertTo12HourFormat(actividad.value.attributes.hora);
    actividadDialog.value = true;

    isUpdateOperation.value = true;
};
const openNew = () => {
    actividad.value = { attributes: {} };
    actividadDialog.value = true;

    isUpdateOperation.value = false;
};

const hideDialog = () => {
    actividadDialog.value = false;

    actividad.value = {};
};
const confirmDeleteActividad = async (actividadId) => {
    const response = await ActividadesService.getActividad(actividadId);
    actividad.value = response.data;
    deleteActividadDialog.value = true;
};
const createActividad = async () => {
    let dataToSend = {
        ...actividad.value.attributes,
        hora: convertTo24HourFormat(hora12.value)
    };

    await ActividadesService.createActividad({ data: dataToSend });
    actividadDialog.value = false;
    pagination.value.pageSize = pagination.value.pageSize + 1;
    await loadActividades(pagination.value.page, pagination.value.pageSize);
    toast.add({
        severity: 'success',
        summary: 'Exitoso',
        detail: 'Actividad Creada',
        life: 3000
    });
};
const updateActividad = async () => {
    let newHora = convertTo24HourFormat(hora12.value);
    let correctFormat = /^\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT-0500 \(hora estándar de Perú\)$/;
    if (!correctFormat.test(hora12.value)) {
        newHora = actividad.value.attributes.hora;
    }

    let dataToSend = {
        ...actividad.value.attributes,
        hora: newHora
    };
    await ActividadesService.updateActividad(actividad.value.id, { data: dataToSend });
    actividadDialog.value = false;
    await loadActividades(pagination.value.page, pagination.value.pageSize);
    toast.add({
        severity: 'success',
        summary: 'Exitoso',
        detail: 'Actividad Actualizada',
        life: 3000
    });
};
const deleteActividad = async () => {
    const res = await ActividadesService.deleteActividad(actividad.value.id);
    deleteActividadDialog.value = false;
    const response = await ActividadesService.getActividades(pagination.value.page, pagination.value.pageSize);
    actividades.value = response.data;
    toast.add({
        severity: 'success',
        summary: 'Exitoso',
        detail: 'Actividad Eliminada',
        life: 3000
    });
};

definePageMeta({
    middleware: 'auth'
});
function handlePageChange(event) {
    const page = event.page + 1;
    loadActividades(page);
}
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
                            <Button label="Crear" icon="pi pi-plus" class="mr-2 p-button-success" @click="openNew" />
                        </div>
                    </template>
                </Toolbar>
                <DataTable
                    ref="dt"
                    v-model:selection="selectedActividades"
                    :value="actividades"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :totalRecords="pagination.total"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} actividades"
                    responsiveLayout="scroll"
                    @page="handlePageChange"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Lista Actividades</h5>
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
                            {{ slotProps.data.attributes.nombre }}
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2 p-button-rounded p-button-success" @click="editActividad(slotProps.data.id)" />
                            <Button icon="pi pi-trash" class="mt-2 p-button-rounded p-button-warning" @click="confirmDeleteActividad(slotProps.data.id)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-if="actividad" v-model:visible="actividadDialog" :modal="true" :style="{ width: '35vw' }" :closable="false" :position="position">
                    <form @submit.prevent="isUpdateOperation ? updateActividad() : createActividad()">
                        <div class="col-12">
                            <div class="card">
                                <h5 class="text-center" v-if="isUpdateOperation">Editar Formulario de Actividades</h5>
                                <h5 class="text-center" v-else>Formulario de Actividades</h5>
                                <div class="grid py-5 p-fluid">
                                    <div class="my-2 col-12">
                                        <div class="p-inputgroup">
                                            <span class="p-float-label">
                                                <InputText id="nombre" v-model="actividad.attributes.nombre" required="true" />
                                                <label for="nombre">Nombre de Actividad</label>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="my-2 col-12">
                                        <div class="p-float-label">
                                            <span class="p-float-label">
                                                <InputText id="Lugar" v-model="actividad.attributes.lugar" required="true" />
                                                <label for="inputmask">Lugar de Actividad</label>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-6 sm:col-12">
                                        <label for="fecha">Fecha</label>
                                        <div class="p-inputgroup">
                                            <span class="p-inputgroup-addon">
                                                <i class="pi pi-calendar"></i>
                                            </span>
                                            <Calendar class="border" id="Fecha" v-model="actividad.attributes.fecha" :showIcon="false" dateFormat="dd/mm/yy" placeholder="dd/mm/aaaa" mask="99/99/9999" />
                                        </div>
                                    </div>
                                
                                    <div class="col-12 md:col-6 sm:col-12">
                                        <label for="fecha">Hora</label>
                                        <div class="p-inputgroup">
                                            <span class="p-inputgroup-addon">
                                                <i class="pi pi-clock"></i>
                                            </span>
                                            <Calendar class="border" id="hora" v-model="hora12" showTime hourFormat="12" timeOnly placeholder="--:-- AM/PM"  aria-describedby="date-error" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="text-right p-d-flex p-jc-end p-mt-3">
                            <Button label="Cancelar" icon="pi pi-times" class="p-button-text p-mr-2" @click="hideDialog" />
                            <Button v-if="isUpdateOperation" label="Actualizar" icon="pi pi-check" class="p-button-text" type="submit" />
                            <Button v-else label="Crear" icon="pi pi-check" class="p-button-text" type="submit" />
                        </div>
                    </form>
                </Dialog>
                <Dialog v-model:visible="deleteActividadDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="mr-3 pi pi-exclamation-triangle" style="font-size: 2rem" />
                        <span v-if="actividad"
                            >Estas seguro de eliminar el actividad <b>{{ actividad.attributes.nombre }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteActividadDialog = false" />
                        <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteActividad" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import '@/assets/layout/styles/theme/lara-light-indigo/theme.css';
</style>
