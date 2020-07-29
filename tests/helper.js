import cheerio from 'cheerio'

export const expectAllTextExists = (wrapper, ...allText) => {
    const $ = cheerio.load(wrapper.html())
    allText.forEach(text => {
        expect($(`:contains(${text})`).length).toBeGreaterThan(0)
    })
}

export const clickButtonByText = async(wrapper, text) => {
    await wrapper.findAll('button').wrappers.find(e => e.text() === text).trigger('click')
}

