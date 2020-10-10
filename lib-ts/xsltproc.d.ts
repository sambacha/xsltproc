/// <reference types="node" />
declare module "lib/xsltproc" {
    export function transform(stylesheet: any, file: any, options: any): import("child_process").ChildProcess | undefined;
    export function getArgs(options: any): any[];
}
declare module "test/xsltproc_test" {
    export {};
}
