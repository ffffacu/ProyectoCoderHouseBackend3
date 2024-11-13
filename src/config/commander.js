import {Command} from  "commander";

export const program = new Command();

program
    .option("-d","Variable para debug", false)
    .option("-p <port>","Puerto del servidor", 3000)
    .option("-m <mode>","Modo de ejecucion", "development")
    .requiredOption("-i <user>","Usuario de aplicativo", "No se declara usuario")
program.parse();