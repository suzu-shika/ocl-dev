// SDK利用準備
// import type { arrayOutputType } from "astro:schema";
import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  // MicroCMSListResponse,
  MicroCMSImage,
  // MicroCMSListContent,
} from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// ImageField
// 型定義
export type ImageField = {
  url: string;
  width: string;
  height: string;
};

// news
// 型定義
export type News = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  url: string;
  thumbnail?: MicroCMSImage;
  thumbnailAlt: string;
  category: string[];
};
export type NewsResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: News[];
};

// APIの呼び出し
// 全ブログ記事取得
export const getNews = async (queries?: MicroCMSQueries) => {
  return await client.get<NewsResponse>({ endpoint: "news", queries });
};

// 100件以上の全件取得（ページネーションで複数回リクエスト）
export const getAllNews = async (queries?: MicroCMSQueries): Promise<NewsResponse> => {
  const limit = 100;
  let offset = 0;
  let allContents: News[] = [];
  let totalCount = 0;

  do {
    const res = await client.get<NewsResponse>({
      endpoint: "news",
      queries: {
        ...queries,
        limit,
        offset,
      },
    });

    allContents = allContents.concat(res.contents);
    totalCount = res.totalCount;
    offset += limit;
  } while (offset < totalCount);

  return {
    totalCount,
    offset: 0,
    limit: allContents.length,
    contents: allContents,
  };
};

// 特定のブログ記事取得
export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
  });
};
