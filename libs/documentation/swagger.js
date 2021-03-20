const merge = require('@alexlafroscia/yaml-merge');
const swaggerUi = require('swagger-ui-express');
const glob = require('glob');
const YAML = require('yamljs');

const { writeFile } = require('fs/promises');
const resolve = require('path').resolve;

const swaggerUIOptions = {
  explorer: true,
  swaggerOptions: {
    validatorUrl: null
  }
};

const UISetup = async apiRouter => {
  const indexDocumentation = resolve(
    `${global.ROOT_DIRNAME}/documentation/index.yaml`
  );

  const documentationPathFiles = glob.sync(
    `${global.ROOT_DIRNAME}/src/entities/**/*.yaml`
  );

  const paths = [indexDocumentation, ...documentationPathFiles];

  const joinContent = merge(...paths);

  const outputPath = './documentation/output.yaml';
  await writeFile(outputPath, joinContent);

  apiRouter.use(swaggerUi.serve);

  const documentationFile = YAML.load(outputPath);

  const controller = swaggerUi.setup(documentationFile, swaggerUIOptions);

  //apiRouter.get('/', controller);

  apiRouter.get('/', (request, response) => {
    response.redirect(
      'https://app.swaggerhub.com/apis/01speed1/vendor-api_documentation/v1.0'
    );
  });
};

module.exports = { UISetup };
