export type IDependencyMap = Map<string, string>;

export type IModule = {
  id: string;
  code: string;
  content: string;
  dependencyMap: IDependencyMap;
};

export type IConfig = {
  externals?: Record<string, string>;
};
