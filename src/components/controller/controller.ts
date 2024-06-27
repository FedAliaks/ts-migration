import { AppControllerInterface, Endpoint, VoidIDrawNews, VoidIDrawSources } from '../../types/index';
import AppLoader from './appLoader';

class AppController extends AppLoader implements AppControllerInterface {
    getSources(callback: VoidIDrawSources): void {
        super.getResp(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    getNews(e: Event, callback: VoidIDrawNews): void {
        let target = e.target as Element;
        const newsContainer = e.currentTarget as Element;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as Element;
        }
    }
}

export default AppController;
