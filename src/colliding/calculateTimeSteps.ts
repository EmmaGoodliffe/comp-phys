const calculateTimeSteps = (p: number): number => {
  if (p < 4) {
    return p;
  } else if (p === 4) {
    return p * 3;
  } else if (p === 5) {
    return p * 20;
  } else if (p <= 8) {
    return 10 ** (p - 2.5);
  }
  throw "Nothing returned from time steps";
};

export default calculateTimeSteps;
