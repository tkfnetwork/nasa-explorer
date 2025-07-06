export const factory = (
  /** @type {import('plop').NodePlopAPI} */
  plop
) =>
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: '_templates/Component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/{{pascalCase name}}/{{pascalCase name}}.module.css',
        templateFile: '_templates/Component/Component.module.css.hbs',
      },
      {
        type: 'add',
        path: 'src/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: '_templates/Component/Component.test.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: '_templates/Component/Component.stories.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/{{pascalCase name}}/{{pascalCase name}}.types.ts',
        templateFile: '_templates/Component/Component.types.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/{{pascalCase name}}/index.ts',
        templateFile: '_templates/Component/index.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/index.ts',
        template: "export * from './{{pascalCase name}}'",
      },
    ],
  });
