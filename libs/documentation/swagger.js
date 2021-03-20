const merge = require('@alexlafroscia/yaml-merge');
const swaggerUi = require('swagger-ui-express');
const glob = require('glob');
const YAML = require('yamljs');

const { writeFile } = require('fs/promises');
const resolve = require('path').resolve;

const UISetup = async apiRouter => {
  const indexDocumentation = resolve(
    `${global.ROOT_DIRNAME}/documentation/index.yaml`
  );

  const documentationPathFiles = glob.sync(
    `${global.ROOT_DIRNAME}/src/entities/**/*.yaml`
  );

  const paths = [indexDocumentation, ...documentationPathFiles];

  const joinContent = merge(...paths);

  const outputPath = './output.yaml';
  await writeFile(outputPath, joinContent);

  apiRouter.use(swaggerUi.serve);

  const documentationFile = YAML.load('./output.yaml');

  const controller = swaggerUi.setup(documentationFile);

  apiRouter.get('/', controller);
};

module.exports = { UISetup };
