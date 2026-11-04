import { NewsArticle } from '../../../types/news';
import './news.css';

function getRequiredElement<T extends Element>(root: ParentNode, selector: string): T {
    const element = root.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Template element not found: ${selector}`);
    }

    return element;
}

class News {
    draw(data: NewsArticle[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = document.importNode(newsItemTemp.content, true);

            if (idx % 2) getRequiredElement<HTMLElement>(newsClone, '.news__item').classList.add('alt');

            getRequiredElement<HTMLElement>(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            getRequiredElement<HTMLElement>(newsClone, '.news__meta-author').textContent =
                item.author || item.source.name;
            getRequiredElement<HTMLElement>(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getRequiredElement<HTMLElement>(newsClone, '.news__description-title').textContent = item.title;
            getRequiredElement<HTMLElement>(newsClone, '.news__description-source').textContent = item.source.name;
            getRequiredElement<HTMLElement>(newsClone, '.news__description-content').textContent = item.description;
            getRequiredElement<HTMLAnchorElement>(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (!newsContainer) return;

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
