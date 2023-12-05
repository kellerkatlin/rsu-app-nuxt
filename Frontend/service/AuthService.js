class AuthService {
    static TOKEN_KEY = 'auth._token.local';
    static LOGIN_URL = `${import.meta.env.VITE_API_URL}/auth/local`;

    static async login(username, password) {
        const response = await fetch(this.LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        const { jwt } = await response.json();

        if (jwt) {
            localStorage.setItem(this.TOKEN_KEY, `Bearer ${jwt}`);
            return jwt;
        } else {
            throw new Error('No JWT token received');
        }
    }
}
export default AuthService;
