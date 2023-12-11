// peticion de Users
const API_URL = import.meta.env.VITE_API_URL+  '/users';

class UsersService {
    async getUsers() {
        const url = `${API_URL}?populate=*`;
        const response = await fetch(url);
        return response.json();
    }
    async getUser(id) {
        const url = `${API_URL}/${id}?populate=*`;
        const response = await fetch(url);
        return response.json();
    }
    async createUser(user) {
        const url = `${API_URL}`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }
    async updateUser(id, user) {
        const url = `${API_URL}/${id}?populate=*`;
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }
    async deleteUser(id) {
        const url = `${API_URL}/${id}?populate=*`;
        const response = await fetch(url, {
            method: 'DELETE'
        });
        return response.json();
    }
}

export default new UsersService();
