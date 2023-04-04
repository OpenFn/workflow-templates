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
  upsertCase({ externalIds: ['id'], data: state => {
    const { data } = state;
    const primeroCase = {
      id: data.record_id,
      ethnicity: [data.ethnicity],
      nationality: [data.nationality],
      // this is the number of boys and girls in the family
      total_number_of_boys_and_girls_in_family_e6c9373: {
        boys_333245: data.boys,
        girls_895184: data.girls,
        total: data.total,
      },
    };
    console.log('Upserting case to Primero:', primeroCase);
    return primeroCase;
  }})
);
