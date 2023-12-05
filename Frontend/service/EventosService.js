// peticion de Eventos
const API_URL = import.meta.env.VITE_API_URL + '/eventos';

class EventosService {
    async getPageSize() {
        const url = `${API_URL}`;
        const response = await fetch(url);
        const data = await response.json();
        const total = data.meta.pagination.total;
        return total;
    }

    async getEventos(page, pageSize) {
        const url = `${API_URL}?populate=voluntarios&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Failed to fetch eventos', error);
            throw error;
        }
    }
    async getEvento(id) {
        const url = `${API_URL}/${id}`;
        const response = await fetch(url);
        return response.json();
    }
    async createEvento(evento) {
        const url = `${API_URL}`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(evento),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('auth._token.local') || ''
                // como indico el rol para poder crear eventos
            }
        });
        return response.json();
    }
    async updateEvento(id, evento) {
        const url = `${API_URL}/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(evento),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }
    async deleteEvento(id) {
        const url = `${API_URL}/${id}`;
        const response = await fetch(url, {
            method: 'DELETE'
        });
        return response.json();
    }
}

export default new EventosService();
