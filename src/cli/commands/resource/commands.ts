import * as fs from "fs";

export const isProjectStructureValid = async (
  path: string
): Promise<boolean> => {
  const apiPath = `${path}/src/app/api`;
  const applicationPath = `${path}/src/app/application`;
  const domainPath = `${path}/src/app/domain`;

  // Utilizamos fs.promises para realizar las comprobaciones de forma asíncrona
  const [apiExists, applicationExists, domainExists] = await Promise.all([
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
  ]);

  // Devolvemos true si todas las carpetas existen, false en caso contrario
  return apiExists && applicationExists && domainExists;
};
