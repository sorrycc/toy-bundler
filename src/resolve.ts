import { IModule } from "./types";

export function resolve(opts: {
  module: IModule;
  dependencyName: string;
}) {
  return opts.dependencyName;
}
