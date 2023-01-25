fn(state => {
  let people = [];
  if (Array.isArray(state.data)) {
    people = Array.from(state.data);
  } else {
    people.push(state.data);
  }
    console.log(people);

  return {
    ...state,
    people,
  };
});
  
each(
    '$.people[*]', 
    fn(state => {
      const primeroCase = state.data;

      let data = {
        nationality: [primeroCase.nationality],
        ethnicity: [primeroCase.ethnicity],
        record_id: primeroCase.case_id,
        
      };
      const boys_and_girls =  {
          "boys_333245": primeroCase.boys,
          "girls_895184": primeroCase.girls,
          "total": primeroCase.total
      };
    data["total_number_of_boys_and_girls_in_family_e6c9373"]  = boys_and_girls;
    console.log('Upserting case', JSON.stringify(data, null, 2));
    return upsertCase({
      externalIds: ['record_id'],
      data,
    },
    state => {
      return state;
    })(state)
}));