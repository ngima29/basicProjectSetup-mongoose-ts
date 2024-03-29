import { Request, Response } from "express";
import { TestService } from "../services";
import { successResponseData, errorResponse } from "../utils";
import { SortEnum } from '../enums';
import { defaultOrder, defaultSort, pgMinLimit, defaultPage } from '../config'
import moment from 'moment';

export class TestController {
  constructor() { }

  static async create(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
      const result = await new TestService().create(data);
      return successResponseData({ data: result, message: "Test data is created.", res });
    } catch (error: any) {
      console.error("Error creating test:", error.message);
      return errorResponse({ errorMessage: error, res, statusCode: 400 });
    }
  };

  static async getMyQR(req: Request, res: Response): Promise<void> {
    try {
      const data = await new TestService().getMyQR();
      if (data) {
        return successResponseData({ data, message: "test data found.", res });
      }
    } catch (error: any) {
      console.error("Error getting test QR:", error.message);
      return errorResponse({ errorMessage: error, res, statusCode: 404 });
    }
  }

  static async findAll(req: Request, res: Response): Promise<void> {
    let { limit, sort, order, query,page } = req.query;
    sort = sort || defaultSort;
    query = query ? query.toString() : undefined;
    order = order ? order.toString() : defaultOrder.toString();
    const validatedSort: SortEnum = sort as SortEnum;
    const parsedLimit = limit ? parseInt(limit as string) : pgMinLimit;
    const parsedPage = page ? parseInt(page as string) : defaultPage

    try {
      const result = await new TestService().findAndCountAll({
        limit: parsedLimit,
        page: parsedPage,
        sort: validatedSort,
        order,
      });

      return successResponseData({ data: result.data, metadata: result.metadata, message: "All Articles retrieved.", res });
    } catch (error: any) {
      console.error("Error getting all Articles:", error.message);
      return errorResponse({ errorMessage: error, res, statusCode: 400 });
    }
  }
}
