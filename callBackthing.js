async function performOperations(a, b, fun1, fun2) {
  const res = fun1(a, b);
  console.log(await fun2(res));
}

const fun2 = async (res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(res);
  return res * 2;
};

performOperations(2, 3, (a, b) => a + b, fun2);