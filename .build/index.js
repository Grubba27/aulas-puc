var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var import_promises = __toModule(require("fs/promises"));
async function main() {
  const FILE = await import_promises.default.readFile("./aula-01.txt", { encoding: "utf-8" });
  const fileWithLines = FILE.split("\n");
  const [numOps, ...file] = fileWithLines;
  const divider = (list, quantity) => list.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / quantity);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  const divided = divider(file, 3);
  const getUniqueItems = (conj1, conj2) => [...new Set(`${conj1},${conj2}`.split(","))];
  const union = (conj1, conj2) => getUniqueItems(conj1, conj2).join(",");
  const intersection = (conj1, conj2) => getUniqueItems(conj1, conj2).filter((item) => conj1.includes(item) && conj2.includes(item)).join(",");
  const difference = (conj1, conj2) => getUniqueItems(conj1, conj2).filter((item) => !conj2.includes(item)).join(",");
  const getUnique = (conj) => [...new Set(conj.split(","))];
  const cartesianProduct = (conj1, conj2) => getUnique(conj1).map((item1) => getUnique(conj2).map((item2) => `${item1},${item2}`));
  const format = (conj1, conj2) => (operation, result) => `${operation}: conjunto 1 {${conj1}}, conjunto 2 {${conj2}}. Resultado: {${result}} 
`;
  Array.from(Array(Number(numOps)).keys()).map((item) => {
    const [op, conj1, conj2] = divided[item];
    const _f = format(conj1, conj2);
    switch (op) {
      case "U":
        return console.log(_f("Uni\xE3o", union(conj1, conj2)));
      case "I":
        return console.log(_f("Interce\xE7\xE3o", intersection(conj1, conj2)));
      case "D":
        return console.log(_f("Diferen\xE7a", difference(conj1, conj2)));
      case "C":
        return console.log(_f("Produto Cartesiano", JSON.stringify(cartesianProduct(conj1, conj2))));
    }
  });
}
main();
//# sourceMappingURL=index.js.map
