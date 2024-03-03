const checkifWWW = (checking: string): string => {
  if (checking.startsWith("www.")) {
    return checking.substring(4);
  }
  return checking;
};

export default checkifWWW;
