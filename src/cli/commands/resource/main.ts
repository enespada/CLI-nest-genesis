import ora from "ora";
import { isProjectStructureValid } from "./commands";
import { projectArchitecture } from "../../templates/resource/project-architecture";
import * as fs from "fs";
import { join } from "path";
import { constants } from "../../templates/resource/constants";
import { entity } from "../../templates/resource/entity";
import {
  createDto,
  paginationDto,
  updateDto,
} from "../../templates/resource/dtos";
import { controller } from "../../templates/resource/controller";
import { application } from "../../templates/resource/application";
import { domain } from "../../templates/resource/domain";

const spinner = ora();
export const runResourceCommand = (
  path: string,
  resource: string,
  plural: string
) => {
  spinner.start("Comprobando arquitectura...");
  isProjectStructureValid(path).then((valid: boolean) => {
    if (!valid)
      return spinner.fail(
        `Arquitectura del proyecto no válida\nLa arquitectura del proyecto debe ser:\n${projectArchitecture}`
      );
    spinner.succeed();

    spinner.start("Creando recursos...");

    const entityName = resource.charAt(0).toUpperCase() + resource.slice(1);

    const srcPath = `${path}/src/app`;
    const folders = [
      join(srcPath, "api", plural),
      join(srcPath, "api", plural, "constants"),
      join(srcPath, "api", plural, "dto"),
      join(srcPath, "api", plural, "entities"),
      join(srcPath, "application", plural),
      join(srcPath, "domain", plural),
    ];

    // Constants File
    const constantsData = constants
      .replace(/\[entity\]/g, entityName)
      .replace(/\[filename\]/g, plural);
    const constantsPathData = {
      path: join(srcPath, "api", plural, "constants", `${plural}.constants.ts`),
      data: constantsData,
    };

    // Entity File
    const entityData = entity.replace(/\[entity\]/g, entityName);
    const entityPathData = {
      path: join(srcPath, "api", plural, "entities", `${plural}.entity.ts`),
      data: entityData,
    };

    // Create Dto File
    const createDtoData = createDto.replace(/\[entity\]/g, entityName);
    const createDtoPathData = {
      path: join(srcPath, "api", plural, "dto", `create-${plural}.dto.ts`),
      data: createDtoData,
    };

    // Update Dto File
    const updateDtoData = updateDto.replace(/\[entity\]/g, entityName);
    const updateDtoPathData = {
      path: join(srcPath, "api", plural, "dto", `update-${plural}.dto.ts`),
      data: updateDtoData,
    };

    // Pagination Dto File
    const paginationDtoData = paginationDto
      .replace(/\[entity\]/g, entityName)
      .replace(/\[filename\]/g, plural);
    const paginationDtoPathData = {
      path: join(
        srcPath,
        "api",
        plural,
        "dto",
        `${plural}-pagination-options.dto.ts`
      ),
      data: paginationDtoData,
    };

    // Controller File
    const controllerDtoData = controller
      .replace(/\[entity\]/g, entityName)
      .replace(/\[filename\]/g, plural);
    const controllerDtoPathData = {
      path: join(srcPath, "api", plural, `${plural}.controller.ts`),
      data: controllerDtoData,
    };

    // Application File
    const applicationData = application
      .replace(/\[entity\]/g, entityName)
      .replace(/\[filename\]/g, plural);
    const applicationPathData = {
      path: join(srcPath, "application", plural, `${plural}.service.ts`),
      data: applicationData,
    };

    // Domain File
    const domainData = domain
      .replace(/\[entity\]/g, entityName)
      .replace(/\[filename\]/g, plural);
    const domainPathData = {
      path: join(srcPath, "domain", plural, `${plural}.domain.ts`),
      data: domainData,
    };

    mkdir(folders).then(() => {
      write([
        constantsPathData,
        entityPathData,
        createDtoPathData,
        updateDtoPathData,
        paginationDtoPathData,
        controllerDtoPathData,
        applicationPathData,
        domainPathData,
      ]).then(() => {
        spinner.succeed();
        console.log("Recursos creados correctamente!");
      });
    });
  });
};

export const mkdir = async (paths: Array<string>) => {
  return Promise.all(
    paths.map((p) => {
      return new Promise<void>((resolve, reject) => {
        fs.mkdir(p, { recursive: true }, (err: NodeJS.ErrnoException) => {
          if (err) reject(err);
          resolve();
        });
      });
    })
  );
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
