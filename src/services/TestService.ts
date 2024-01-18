import {InputeTestInterface, TestInterface } from '../interfaces';
import {TestModel} from '../models'
import speakeasy from 'speakeasy';
import moment from 'moment';
import QRCode from 'qrcode';
export class TestService {
    async create(input: InputeTestInterface): Promise<TestInterface> {
        try {
          const data = await TestModel.findOne({})
          console.log("data",data)
          if (!data) throw new Error(`Employee not found or already deleted`);
          if (input.otp) {
            const verified = speakeasy.totp.verify({
              secret: data.secret,
              encoding: 'base32',
              token: input.otp,
              window: 2
            });
            if (!verified) throw new Error(`Invalid OTP for clock-in!!!`);
            console.log("verified",verified)
           }
            const inputDate = moment();
            input.time = inputDate.format('h:mm:ss a');
            input.date = inputDate.format('YYYY-MM-DD');
     
          const created = await TestModel.create(input);
          return created;
        } catch (error: any) {
          throw error;
        }
      }
async getMyQR(): Promise<any> {
        const newSecret:any = speakeasy.generateSecret({ name: "Hiup Solution", length: 28 });
        try {
          await TestModel.create({ secret: newSecret.base32 });
          const data = await QRCode.toDataURL(newSecret.otpauth_url);
          return data;
        } catch (error) {
          throw new Error('Error updating or creating document and generating QR code');
        }
    
      } 
    
}