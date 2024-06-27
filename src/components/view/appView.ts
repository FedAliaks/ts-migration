import { AppViewInterface, ResponseNewsAPI, drawNewsInterFace } from '../../types/index';
import News from './news/news';
import Sources from './sources/sources';

export class AppView implements AppViewInterface {
    public news: News;
    public sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: drawNewsInterFace) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ResponseNewsAPI) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
