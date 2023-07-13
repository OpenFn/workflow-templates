fn(state => {
  console.log(state.response.data.results);
  const submissions = state.response.data.results;
  // const submission = submissions.slice(0)[0];
  return { ...state, submissions };
});

if (state.submission) {
  const aggregateValues = (key) => {
      return submissions.reduce((totalSum, submission) => {
        if (submission.body && submission.body[key]) {
          return totalSum + parseInt(submission.body[key]);
        }
        return totalSum;
      }, 0);
    };
//Load datavalue sets using DHIS2's version of "UPSERT", using "importStrategy: 'CREATE_AND_UPDATE' by default`)
  create("dataValueSets", {
    dataSet: "QX4ZTUbOt3a", //Reproductive health
    completeDate: new Date().toISOString().split('T')[0], //Today's date in YYYY-MM-DD format
    period: "202303", //Mar 2023
    orgUnit: "ImspTQPwCqd", //Sierra Leone
    dataValues: [
      {
        dataElement: "fbfJHSPpUQD", //ANC 1st Visit
        // value: 7
        value: state => parseInt(state.submission.ANC1),
        
        categoryOptionCombo: "pq2XI5kz2BY" // Fixed
        },
      {
        dataElement: "cYeuwXTCPkU", //ANC 2nd Visit
        value: state => parseInt(state.submission.ANC_2nd_Visit),
        categoryOptionCombo: "pq2XI5kz2BY"

      },
      {
        dataElement: "Jtf34kNZhzP", //ANC 3rd Visit
        value: state => parseInt(state.submission.ANC_3rd_Visit),
        categoryOptionCombo: "pq2XI5kz2BY"

      }
    ],
  })
} else {
  console.log("No new submissions were found.")
};
