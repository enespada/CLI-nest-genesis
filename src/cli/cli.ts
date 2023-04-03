#!/usr/bin/env node
import * as shell from "shelljs";
import { Command } from "commander";
import { showHeader } from "./header/header";
import { runHuskyCommand } from "./commands/husky/main";
import { version, description } from "../../package.json";
import { runBackendCommand } from "./commands/backend/main";

showHeader();

const kenobi = new Command("kenobi");
shell.config.silent = true;

kenobi.description(description).version(version);

kenobi
  .command("husky")
  .description("Initialize husky")
  .argument("<path>", "Defines the path where to install husky")
  .action(runHuskyCommand);

kenobi
  .command("backend")
  .description("Creates a resource for specified backend path")
  .argument("<path>", "Defines the path where to install the resource")
  .argument("<resource>", "Defines the name of the resource")
  .action(runBackendCommand);

kenobi.parse(process.argv);
