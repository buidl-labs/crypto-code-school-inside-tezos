export default n => {
  const base = 16;
  const spaces = [
    0.25,
    0.5,
    0.75,
    1,
    1.5,
    2,
    3,
    4,
    6,
    8,
    12,
    16,
    24,
    32,
    40,
    48,
  ];

  return spaces[n - 1] * base;
};
