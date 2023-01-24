fn(state => {
    console.log('Current cursor value:', state.lastEnd);
  
    // IF YOU CLEAR STATE...
    // Set this manual cursor to the earliest submission date you want fetch.
    const manualCursor = '2020-05-01T14:32:43.325+01:00';
    state.data = {
      surveys: [     
       {
         uid: 'afSehzJiWwktDGYucGJq2X',
         formName: 'Suspected COVID_19 or ARIILI Line List v3', 
       },
      ].map(survey => ({
        ...survey,
        formId: survey.uid,
        url: `https://kobo.humanitarianresponse.info/api/v2/assets/${survey.uid}/data/?format=json`,
        query: `&query={"_submission_time":{"$gte":"${
           state.lastEnd || manualCursor
          
        }"}}`,
      })),
    };
    return state;
  });
  
  each(dataPath('surveys[*]'), state => {
    const { url, query, formType, formName, owner } = state.data;
    return get(`${url}${query}`, {}, state => {
      state.data.submissions = state.data.results.map(submission => {
        return {
          formName,
          formOwner: owner,
          formType,
          body: submission,
        };
      });
      const count = state.data.submissions.length;
      console.log(`Fetched ${count} submissions from ${formName}.`);
      return state
    })(state);
  });
  
  fn(state => {
    let lastEnd = state.references
      .filter(item => item.body)
      .map(s => s.body.end)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  
    lastEnd = new Date(lastEnd) > new Date() ? lastEnd : new Date().toISOString();
  
    console.log('New cursor value:', lastEnd);
    return { ...state, data: {}, references: [], lastEnd };
  });