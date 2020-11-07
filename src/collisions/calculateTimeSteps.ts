const calculateTimeSteps = (p: number): number => {
  if (p === 0) {
    return 1;
  } else if (p < 3) {
    return p;
  } else if (p === 3) {
    return p * 3;
  } else if (p === 4) {
    return p * 20;
  } else if (p <= 8) {
    return Math.floor(10 ** (p - 2));
  }
  throw "Nothing returned from time steps";
};

export default calculateTimeSteps;
