import axios from 'axios';

export class CosmosApiManager {      
    static REST_URL = '/api';

    /**
     * 
     * @param param0 
     * @returns 
     */
    static async callAPI(endpoint: string, params: any = {}): Promise<any> {
        if (!endpoint.startsWith('/')) {
            endpoint = '/' + endpoint;
        }

        return new Promise(async (resolve, reject) => {
            axios
                .get(`${CosmosApiManager.REST_URL}${endpoint}`, {params: params})
                .then((response) => {
                    resolve(response);
                })
        })
    }
}