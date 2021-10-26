const getRandom = (num) => {
  const randomNum = Math.ceil(Math.random() * num);
  return randomNum;
};

export default getRandom;
