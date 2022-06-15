interface Config {
  API_URL: string;
}

const keys = ['NEXT_PUBLIC_API_URL'];

keys.forEach((el) => {
  if (process.env[el] === null) {
    throw new Error(`Missing required key ${el}`);
  }
});

const config: Config = {
  API_URL: process.env['NEXT_PUBLIC_API_URL']!,
};

export default config;
