import {
    IGetRespObject,
    LoaderInterface,
    LoaderInterfaceOptions,
    VoidIDrawNews,
    VoidIDrawSources,
} from '../../types/index';

class Loader implements LoaderInterface {
    public baseLink: string;
    public options: LoaderInterfaceOptions;

    constructor(baseLink: string, options: LoaderInterfaceOptions) {
        //baseLink process.env.API_URL options - process.env.API_KEY
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: IGetRespObject,
        //endpoint 'everything' | 'sources'
        callback: VoidIDrawNews | VoidIDrawSources = (): void => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: object, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.entries(urlOptions).forEach((item) => {
            url += `${item[0]}=${item[1]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: VoidIDrawNews | VoidIDrawSources, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
