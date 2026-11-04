export enum NewsEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export interface NewsSource {
    id: string | null;
    name: string;
}
export interface NewsArticle {
    source: NewsSource;
    title: string;
    author: string | null;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
}
export interface SourcesResponse {
    status: 'ok';
    sources: NewsSource[];
}
export interface ArticlesResponse {
    status: 'ok';
    totalResults: number;
    articles: NewsArticle[];
}
export interface NewsApiError {
    status: 'error';
    code: string;
    message: string;
}
export type NewsApiResponse = SourcesResponse | ArticlesResponse | NewsApiError;
