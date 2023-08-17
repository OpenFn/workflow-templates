fn(state => {
  console.log(state.response.data.results);
  const submissions = state.response.data.results;
  return { ...state, submissions };
});

if (state.submissions) {
//We will sum up response values across submssion using this
    const aggregateValues = (key) => {
      return submissions.reduce((totalSum, submission) => {
        if (submission.body && submission.body[key]) {
          return totalSum + parseInt(submission.body[key]);
        }
        return totalSum;
      }, 0);
    };
// Eg: aggregateValues("ANC1")

//Load datavalue sets using DHIS2's version of "UPSERT", using "importStrategy: 'CREATE_AND_UPDATE' by default`)

  create("dataValueSets", {
    dataSet: "QX4ZTUbOt3a", //Reproductive health
    completeDate: new Date().toISOString().split('T')[0], //Today's date in YYYY-MM-DD format
    period: "202303", //Mar 2023
    orgUnit: "ImspTQPwCqd", //Sierra Leone
    dataValues: [
      {
        dataElement: "fbfJHSPpUQD", //ANC 1st Visit
        value: aggregateValues("ANC1"), //Summed values of responses to "ANC1" question across submissions
        categoryOptionCombo: "pq2XI5kz2BY" // Fixed
        },
      {
        dataElement: "cYeuwXTCPkU", //ANC 2nd Visit
        value: aggregateValues("ANC_2nd_Visit"),
        categoryOptionCombo: "pq2XI5kz2BY"

      },
      {
        dataElement: "Jtf34kNZhzP", //ANC 3rd Visit
        value: aggregateValues("ANC_3rd_Visit"),
        categoryOptionCombo: "pq2XI5kz2BY"

      }
    ],
  })
} else {
  console.log("No new submissions were found.")
}
;
