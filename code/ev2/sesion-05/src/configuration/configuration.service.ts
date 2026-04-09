import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
    public getAWSCredentials() {
        return {
            accessKeyId: '123123',
            secretAccessKey: '123123',
        };
    }
}
