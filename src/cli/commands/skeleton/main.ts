import ora from "ora";
import * as fs from "fs";
import { Extract } from "unzipper";
import { projectArchitecture } from "../../templates/skeleton/project-architecture";
import chalk from "chalk";
import { join } from "path";

const spinner = ora();
export const runSkeletonCommand = (path: string) => {
  spinner.start("Copiando arquitectura...");

  console.log("__dirname", __dirname);

  fs.copyFile(
    join(
      __dirname,
      "..",
      "..",
      "templates/skeleton/architecture/architecture.zip"
    ),
    `${path}/architecture.zip`,
    (err) => {
      if (err) return spinner.fail(`Error inesperado:\n${err.message}`);
      spinner.succeed();
      spinner.start("Generando recursos...");
      const readStream = fs.createReadStream(`${path}/architecture.zip`);
      readStream
        .pipe(Extract({ path }))
        .on("close", () => {
          spinner.succeed();
          spinner.start("Limpiando...");
          fs.rm(`${path}/architecture.zip`, () => {
            spinner.succeed();
            console.log(
              `Arquitectura generada en ${chalk.bold.whiteBright(
                path
              )}\nLa arquitectura generada tendrá la siguiente estructura:\n${projectArchitecture}`
            );
          });
        })
        .on("error", (err) => {
          spinner.fail(`Error inesperado:\n${err.message}`);
        });
    }
  );
};
