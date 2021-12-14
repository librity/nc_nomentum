const RANDOM_QUOTE_URL = 'https://api.quotable.io/random'

const contentSpan = document.querySelector('#quote span:first-child')
const authorSpan = document.querySelector('#quote span:last-child')

const fetchRandomQuoute = async () => {
  const { content, author } = await fetchJSON(RANDOM_QUOTE_URL)
  const quote = { content, author }

  return quote
}

const setQuote = quote => {
  contentSpan.innerText = quote.content
  authorSpan.innerText = quote.author
}

fetchRandomQuoute().then(setQuote).catch(console.error)
