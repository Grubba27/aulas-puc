import fs from 'fs/promises';

type Divider = (list: string[], quantity: number) => string[][];
const divider: Divider =
  (list, quantity) =>
    list.reduce<string[][]>((accumulator, item, index) => {
      const chunkIndex = Math.floor(index / quantity)

      if (!accumulator[chunkIndex]) {
        accumulator[chunkIndex] = []
      }

      accumulator[chunkIndex].push(item)
      return accumulator
    }, []);

type GetUniqueItems = (conj1: string, conj2: string) => string[];
const getUniqueItems: GetUniqueItems =
  (conj1, conj2) =>
    [...new Set(`${conj1},${conj2}`.split(","))]

type GetUnique = (conj: string) => string[];
const getUnique: GetUnique =
  (conj) => [...new Set(conj.split(","))]

type Union = (conj1: string, conj2: string) => string;
const union: Union =
  (conj1, conj2) => getUniqueItems(conj1, conj2).join(",");

type Intersection = (conj1: string, conj2: string) => string;
const intersection: Intersection =
  (conj1, conj2) =>
    getUniqueItems(conj1, conj2)
      .filter(item => conj1.includes(item) && conj2.includes(item))
      .join(",");

type Difference = (conj1: string, conj2: string) => string;
const difference: Difference =
  (conj1, conj2) =>
    getUniqueItems(conj1, conj2)
      .filter(item => !conj2.includes(item))
      .join(",");

type CartesianProduct = (conj1: string, conj2: string) => string;
const cartesianProduct: CartesianProduct =
  (conj1, conj2) =>
    getUnique(conj1)
      .map(item1 => getUnique(conj2).map(item2 => `[${item1},${item2}]`))
      .reduce((accumulator, item) => [...accumulator, ...item], [])
      .join(",");

type Format =
  (conj1: string, conj2: string) =>
    (operation: string, result: string) => void;

const format: Format =
  (conj1: string, conj2: string) =>
    (operation: string, result: string) =>
      console.log(`${operation}: conjunto 1 {${conj1}}, conjunto 2 {${conj2}}. Resultado: {${result}} \n`);

async function main() {
  const FILE = await fs.readFile('./aula-01.txt', {encoding: 'utf-8'});

  const [numOps, ...file] = FILE.split("\n");

  const divided = divider(file, 3);
  Array.from(Array(Number(numOps)).keys()).map((item) => {
    const [op, conj1, conj2] = divided[item];
    const logger = format(conj1, conj2);
    switch (op) {
      case "U":
        return logger('União', union(conj1, conj2));

      case "I":
        return logger('Interceção', intersection(conj1, conj2));

      case "D":
        return logger('Diferença', difference(conj1, conj2));

      case "C":
        return logger('Produto Cartesiano', cartesianProduct(conj1, conj2));
    }
  })
}

main();
