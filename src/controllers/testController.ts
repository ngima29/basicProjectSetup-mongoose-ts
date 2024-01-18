import { Request, Response } from "express";
import { TestService } from "../services";
import { successResponseData, errorResponse } from "../utils";


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

}
