// function sum() {
//     let result = 0
//     for (let i = 0; i < 5e9; i++) {
//         result += i
//     }
//     return result;
// }
// export default sum;

process.on("message", () => {
  let result = 0;
  for (let i = 0; i < 5e9; i++) {
    result += i;
  }
  process.send(result);
});
