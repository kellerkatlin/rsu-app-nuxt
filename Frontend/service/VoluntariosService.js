// peticion de voluntarios
const API_URL = import.meta.env.VITE_API_URL + '/voluntarios';

class VoluntariosService {
    async getPageSize() {
        const url = `${API_URL}`;
        const response = await fetch(url);
        const data = await response.json();
        const total = data.meta.pagination.total; 
        return total
    }
    async getVoluntarios(page, pageSize) {
        const url = `${API_URL}?populate=eventos&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Failed to fetch voluntarios', error);
            throw error;
        }
    }
    async getVoluntario(id) {
        const url = `${API_URL}/${id}?populate=eventos`;
        const response = await fetch(url);
        return response.json();
    }
    async createVoluntario(voluntario) {
        const url = `${API_URL}?populate=eventos`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(voluntario),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('auth._token.local') || ''
                // como indico el rol para poder crear voluntarios
            }
        });
        return response.json();
    }
    async updateVoluntario(id, voluntario) {
        const url = `${API_URL}/${id}?populate=eventos`;
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(voluntario),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }
    async deleteVoluntario(id) {
        const url = `${API_URL}/${id}?populate=eventos`;
        const response = await fetch(url, {
            method: 'DELETE'
        });
        return response.json();
    }
}

export default new VoluntariosService();
