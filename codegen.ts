import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // schema:  process.env.GRAPHQL || 'http://localhost:8080/graphql',
  schema:  process.env.NEXT_PUBLIC_GRAPHQL,
  documents: ['./app/**/*.tsx', './graphql/**/*.ts', './app/**'],
  generates: {
    './@types/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;