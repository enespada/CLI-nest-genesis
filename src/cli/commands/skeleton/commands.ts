import * as fs from "fs";
import * as shell from "shelljs";

export const isProjectStructureValid = async (
  path: string
): Promise<boolean> => {
  const apiPath = `${path}/src/api`;
  const applicationPath = `${path}/src/application`;
  const domainPath = `${path}/src/domain`;
  const infrastructurePath = `${path}/src/infrastructure`;

  // Utilizamos fs.promises para realizar las comprobaciones de forma asíncrona
  const [apiExists, applicationExists, domainExists, infrastructureExists] =
    await Promise.all([
      fs.promises
        .stat(apiPath)
        .then((stats) => stats.isDirectory())
        .catch(() => false),
      fs.promises
        .stat(applicationPath)
        .then((stats) => stats.isDirectory())
        .catch(() => false),
      fs.promises
        .stat(domainPath)
        .then((stats) => stats.isDirectory())
        .catch(() => false),
      fs.promises
        .stat(infrastructurePath)
        .then((stats) => stats.isDirectory())
        .catch(() => false),
    ]);

  // Devolvemos true si todas las carpetas existen, false en caso contrario
  return apiExists && applicationExists && domainExists && infrastructureExists;
};

export const clone = (path: string) => {
  return shell
    .cd(path)
    .exec(
      `git clone https://github.com/enespada/nest-architecture.git ${path}`,
      {
        async: true,
      }
    );
};
