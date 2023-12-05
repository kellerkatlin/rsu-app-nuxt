<script setup>
import { ref, onMounted } from 'vue';
import UsersService from '@/service/UsersService';

const users = ref([]);
const selectedUsers = ref([]);
const filters = ref({ global: { value: null } });

onMounted(async () => {
    const response = await UsersService.getUsers();
    users.value = response;
});
definePageMeta({
    middleware: 'auth'
});
</script>

<template>
    <DataTable
        ref="dt"
        v-model:selection="selectedUsers"
        :value="users"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} voluntarios"
        responsiveLayout="scroll"
    >
        <template #header>
            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                <h5 class="m-0">Lista Usuarios</h5>
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
        <Column field="Nombre" header="Nombre" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Nombre</span>
                {{ slotProps.data.username }}
            </template>
        </Column>
        <Column field="Apellido" header="Apellido" :sortable="true" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
                <span class="p-column-title">Email</span>
                {{ slotProps.data.email }}
            </template>
        </Column>
    </DataTable>
</template>
<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
