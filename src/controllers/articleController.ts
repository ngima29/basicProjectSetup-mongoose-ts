import { Request, Response } from "express";
import { ArticleService } from "../services";
import { successResponseData, errorResponse } from "../utils";
import { SortEnum } from '../enums';
import { defaultOrder, defaultSort, pgMinLimit } from '../config'
export class ArticleController {
  constructor() { }

  static async create(req: Request, res: Response, imagePath?: string): Promise<void> {
    const data = req.body;
    if (imagePath) {
      data.image = imagePath;
    }
    try {
      const result = await new ArticleService().create(data);
      return successResponseData({ data: result, message: "Article data is created.", res });
    } catch (error: any) {
      console.error("Error creating Article:", error.message);
      return errorResponse({ errorMessage: error, res, statusCode: 400 });
    }
  };

  static async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updates = req.body;

    try {
      const updated = await new ArticleService().update(id, updates);
      if (updated) {
        return successResponseData({ data: updated, message: "Article data is updated.", res });
      }
    } catch (error: any) {
      console.error("Error updating Article:", error.message);
      return errorResponse({ errorMessage: error, res, statusCode: 404 });
    }
  }

  static async remove(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const isDeleted = await new ArticleService().delete(id);
      if (isDeleted) {
        return successResponseData({ message: "Article data is deleted.", res });
      }
    } catch (error: any) {
      console.error("Error deleting Article:", error.message);
      return errorResponse({ errorMessage: error, res, statusCode: 404 });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const data = await new ArticleService().getById(id);
      if (data) {
        return successResponseData({ data, message: "Article data found.", res });
      }
    } catch (error: any) {
      console.error("Error getting Article by ID:", error.message);
      return errorResponse({ errorMessage: error, res, statusCode: 404 });
    }
  }

  static async findAll(req: Request, res: Response): Promise<void> {
    let { offset, limit, sort, order, title, author, query, tags } = req.query;
   
    sort = sort || defaultSort;
    query = query ? query.toString() : undefined;
    order = order ? order.toString() : defaultOrder.toString();
    tags = tags ? tags.toString() : undefined;
    author = author ? author.toString() : undefined;
    title = title ? title.toString() : undefined
    const validatedSort: SortEnum = sort as SortEnum;
    const parsedOffset = offset ? parseInt(offset as string) : 0;
    const parsedLimit = limit ? parseInt(limit as string) : pgMinLimit;

    try {
      const result = await new ArticleService().findAndCountAll({
        offset:parsedOffset,
        limit:parsedLimit,
        sort: validatedSort,
        order,
        author,
        query,
        title,
        tags,
      });

      return successResponseData({ data: result, message: "All Articles retrieved.", res });
    } catch (error: any) {
      console.error("Error getting all Articles:", error.message);
      return errorResponse({ errorMessage: error, res, statusCode: 400 });
    }
  }
}
