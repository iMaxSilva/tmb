import HttpClient, { IHttpClient } from "../../services/http-client";

export default class TmbRenderRequest {
    private http: IHttpClient;
    private refreshInterval: NodeJS.Timeout | null = null;

    constructor(httpClient: IHttpClient = new HttpClient('https://tmb-yw4y.onrender.com')) {
        this.http = httpClient;
    }

    async refreshRender() {
        try {
            await this.http.get('/health');
        } catch (error) {
            console.error('Error refreshing Render');
        }
    }

    startAutoRefresh(intervalMs: number = 15000) {
        if (this.refreshInterval === null) {
            this.refreshInterval = setInterval(() => this.refreshRender(), intervalMs);
        }
    }

    stopAutoRefresh() {
        if (this.refreshInterval !== null) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }
}
