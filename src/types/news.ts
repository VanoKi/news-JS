export interface NewSource {
    id: string | null;
    name: string;
}
export interface NewsArticle {
    source: NewSource;
    author: string | null;
    descriotion: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
}
export interface SourcesResponce {
    status: 'ok';
    sources: NewSource[];
}
export interface ArticlesResponce {
    status: 'ok';
    totalResults: number;
    articles: NewsArticle[];
}
