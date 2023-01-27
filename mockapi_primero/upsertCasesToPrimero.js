// Ensure that cases are in an array
fn(state => {
  const { data } = state;
  const people = [];

  if (Array.isArray(data)) {
    people = Array.from(data);
  } else {
    people.push(data);
  }

  console.log('Incoming cases:', people);

  return { ...state, people };
});

// Iterate through cases, upsert to Primero
each(
  '$.people[*]',
  upsertCase({ externalIds: ['record_id'] }, state => {
    const { data } = state;
    const primeroCase = {
      record_id: data.case_id,
      ethnicity: [data.ethnicity],
      nationality: [data.nationality],
      // this is the number of boys and girls in the family
      boys_and_girls: {
        boys_333245: primeroCase.boys,
        girls_895184: primeroCase.girls,
        total: primeroCase.total,
      },
    };
    console.log('Upserting case to Primero:', primeroCase);
    return primeroCase;
  })
);