async function dateToTimestamp(date) {
    return new Date(date).getTime();
  };

module.exports = dateToTimestamp;