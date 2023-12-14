import * as dotenv from 'dotenv';
import { EnvironmentEnum, SortEnum } from "../enums";
dotenv.config();

/**
 * Your favorite port
 */
export const port = parseInt(process.env.PORT!) as number,

  /**
   * Application mode (Set the environment to 'development' by default)
   */
  environment = process.env.ENVIRONMENT! as EnvironmentEnum,

  /**
  * HOST URL
  */
  hostUrl = process.env.HOST_URL as string,

  /**
   * Database Connection
   */

  url = process.env.DB_URL,

  /** Pagination */
  pgMinLimit = 10,
  pgMaxLimit = 100,
  defaultOffset = 1,
  defaultLimit = 10,
  defaultPage = 1,

  /** Order */
  defaultOrder = 'createdAt',
  defaultSort = SortEnum.desc

export * from './instance';

