import { NewsArticle, NewsSource } from '../../types/news';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsArticle[]): void {
        this.news.draw(data);
    }

    drawSources(data: NewsSource[]): void {
        this.sources.draw(data);
    }
}

export default AppView;
