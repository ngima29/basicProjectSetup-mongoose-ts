import { ModelTimestampExtend,PaginationOrderSearchExtend } from ".";
import { Types,Document } from 'mongoose';


export interface InputeArticleInterface {
    title: string;
    slug?: string;
    image?: string;
    author: string;
    content: string;
    publishDate: Date;
    tags: string[];
  }

export interface ArticleInterface extends Document, ModelTimestampExtend,InputeArticleInterface {
  _id: Types.ObjectId; 
}

export interface ArgsArticleInterface extends PaginationOrderSearchExtend {
  tags? : string;
  title?: string;
  author?: string;
}