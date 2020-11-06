const formatCollisionNumber = (n: number): string => {
  const s = `${n}`;
  if (addDecimalPoint) {
    return s.split("")[0] + "." + s.slice(1);
  } else {
    return s;
  }
};

export default formatCollisionNumber;
