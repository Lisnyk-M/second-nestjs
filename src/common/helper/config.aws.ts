import { get } from '@nestled/config/lib/validate';

export function appConfig() {
    return {
        accessKeyId: get('accessKeyId').asString(),
        secretAccessKey: get('secretAccessKey').asString(),
        REGION: get('REGION').asString(),
        BUCKET_S3: get('BUCKET_S3').asString(),
    };
}