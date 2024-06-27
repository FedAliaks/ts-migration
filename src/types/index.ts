import AppController from '../components/controller/controller';
import AppView from '../components/view/appView';
import News from '../components/view/news/news';
import Sources from '../components/view/sources/sources';

type CategoryNews = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

export interface NewsObj {
    id: string;
    name: string;
    description: string;
    url: string;
    category: CategoryNews;
    language: string;
    country: string;
}

export interface ResponseNewsAPI {
    status: string;
    sources: NewsObj[];
}

//news file

type SourceGeneric<T> = {
    id: T;
    name: T;
};

export interface NewsInterface {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: SourceGeneric<string>;
    title: string;
    url: string;
    urlToImage: string;
}

// AppVeiws
export interface drawNewsInterFace {
    status: string;
    totalResult: number;
    articles: NewsInterface[];
}

export interface AppViewInterface {
    news: News;
    sources: Sources;
}

//Loader.ts

export type LoaderInterfaceOptions = {
    apiKey: string;
};

export type VoidIDrawNews = (data: drawNewsInterFace) => void;
export type VoidIDrawSources = (data: ResponseNewsAPI) => void;

export interface IGetRespObject {
    endpoint: 'everything' | 'sources';
    options?: object;
}

export interface LoaderInterface {
    baseLink: string;
    options: LoaderInterfaceOptions;

    load: (method: string, endpoint: string, callback: VoidIDrawNews | VoidIDrawSources, options: object) => void;
}

//controller.js

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export interface AppControllerInterface {
    getSources(callback: VoidIDrawSources): void;
    getNews(e: Event, callback: VoidIDrawNews): void;
}

//app.ts
export interface AppInterface {
    controller: AppController;
    view: AppView;
    start(): void;
}

//sources.ts

export interface SourcesClass {
    draw: (data: NewsObj[]) => void;
}

//news
export interface NewsClass {
    draw: (data: NewsInterface[]) => void;
}
