class AuthService {
    static TOKEN_KEY = 'auth._token.local';
    static LOGIN_URL = `${import.meta.env.VITE_API_URL}/auth/local`;
    static TOKEN_EXPIRATION_TIME = 1200000; // 20 minutos
    static timerId = null;

    static startTimer() {
        // Si ya hay un temporizador, lo cancelamos
        if (this.timerId) {
            clearTimeout(this.timerId);
        }

        // Iniciamos un nuevo temporizador
        this.timerId = setTimeout(() => {
            localStorage.removeItem(this.TOKEN_KEY);
        }, this.TOKEN_EXPIRATION_TIME);
    }

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

            // Iniciamos el temporizador
            this.startTimer();

            // Cada vez que el usuario mueve el ratón, reiniciamos el temporizador
            window.addEventListener('mousemove', () => this.startTimer());

            return jwt;
        } else {
            throw new Error('No JWT token received');
        }
    }
}

export default AuthService;