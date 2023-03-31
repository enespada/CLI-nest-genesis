#!/usr/bin/env node
import * as shell from "shelljs";
import { Command } from "commander";
import { showHeader } from "./header/header";
import ora from "ora";
import {
  commitlint,
  hooks,
  install,
  prepare,
  runPrepare,
} from "./commands/commands";

showHeader();

const program = new Command();
shell.config.silent = true;
const spinner = ora();

program
  .command("husky <path>")
  .description("Initialize husky")
  .action((path: string) => {
    spinner.start("Instalando dependencias...");

    install(path).once("close", () => {
      spinner.succeed();
      spinner.start("Añadiendo configuración commitlint...");
      commitlint().once("close", () => {
        spinner.succeed();
        spinner.start("Editando package.json...");
        prepare().once("close", () => {
          spinner.succeed();
          spinner.start("Creando los hooks de husky...");
          runPrepare().once("close", () => {
            spinner.succeed();
            hooks(path).then(() =>
              console.log("Hooks instalados correctamente!")
            );
          });
        });
      });
    });
  });
program.parse(process.argv);
