import profanityFilter from 'leo-profanity'

profanityFilter.addDictionary(
  'multi',
  Array
    .from(
      new Set([
        ...profanityFilter.getDictionary('ru'),
        ...profanityFilter.getDictionary('en'),
      ]),
    ),
)

export {
  profanityFilter,
}
