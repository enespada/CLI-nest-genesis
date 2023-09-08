import ora from "ora";
import { projectArchitecture } from "../../templates/skeleton/project-architecture";
import chalk from "chalk";
import { clone } from "./commands";
import * as fs from "fs";
import { env } from "../../templates/skeleton/env";

const spinner = ora();
export const runSkeletonCommand = (path: string) => {
  spinner.start("Generando arquitectura...");

  clone(path).once("close", () => {
    spinner.succeed("Arquitectura generada correctamente!");
    spinner.start("Creando archivo de entorno...");

    write([
      {
        path: `${path}/.env`,
        data: env,
      },
    ]).then(() => {
      spinner.succeed("Archivo de entorno creado correctamente!");
      console.log(
        `Arquitectura generada en ${chalk.bold.whiteBright(
          path
        )}\nLa arquitectura generada tendrá la siguiente estructura:\n${projectArchitecture}`
      );
    });
  });
};

export const write = async (files: Array<any>) => {
  return Promise.all(
    files.map((f) => {
      return new Promise<void>((resolve, reject) => {
        fs.writeFile(f.path, f.data, (err) => {
          if (err) reject(err);
          resolve();
        });
      });
    })
  );
};
