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
  .description("Initialize husky")
  .argument("<path>", "Defines the path where to install husky")
  .action(runHuskyCommand);

kenobi
  .command("resource")
  .description("Creates a resource for specified backend path")
  .argument("<path>", "Defines the root path where to install the resource")
  .argument("<resource>", "Defines the name of the resource")
  .action(runResourceCommand);

kenobi
  .command("skeleton")
  .description(
    "A skeleton/boilerplate/starter project for quickly building RESTful APIs using NestsJS"
  )
  .argument("<path>", "Defines the path where to build the skeleton")
  .action(runSkeletonCommand);

kenobi.parse(process.argv);
