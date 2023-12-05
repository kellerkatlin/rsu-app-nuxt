<script setup>
import { ref } from 'vue';
import axios from 'axios';

const result = ref(null);

const sendBill = async () => {
    const url = 'https://e-beta.sunat.gob.pe:443/ol-ti-itcpfegem-beta/billService?wsdl';
    const args = {
        fileName: '20100066603-01-F001-00000001.zip',
        contentFile:
            'UEsDBBQACAAIAAAAAAAAAAAAAAAAAAAAAAAKAAAAc3Vuc2F0LnR4dFVUCQADz+qVXz/qVdXgLAAEE9QEAAAQUAAAAdGVzdC50eHRVVAUAA8/qVXgLAAEE9QEAAAQUAAAAUEsBAhQAFAAIAAgAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAAAHN1bnNhdC50eHRVVAUAA8/qVXgLAAEE9QEAAAQUAAAAdGVzdC50eHRVUEsFBgAAAAABAAEASgAAAHAAAAAAA==',
        user: 'MODDATOS',
        password: 'MODDATOS'
    };

    try {
        const response = await axios.post(url, args);
        result.value = response.data;
    } catch (err) {
        console.error(err);
    }
};
</script>
<template>
    <div>
        <pre>{{ result }}</pre>

        <button @click="sendBill">Enviar factura</button>
    </div>
</template>
