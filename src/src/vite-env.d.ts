// Manually declare process.env since vite/client types are not resolving in this environment
declare const process: {
  env: {
    API_KEY?: string;
    [key: string]: string | undefined;
  }
};
