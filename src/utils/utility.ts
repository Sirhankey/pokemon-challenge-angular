export function getRandomElements<T>(arr:T[], num:number):T[] {
  const suffled = arr.sort(()=> 0.5 - Math.random());
  return suffled.slice(0, num);
}
