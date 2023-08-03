import { HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigService } from "./config/config.service";

const configServiceMock = {
  getPath: jest.fn().mockReturnValue({ path: "Your mock path" }),
};

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn().mockReturnValue("hola"), // Mock del método getHello de AppService
          },
        },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  describe("First test", () => {
    it("should return OK", async () => {
      const result = await appController.getHello();
      expect(result.status).toBe(HttpStatus.OK);
      expect(result.message).toBe("hola");
    });
  });
});
