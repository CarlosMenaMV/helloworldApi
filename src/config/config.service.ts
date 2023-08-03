export class ConfigService {
  getPath(): { path: string } {
    return {
      path: process.env.CSV_PATH,
    };
  }
}
