const isURL = (str: string): boolean => {
  const urlPattern = /^(?:https?|ftp|sftp):\/\/\S+/;
  return urlPattern.test(str);
};

export default isURL;
