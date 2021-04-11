async function splitConsole () {
  const com = await import('./common')
  com();
}
splitConsole();

console.log('a');