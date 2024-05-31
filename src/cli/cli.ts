#!/usr/bin/env node
import * as shell from "shelljs";
import { Command } from "commander";
import { showHeader } from "./header/header";
import { runHuskyCommand } from "./commands/husky/main";
import { version, description } from "../../package.json";
import { runResourceCommand } from "./commands/resource/main";
import { runSkeletonCommand } from "./commands/skeleton/main";

showHeader();

const kenobi = new Command("kenobi");
shell.config.silent = true;

kenobi.description(description).version(version);

kenobi
  .command("husky")
  .description("Inicializar husky")
  .argument("<path>", "Define la ruta donde instalar husky")
  .action(runHuskyCommand);

kenobi
  .command("resource")
  .description("Crea un recurso para la ruta de back-end especificada")
  .argument("<path>", "Define la ruta raíz donde instalar el recurso")
  .argument("<resource>", "Define el nombre del recurso (usa el plural)")
  .action(runResourceCommand);

kenobi
  .command("skeleton")
  .description(
    "Un proyecto de esqueleto/boilerplate/iniciador para construir rápidamente API RESTful usando NestJS"
  )
  .argument("<path>", "Define la ruta donde construir el esqueleto")
  .action(runSkeletonCommand);

kenobi.parse(process.argv);
