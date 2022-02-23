const transformTimeIntoValues = (string) => {
  const stringToArray = string.split(':');
  const arrayValuesToNumbers = stringToArray.map((item) => Number(item));
  return (arrayValuesToNumbers[0] - 8) * 60 + arrayValuesToNumbers[1];
};

const transformReqTask = (task) => {
  const start = transformTimeIntoValues(task.startTime);
  const finish = transformTimeIntoValues(task.finishTime);
  const duration = finish - start;
  return {
    title: task.title,
    start: String(start),
    duration: String(duration),
  };
};

const findMissingValue = (startTime, finishTime, title) => {
  let field = 'none';
  switch (true) {
    case !startTime && !finishTime && !title:
      field = 'all';
      break;
    case !startTime && !finishTime:
      field = 'startTime, finishTime';
      break;
    case !startTime && !title:
      field = 'startTime,title';
      break;
    case !finishTime && !title:
      field = 'finishTime,title';
      break;
    case !startTime:
      field = 'startTime';
      break;
    case !finishTime:
      field = 'finishTime';
      break;
    case !title:
      field = 'title';
      break;
    default:
      field = 'none';
  }

  return field;
};

const transformArrayDataToNumbers = (arr) => {
  return arr.map((el) => ({
    _id: el._id,
    title: el.title,
    start: Number(el.start),
    duration: Number(el.duration),
  }));
};

const sortTasksByStartAndDuration = (arr) => {
  const formattedArray = transformArrayDataToNumbers(arr);
  console.log(formattedArray);
  return [...formattedArray].sort((a, b) => {
    if (a.start > b.start) {
      return 1;
    }

    if (a.start < b.start) {
      return -1;
    }

    if (a.duration > b.duration) {
      return 1;
    }

    if (a.duration < b.duration) {
      return -1;
    }

    return 0;
  });
};

module.exports = {
  transformReqTask,
  findMissingValue,
  sortTasksByStartAndDuration,
};
