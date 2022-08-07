import fs from 'fs/promises';
async function main () {
  const FILE = await fs.readFile('./aula-01.txt', {encoding: 'utf-8'});
const fileWithLines = FILE.split("\n");
const [numOps, ...file] = fileWithLines;

type Divider = (list: string[], quantity: number) => string[][];
const divider: Divider = (list, quantity) =>
  list.reduce<string[][]>((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / quantity)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)
    return resultArray
  }, []);

const divided = divider(file, 3);

type GetUniqueItems = (conj1: string, conj2: string) => string[];
const getUniqueItems: GetUniqueItems = (conj1, conj2) =>
  [...new Set(`${conj1},${conj2}`.split(","))]

type Union = (conj1: string, conj2: string) => string;
const union: Union = (conj1, conj2) =>
  getUniqueItems(conj1, conj2)
    .join(",");

type Intersection = (conj1: string, conj2: string) => string;
const intersection: Intersection = (conj1, conj2) =>
  getUniqueItems(conj1, conj2)
    .filter(item => conj1.includes(item) && conj2.includes(item))
    .join(",");


type Difference = (conj1: string, conj2: string) => string;
const difference: Difference = (conj1, conj2) =>
  getUniqueItems(conj1, conj2)
    .filter(item => !conj2.includes(item))
    .join(",");

type GetUnique = (conj: string) => string[];
const getUnique: GetUnique = (conj) =>
  [...new Set(conj.split(","))]

type CartesianProduct = (conj1: string, conj2: string) => string[][];
const cartesianProduct: CartesianProduct = (conj1, conj2) =>
  getUnique(conj1)
    .map(item1 => getUnique(conj2)
      .map(item2 => `${item1},${item2}`))

const format =
  (conj1: string, conj2: string) =>
    (operation: string, result: string) =>
      `${operation}: conjunto 1 {${conj1}}, conjunto 2 {${conj2}}. Resultado: {${result}} \n`;

Array.from(Array(Number(numOps)).keys()).map((item) => {
  const [op, conj1, conj2] = divided[item];
  const _f = format(conj1, conj2);
  switch (op) {
    case "U":
      return console.log(_f('União', union(conj1, conj2)));

    case "I":
      return console.log(_f('Interceção', intersection(conj1, conj2)));

    case "D":
      return console.log(_f('Diferença', difference(conj1, conj2)));

    case "C":
      return console.log(_f('Produto Cartesiano', JSON.stringify(cartesianProduct(conj1, conj2))));
  }
})
}

main();