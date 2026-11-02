import AppLoader from './appLoader';
import type { NewsSource, NewsArticle } from '../../types/news';

class AppController extends AppLoader {
    getSources(callback: (data: NewsSource[]) => void) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            (response) => {
                if (response.status === 'ok' && 'sources' in response) {
                    callback(response.sources);
                }
            }
        );
    }

    getNews(e: MouseEvent, callback: (data: NewsArticle[]) => void): void {
        const newsContainer = e.currentTarget;
        if (!(newsContainer instanceof HTMLElement)) return;

        let target = e.target;

        while (target instanceof HTMLElement && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (!sourceId) return;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        (response) => {
                            if (response.status === 'ok' && 'articles' in response) {
                                callback(response.articles);
                            }
                        }
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
