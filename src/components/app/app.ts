import { AppInterface, ResponseNewsAPI, drawNewsInterFace } from '../../types/index';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App implements AppInterface {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: drawNewsInterFace) => this.view.drawNews(data))
        );
        this.controller.getSources((data: ResponseNewsAPI) => this.view.drawSources(data));
    }
}

export default App;
