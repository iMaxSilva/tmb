import HttpClient from "../../services/http-client";

class TMBAuth {
    constructor(private httpClient: HttpClient) {}

    async login(username: string, password: string): Promise<boolean> {
        try {
            const response = await this.httpClient.post<string>('/weblogin/signin.php', `mail=${username}&pass=${password}`);
            if (response.status === 200) {
                if (response.headers['set-cookie']) {
                    this.httpClient.setCookies(response.headers['set-cookie']);
                }
                return this.getAuthResponse(response.data);
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    getAuthResponse(response: string): boolean {
        const regex = /<div class='s-text text-danger pb-3'>(.*?)<\/div>/;
        const match = regex.exec(response);
        return !match;
    }
}

export default TMBAuth;
