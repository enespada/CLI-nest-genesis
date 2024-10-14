import ora from "ora";
import { isProjectStructureValid } from "./commands";
import { projectArchitecture } from "../../templates/resource/project-architecture";
import * as fs from "fs";
import { join } from "path";
import { entity } from "../../templates/resource/template.entity";
import {
  createDTO,
  createPayloadDTO,
  paginationDTO,
  updateDTO,
  updatePayloadDTO,
} from "../../templates/resource/dtos";
import { controller } from "../../templates/resource/template-controller";
import { application } from "../../templates/resource/template-service";
import { infrastructure } from "../../templates/resource/template.repository.impl";
import { appModule } from "../../templates/resource/template-module";
import { domain } from "../../templates/resource/template.repository";
import { model } from "../../templates/resource/template-model";
import { mapper } from "../../templates/resource/template.mapper";

const spinner = ora();
export const runResourceCommand = (path: string, resource: string) => {
  spinner.start("Comprobando arquitectura...");
  isProjectStructureValid(path).then((valid: boolean) => {
    if (!valid) {
      return spinner.fail(
        `Arquitectura del proyecto no válida\nLa arquitectura del proyecto debe ser:\n${projectArchitecture}`
      );
    }
    spinner.succeed();

    spinner.start("Creando recursos...");

    const upperCamelCase = toCamelCase(resource, true);
    const lowerCamelCase = toCamelCase(resource);
    const filename = resource.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

    console.log("---------------------------------");

    const srcPath = `${path}/src`;
    const folders = {
      module: {
        path: join(join(srcPath, "api", filename)),
        filename: `${filename}.module.ts`,
        data: appModule(upperCamelCase, filename),
      },
      controller: {
        path: join(join(srcPath, "api", filename)),
        filename: `${filename}.controller.ts`,
        data: controller(upperCamelCase, lowerCamelCase, filename),
      },
      application: {
        path: join(join(srcPath, "application", filename)),
        filename: `${filename}.service.ts`,
        data: application(upperCamelCase, lowerCamelCase, filename),
      },
      infrastructure: {
        path: join(join(srcPath, "infrastructure", filename)),
        filename: `${filename}.repository.impl.ts`,
        data: infrastructure(upperCamelCase, lowerCamelCase, filename),
      },
      domain: {
        path: join(join(srcPath, "domain", filename)),
        filename: `${filename}.repository.ts`,
        data: domain(upperCamelCase, lowerCamelCase, filename),
      },
      // constants: {
      //   path: join(join(srcPath, "api", filename, "constants")),
      //   filename: `${filename}.constants.ts`,
      //   data: constants(entityName, filename),
      // },
      createDto: {
        path: join(join(srcPath, "application", filename, "dto")),
        filename: `create-${filename}.dto.ts`,
        data: createDTO(upperCamelCase),
      },
      createPayloadDto: {
        path: join(join(srcPath, "application", filename, "dto")),
        filename: `create-${filename}-payload.dto.ts`,
        data: createPayloadDTO(upperCamelCase),
      },
      updateDto: {
        path: join(join(srcPath, "application", filename, "dto")),
        filename: `update-${filename}.dto.ts`,
        data: updateDTO(upperCamelCase, filename),
      },
      updatePayloadDto: {
        path: join(join(srcPath, "application", filename, "dto")),
        filename: `update-${filename}-payload.dto.ts`,
        data: updatePayloadDTO(upperCamelCase),
      },
      paginationDto: {
        path: join(join(srcPath, "application", filename, "dto")),
        filename: `${filename}-pagination-options.dto.ts`,
        data: paginationDTO(upperCamelCase, filename),
      },
      models: {
        path: join(join(srcPath, "domain", filename, "models")),
        filename: `${filename}.model.ts`,
        data: model(upperCamelCase, filename),
      },
      entities: {
        path: join(join(srcPath, "infrastructure", filename, "entities")),
        filename: `${filename}.entity.ts`,
        data: entity(upperCamelCase),
      },
      mappers: {
        path: join(join(srcPath, "infrastructure", filename, "mappers")),
        filename: `${filename}.mapper.ts`,
        data: mapper(upperCamelCase, lowerCamelCase, filename),
      },
    };
    const values = Object.values(folders);

    mkdir(values.map((f) => f.path)).then(() => {
      write(values).then(() => {
        addImportToAppModule(path, upperCamelCase);
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
        fs.writeFile(join(f.path, f.filename), f.data, (err) => {
          if (err) reject(err);
          resolve();
        });
      });
    })
  );
};

export const toCamelCase = (input: string, capitalize = false) => {
  return input
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0)[capitalize ? "toUpperCase" : "toLowerCase"]() +
        word.slice(1)
    )
    .join("");
};

export const addImportToAppModule = (
  path: string,
  moduleName: string | undefined
) => {
  if (!moduleName) {
    console.error("Please provide a module name.");
    process.exit(1);
  }

  const appModulePath = join(path, "src/app.module.ts");
  const moduleImportPath = `@controller/${moduleName.toLowerCase()}/${moduleName.toLowerCase()}.module`;

  fs.readFile(appModulePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading AppModule file:", err);
      process.exit(1);
    }

    const importStatement = `import { ${moduleName}Module } from '${moduleImportPath}';\n`;
    const moduleDeclaration = `    ${moduleName}Module,`;

    // Check for specific lines and add after them
    const configModuleRegex =
      /ConfigModule\.forRoot\({[^]*?}\),\n    TypeOrmModule\.forRootAsync\({[^]*?}\),/;
    let updatedData;
    if (configModuleRegex.test(data)) {
      updatedData = data.replace(
        configModuleRegex,
        (match) => `${match}\n${moduleDeclaration}`
      );
    } else {
      // Add as the first import if specific lines not found
      updatedData = data.replace(
        /(imports: \[)([^]*?)(\])/,
        `$1\n${moduleDeclaration}$2$3`
      );
    }

    // Add the import statement at the top
    const newData = importStatement + updatedData;

    fs.writeFile(appModulePath, newData, "utf8", (err) => {
      if (err) {
        console.error("Error writing to AppModule file:", err);
        process.exit(1);
      }

      console.log(`${moduleName}Module has been added to AppModule imports.`);
    });
  });
};
