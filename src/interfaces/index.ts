export interface MainDataInterface {
   statusCode: number;
   currentPage: number;
   maxPage: number;
   list: [
      {
         url: string;
         slug: string;
         title: string;
         poster: string;
         star: string;
         episode?: string;
         type?: string;
      }
   ];
   error?: any;
   message?: any;
}

export interface AnimeDetailsInterface {
   statusCode: number;
   url: string;
   slugPlayer: string;
   title: string;
   poster: string;
   description: string;
   currentTotalEpisodes: number;
   totalEpisodes: number | string;
   genres: string[];
   detailsList: [
      {
         subTitle: string;
         title: any;
      }
   ];
   error?: any;
   message?: any;
}

export interface GenreListInterface {
   statusCode: number;
   list: [
      {
         url: string;
         slug: string;
         title: string;
      }
   ];
   error?: any;
   message?: any;
}

interface StreamingList {
   url: string;
   quality: string;
   server: string;
}

export interface StreamingInterface {
   statusCode: number;
   url: string;
   title: string;
   description: string;
   poster: string;
   currentEpisodes?: number;
   currentTotalEpisodes?: number;
   status: string;
   year: number;
   type: string;
   videoPlayer: StreamingList[];
   downloadLink: StreamingList[];
   error?: any;
   message?: any;
}
