import cheerio from 'cheerio'

export const expectAllTextExists = (wrapper, ...allText) => {
    const $ = cheerio.load(wrapper.html())
    allText.forEach(text => {
        expect($(`:contains(${text})`).length).toBeGreaterThan(0)
    })
}
