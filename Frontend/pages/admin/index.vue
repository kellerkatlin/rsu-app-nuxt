<script setup>
import { useLayout } from '@/layouts/composables/layout';
import { ProductService } from '@/service/ProductService';
import { onMounted, reactive, ref, watch } from 'vue';
import { formatFecha} from '@/components/FormatoFecha'


const { isDarkTheme } = useLayout();
const products = ref(null);
const lineData = reactive({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
});
const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-minus' }
]);
const lineOptions = ref(null);

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
};

const applyDarkTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            }
        }
    };
};

watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="mb-0 card">
                <div class="flex mb-3 justify-content-between">
                    <div>
                        <span class="block mb-3 font-medium text-500">Orders</span>
                        <div class="text-xl font-medium text-900">152</div>
                    </div>
                    <div class="flex bg-blue-100 align-items-center justify-content-center border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="text-xl text-blue-500 pi pi-shopping-cart"></i>
                    </div>
                </div>
                <span class="font-medium text-green-500">24 new </span>
                <span class="text-500">since last visit</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="mb-0 card">
                <div class="flex mb-3 justify-content-between">
                    <div>
                        <span class="block mb-3 font-medium text-500">Revenue</span>
                        <div class="text-xl font-medium text-900">$2.100</div>
                    </div>
                    <div class="flex bg-orange-100 align-items-center justify-content-center border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="text-xl text-orange-500 pi pi-map-marker"></i>
                    </div>
                </div>
                <span class="font-medium text-green-500">%52+ </span>
                <span class="text-500">since last week</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="mb-0 card">
                <div class="flex mb-3 justify-content-between">
                    <div>
                        <span class="block mb-3 font-medium text-500">Customers</span>
                        <div class="text-xl font-medium text-900">28441</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="text-xl pi pi-inbox text-cyan-500"></i>
                    </div>
                </div>
                <span class="font-medium text-green-500">520 </span>
                <span class="text-500">newly registered</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="mb-0 card">
                <div class="flex mb-3 justify-content-between">
                    <div>
                        <span class="block mb-3 font-medium text-500">Comments</span>
                        <div class="text-xl font-medium text-900">152 Unread</div>
                    </div>
                    <div class="flex bg-purple-100 align-items-center justify-content-center border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="text-xl text-purple-500 pi pi-comment"></i>
                    </div>
                </div>
                <span class="font-medium text-green-500">85 </span>
                <span class="text-500">responded</span>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Recent Sales</h5>
                <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
                    <Column style="width: 15%">
                        <template #header> Image </template>
                        <template #body="slotProps">
                            <img :src="'/demo/images/product/' + slotProps.data.image" :alt="slotProps.data.image" width="50" class="shadow-2" />
                        </template>
                    </Column>
                    <Column field="name" header="Name" :sortable="true" style="width: 35%"></Column>
                    <Column field="price" header="Price" :sortable="true" style="width: 35%">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column style="width: 15%">
                        <template #header> View </template>
                        <template #body>
                            <Button icon="pi pi-search" type="button" class="p-button-text"></Button>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="card">
                <div class="flex mb-5 justify-content-between align-items-center">
                    <h5>Best Selling Products</h5>
                    <div>
                        <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu2.toggle($event)"></Button>
                        <Menu ref="menu2" :popup="true" :model="items"></Menu>
                    </div>
                </div>
                <ul class="p-0 m-0 list-none">
                    <li class="flex mb-4 flex-column md:flex-row md:align-items-center md:justify-content-between">
                        <div>
                            <span class="mb-1 mr-2 font-medium text-900 md:mb-0">Space T-Shirt</span>
                            <div class="mt-1 text-600">Clothing</div>
                        </div>
                        <div class="flex mt-2 md:mt-0 align-items-center">
                            <div class="overflow-hidden surface-300 border-round w-10rem lg:w-6rem" style="height: 8px">
                                <div class="h-full bg-orange-500" style="width: 50%"></div>
                            </div>
                            <span class="ml-3 font-medium text-orange-500">%50</span>
                        </div>
                    </li>
                    <li class="flex mb-4 flex-column md:flex-row md:align-items-center md:justify-content-between">
                        <div>
                            <span class="mb-1 mr-2 font-medium text-900 md:mb-0">Portal Sticker</span>
                            <div class="mt-1 text-600">Accessories</div>
                        </div>
                        <div class="flex mt-2 ml-0 md:mt-0 md:ml-8 align-items-center">
                            <div class="overflow-hidden surface-300 border-round w-10rem lg:w-6rem" style="height: 8px">
                                <div class="h-full bg-cyan-500" style="width: 16%"></div>
                            </div>
                            <span class="ml-3 font-medium text-cyan-500">%16</span>
                        </div>
                    </li>
                    <li class="flex mb-4 flex-column md:flex-row md:align-items-center md:justify-content-between">
                        <div>
                            <span class="mb-1 mr-2 font-medium text-900 md:mb-0">Supernova Sticker</span>
                            <div class="mt-1 text-600">Accessories</div>
                        </div>
                        <div class="flex mt-2 ml-0 md:mt-0 md:ml-8 align-items-center">
                            <div class="overflow-hidden surface-300 border-round w-10rem lg:w-6rem" style="height: 8px">
                                <div class="h-full bg-pink-500" style="width: 67%"></div>
                            </div>
                            <span class="ml-3 font-medium text-pink-500">%67</span>
                        </div>
                    </li>
                    <li class="flex mb-4 flex-column md:flex-row md:align-items-center md:justify-content-between">
                        <div>
                            <span class="mb-1 mr-2 font-medium text-900 md:mb-0">Wonders Notebook</span>
                            <div class="mt-1 text-600">Office</div>
                        </div>
                        <div class="flex mt-2 ml-0 md:mt-0 md:ml-8 align-items-center">
                            <div class="overflow-hidden surface-300 border-round w-10rem lg:w-6rem" style="height: 8px">
                                <div class="h-full bg-green-500" style="width: 35%"></div>
                            </div>
                            <span class="ml-3 font-medium text-green-500">%35</span>
                        </div>
                    </li>
                    <li class="flex mb-4 flex-column md:flex-row md:align-items-center md:justify-content-between">
                        <div>
                            <span class="mb-1 mr-2 font-medium text-900 md:mb-0">Mat Black Case</span>
                            <div class="mt-1 text-600">Accessories</div>
                        </div>
                        <div class="flex mt-2 ml-0 md:mt-0 md:ml-8 align-items-center">
                            <div class="overflow-hidden surface-300 border-round w-10rem lg:w-6rem" style="height: 8px">
                                <div class="h-full bg-purple-500" style="width: 75%"></div>
                            </div>
                            <span class="ml-3 font-medium text-purple-500">%75</span>
                        </div>
                    </li>
                    <li class="flex mb-4 flex-column md:flex-row md:align-items-center md:justify-content-between">
                        <div>
                            <span class="mb-1 mr-2 font-medium text-900 md:mb-0">Robots T-Shirt</span>
                            <div class="mt-1 text-600">Clothing</div>
                        </div>
                        <div class="flex mt-2 ml-0 md:mt-0 md:ml-8 align-items-center">
                            <div class="overflow-hidden surface-300 border-round w-10rem lg:w-6rem" style="height: 8px">
                                <div class="h-full bg-teal-500" style="width: 40%"></div>
                            </div>
                            <span class="ml-3 font-medium text-teal-500">%40</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Sales Overview</h5>
                <Chart type="line" :data="lineData" :options="lineOptions" />
            </div>
            <div class="card">
                <div class="flex mb-4 align-items-center justify-content-between">
                    <h5>Notifications</h5>
                    <div>
                        <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu1.toggle($event)"></Button>
                        <Menu ref="menu1" :popup="true" :model="items"></Menu>
                    </div>
                </div>

                <span class="block mb-3 font-medium text-600">TODAY</span>
                <ul class="p-0 mx-0 mt-0 mb-4 list-none">
                    <li class="flex py-2 align-items-center border-bottom-1 surface-border">
                        <div class="flex flex-shrink-0 mr-3 bg-blue-100 w-3rem h-3rem align-items-center justify-content-center border-circle">
                            <i class="text-xl text-blue-500 pi pi-dollar"></i>
                        </div>
                        <span class="text-900 line-height-3"
                            >Richard Jones
                            <span class="text-700">has purchased a blue t-shirt for <span class="text-blue-500">79$</span></span>
                        </span>
                    </li>
                    <li class="flex py-2 align-items-center">
                        <div class="flex flex-shrink-0 mr-3 bg-orange-100 w-3rem h-3rem align-items-center justify-content-center border-circle">
                            <i class="text-xl text-orange-500 pi pi-download"></i>
                        </div>
                        <span class="text-700 line-height-3">Your request for withdrawal of <span class="font-medium text-blue-500">2500$</span> has been initiated.</span>
                    </li>
                </ul>

                <span class="block mb-3 font-medium text-600">YESTERDAY</span>
                <ul class="p-0 m-0 list-none">
                    <li class="flex py-2 align-items-center border-bottom-1 surface-border">
                        <div class="flex flex-shrink-0 mr-3 bg-blue-100 w-3rem h-3rem align-items-center justify-content-center border-circle">
                            <i class="text-xl text-blue-500 pi pi-dollar"></i>
                        </div>
                        <span class="text-900 line-height-3"
                            >Keyser Wick
                            <span class="text-700">has purchased a black jacket for <span class="text-blue-500">59$</span></span>
                        </span>
                    </li>
                    <li class="flex py-2 align-items-center border-bottom-1 surface-border">
                        <div class="flex flex-shrink-0 mr-3 bg-pink-100 w-3rem h-3rem align-items-center justify-content-center border-circle">
                            <i class="text-xl text-pink-500 pi pi-question"></i>
                        </div>
                        <span class="text-900 line-height-3"
                            >Jane Davis
                            <span class="text-700">has posted a new questions about your product.</span>
                        </span>
                    </li>
                </ul>
            </div>
            <div
                class="flex px-4 py-5 mb-3 shadow-2 flex-column md:flex-row md:align-items-center justify-content-between"
                style="border-radius: 1rem; background: linear-gradient(0deg, rgba(0, 123, 255, 0.5), rgba(0, 123, 255, 0.5)), linear-gradient(92.54deg, #1c80cf 47.88%, #ffffff 100.01%)"
            >
                <div>
                    <div class="mt-2 mb-3 text-xl font-medium text-blue-100">TAKE THE NEXT STEP</div>
                    <div class="text-5xl font-medium text-white">Try PrimeBlocks</div>
                </div>
                <div class="mt-4 mr-auto md:mt-0 md:mr-0">
                    <a href="https://www.primefaces.org/primeblocks-vue" class="px-5 py-3 font-bold p-button p-button-warning p-button-rounded p-button-raised"> Get Started </a>
                </div>
            </div>
        </div>
    </div>
</template>
