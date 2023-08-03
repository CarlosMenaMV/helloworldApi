import { BadRequestException, Injectable } from "@nestjs/common";
import * as csvParser from "csv-parser";
import * as fs from "fs";
import { ConfigService } from "./config/config.service";

class Person {
  name: string;
  age: string;
}

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}

  async getHello() {
    const rows = (await this.readCSV()) as Person[];
    if (rows.length === 0) return "<h1>No hay personas para saludar :(</h1>";
    let message = "<h1>¡Hola!Aquí tienes la lista de personas:</h1>";

    rows.forEach((row: Person) => {
      message += `</br>- Nombre: ${row.name}, Edad: ${row.age}\n`;
    });
    return message;
  }

  async readCSV() {
    return new Promise((resolve, reject) => {
      const results = [];
      const stream = fs.createReadStream(this.config.getPath().path);
      stream
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results));

      stream.on("error", (error: any) => {
        resolve([]);
      });
    });
  }
}
