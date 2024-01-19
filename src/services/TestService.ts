import { InputeTestInterface, TestInterface, PaginationMetadata, ArgsTestInterface } from '../interfaces';
import { MongooseQueryGenerator } from '../helpers';
import { timezone } from '../config';
import { TestModel } from '../models'
import speakeasy from 'speakeasy';
import moment from 'moment';
import QRCode from 'qrcode';
import momenttz from 'moment-timezone';
export class TestService {
  async create(input: InputeTestInterface): Promise<TestInterface> {
    let date = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log("create date in server", date)
    try {
      const data = await TestModel.findOne({})
      //    console.log("data",data)
      if (!data) throw new Error(`Employee not found or already deleted`);
      if (input.otp) {
        const verified = speakeasy.totp.verify({
          secret: data.secret,
          encoding: 'base32',
          token: input.otp,
          window: 2
        });
        if (!verified) throw new Error(`Invalid OTP for clock-in!!!`);
        console.log("verified", verified)
      }

      let inputDate = momenttz().tz(timezone);
      input.time = inputDate.format('h:mm:ss a');
      input.date = inputDate.format('YYYY-MM-DD');
      const created = await TestModel.create(input);
      return created;
    } catch (error: any) {
      throw error;
    }
  }
  async getMyQR(): Promise<any> {

    let localTime = momenttz().tz(timezone).format('YYYY-MM-DDTH:mm:ha');
    console.log("QR  genareta local date", localTime)
    const userData = {
      name: "Hiup Solution",
      length: 28,
      localTime,
    };
    const newSecretWithUserData: any = speakeasy.generateSecret(userData);

    try {
      //  await TestModel.create({ secret: newSecretWithUserData.base32 })
      await TestModel.updateMany({ uid: '555' }, { secret: newSecretWithUserData.base32 });

      const data = await QRCode.toDataURL(newSecretWithUserData.otpauth_url);
      return data;
    } catch (error) {
      throw new Error('Error updating or creating document and generating QR code');
    }

  }

  async findAndCountAll({
    page,
    limit,
    query,
    sort,
    order,
  }: ArgsTestInterface): Promise<{ metadata: PaginationMetadata; data: { count: number; rows: TestInterface[] } }> {
    try {
      if (isNaN(page) || isNaN(limit)) {
        throw new Error('Invalid page or limit');
      }
      const skip = Math.max((page - 1), 0) * limit;
      const queryGenerator = MongooseQueryGenerator;
      const filter = [];

      if (query) {
        filter.push(...queryGenerator.searchRegex({ query, fields: ['title'] }));
      }



      const count = filter.length > 0
        ? await TestModel.countDocuments({ $and: filter, deletedAt: null }).select('-deletedAt')
        : await TestModel.countDocuments({ deletedAt: null }).select('-deletedAt');

      const articles = filter.length > 0
        ? await TestModel.find({ $and: filter, deletedAt: null }).select('-deletedAt')
          .skip(skip)
          .limit(limit)
          .sort({ [sort]: order === 'desc' ? -1 : 1 })
        : await TestModel.find({ deletedAt: null }).select('-deletedAt')
          .skip(skip)
          .limit(limit)
          .sort({ [sort]: order === 'asc' ? -1 : 1 });

      const metadata: PaginationMetadata = {
        previousPage: page > 0 ? page - 1 : null,
        currentPage: page,
        nextPage: skip + articles.length < count ? page + 1 : null,
        perPage: limit,
      };

      return { metadata, data: { count, rows: articles } };
    } catch (error: any) {
      throw error;
    }
  }

}