function sum(a, b) {
  return a + b;
}

if (require.main === module) {
  const a = Number(process.argv[2] || 1);
  const b = Number(process.argv[3] || 2);
  console.log(`${a} + ${b} = ${sum(a, b)}`);
}

module.exports = { sum };
