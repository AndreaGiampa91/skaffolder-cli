#!/usr/bin/env node

const prog = require("caporal");
const createCmd = require("./lib/create");
const createGeneratorCmd = require("./lib/createGenerator");
const createPageCmd = require("./lib/createPage");
const createApiCmd = require("./lib/createApi");
const createModelCmd = require("./lib/createModel");
const loginCmd = require("./lib/login");
const openCmd = require("./lib/open");
const logoutCmd = require("./lib/logout");
const reloadGeneratorCmd = require("./lib/reloadGenerator");
const saveGeneratorCmd = require("./lib/saveGenerator");
const importGeneratorCmd = require("./lib/importGenerator");
const publishGeneratorCmd = require("./lib/publishGenerator");
const generateCmd = require("./lib/generate");
const getProjectUrlCmd = require("./lib/getProjectUrl");
const setEndpointCmd = require("./lib/setEndpoint");
const getEndpointCmd = require("./lib/getEndpoint");
const getUserCmd = require("./lib/getUser");
const importDbCmd = require("./lib/importDb");
const setEnvCmd = require("./lib/setEnv");
const getEnvCmd = require("./lib/getEnv");
const exportProjectCommand = require("./lib/exportProject");
const exportUtils = require("./utils/export");
const config = require("./utils/config");
const offlineCommandBuilder = require("./lib/offline").offlineCommandBuilder;
var cache = require("persistent-cache");
var globals = cache();

const generatorBean = require("./generator/GeneratorBean");
const projectService = require("./service/projectService");
const helpers = require("./generator/Helpers");
const create = require("./utils/generator");
const generatorUtils = require("./generator/GeneratorUtils");
const offline = require("./lib/offline");
const offlineService = require("./utils/offlineService");

prog
  .version("2.0.1")

  // start
  .command("login", "Log in into Skaffolder")
  .action(loginCmd)
  .command("logout", "Log out from Skaffolder\n\n---- Create Project ----\n")
  .action(logoutCmd)

  .command("new", "Create a new Skaffolder project")
  .action(createCmd)
  .command("load generator", "Open a new generator")
  .action(createGeneratorCmd)
  .command("open", "Open a Skaffolder project")
  .argument("[id project]", "Id of the project to open", null, "")
  .argument("[id generator]", "Id of the generator to open", null, "")
  .action(openCmd)
  .command("generate", "Generate Skaffolder Template\n\n---- Manage Project ----\n")
  .option("--offline", "Work offline", null, false, false)
  .action(offlineCommandBuilder(generateCmd))
  // .action(generateCmd)

  // manage
  .command("add page", "Create a new page in Skaffolder project")
  .argument("[name]", "Name of the page", null, "")
  .option("--offline", "Work offline", null, false, false)
  .action(offlineCommandBuilder(createPageCmd))
  // .action(createPageCmd)
  .command("add model", "Create a new model in Skaffolder project")
  .argument("[name]", "Name of the model", null, "")
  .option("--offline", "Work offline", null, false, false)
  .action(offlineCommandBuilder(createModelCmd))
  .command("add api", "Create a new api in Skaffolder project\n\n---- Generator ----\n")
  .option("--offline", "Work offline", null, false, false)
  .action(offlineCommandBuilder(createApiCmd))

  // generator
  .command("generator import", "Load generator files from Skaffolder platform to local folder")
  .action(reloadGeneratorCmd)
  .command("generator export", "Save generator files from local folder to Skaffolder platform")
  .action(saveGeneratorCmd)
  .command("generator create", "Import generator files from current projectfolder")
  .action(importGeneratorCmd)
  .command("generator publish", "Share your local generator files with Skaffolder community\n\n---- Utils ----\n")
  .action(publishGeneratorCmd)

  // utils
  .command("set endpoint", "Set Skaffolder endpoint on-premise")
  .argument("[endpoint]", "", null, null)
  .action(setEndpointCmd)
  .command("get endpoint", "Get Skaffolder endpoint")
  .action(getEndpointCmd)
  .command("get user", "Get Skaffolder logged user")
  .action(getUserCmd)
  .command("get project url", "Get Skaffolder project URL")
  .action(getProjectUrlCmd)
  .command("import db", "Import database entities from Schema Spy XML")
  .argument("<file>", "XML file to import", null, null)
  .action(importDbCmd)
  .command("export", "Export project to Skaffolder platform")
  .action(exportProjectCommand);
//.option('--variant <variant>', 'Which <variant> of the template is going to be created')

prog.parse(process.argv);
// Export Typescript

exports.getGenFiles = generatorBean.getGenFiles;
exports.getTemplate = projectService.getTemplate;
exports.generate = generatorBean.generate;
exports.registerHelpers = helpers.registerHelpers;
exports.createProjectExtension = create.createProjectExtension;
exports.exportProject = exportUtils.exportProject;
exports.login = loginCmd;
exports.logout = logoutCmd;
exports.getUser = function() {
  return globals.getSync("user");
};
exports.generateFile = generatorUtils.generateFile;
exports.init = generatorUtils.init;
exports.getProperties = create.getProperties;
exports.createPage = offline.createPage;
exports.Offline = offline;
exports.setEnv = setEnvCmd;
exports.getEnv = getEnvCmd;
exports.getProjectUrlCmd = getProjectUrlCmd;
exports.getProject = config.getProject;

exports.getProjectData = offlineService.getProjectData;
exports.translateYamlProject = offlineService.translateYamlProject;
