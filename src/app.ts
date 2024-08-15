import { client } from './client/Clinet';
import secret from './client/Config/secert';
import dbTemp from './databases/All/collector';

async function main() {
  const prefetch = await dbTemp();
  const discord = new client(secret, prefetch)
  discord.start()
  process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
  });
}
main();