export const model = (
  capitalized: string,
  lowercased: string
) => `export class ${capitalized} {
  constructor(
    public id: string,
  ) {
    this.id = id;
  }
}
`;
