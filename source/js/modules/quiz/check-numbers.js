const checkNumbers = (number) => {
  let word = '';
  String(number);
  number.split('').pop();

  switch (number) {
    case '1':
      word = 'рацион';
      break;
    case '2':
      word = 'рациона';
      break;
    case '3':
      word = 'рациона';
      break;
    case '4':
      word = 'рациона';
      break;
    default:
      word = 'рационов';
  }

  return word;
};

export {checkNumbers};
