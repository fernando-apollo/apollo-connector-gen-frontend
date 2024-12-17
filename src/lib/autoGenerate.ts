const INDENT_SPACING = '  ';

// valid graphql identifier characters
const NON_IDENTIFIER_CHARS = /[^a-zA-Z0-9_]/g;
// regular expression for graphql identifiers
const IDENTIFIER = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
// snake_case characters
const snakeToCamelCase = (key: string) =>
  key.replace(/[_-]([a-z])/g, (_, a) => a.toUpperCase());

export function autoGenerateMapping(input: string): string {
  try {
    const inputAsJsonObject = JSON.parse(input);
    const selection = recursivelyBuildSelection(inputAsJsonObject);
    return printSelection(selection ?? {});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
    return '';
  }
}

type Selection = Record<
  string,
  {
    alias?: string;
    children?: Selection;
  }
>;

function recursivelyBuildSelection(input: unknown): Selection | null {
  if (Array.isArray(input)) {
    return input
      .map((value) => recursivelyBuildSelection(value))
      .reduce(
        (acc, selection) => ({
          ...acc,
          ...selection,
        }),
        {},
      );
  } else if (input && typeof input === 'object') {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => {
        if (!IDENTIFIER.test(key)) {
          const alias = snakeToCamelCase(key).replace(NON_IDENTIFIER_CHARS, '');
          const children = recursivelyBuildSelection(value);
          return [
            `'${key}'`,
            {
              alias,
              ...(children ? { children } : {}),
            },
          ];
        } else {
          const alias = key.includes('_') ? snakeToCamelCase(key) : null;
          const children = recursivelyBuildSelection(value);
          return [
            key,
            {
              ...(alias ? { alias } : {}),
              ...(children ? { children } : {}),
            },
          ];
        }
      }),
    );
  } else {
    return null;
  }
}

function printSelection(selection: Selection, indent: string = ''): string {
  return Object.entries(selection)
    .map(([key, value]) => {
      const keyWithAlias = value.alias ? `${value.alias}: ${key}` : key;
      const children = 'children' in value ? (value.children ?? {}) : {};

      if (Object.keys(children).length > 0) {
        return [
          `${indent}${keyWithAlias} {`,
          printSelection(children, indent + INDENT_SPACING),
          `${indent}}`,
        ].join('\n');
      } else {
        return `${indent}${keyWithAlias}`;
      }
    })
    .join('\n');
}
