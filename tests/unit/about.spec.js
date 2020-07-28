import About from '@/views/About'
import {createLocalVue, mount} from '@vue/test-utils'
import {createStore} from '@/store'
import axios from 'axios'
import {when} from 'jest-when'
import flushPromises from 'flush-promises/index'
import {expectAllTextExists} from '../helper'

const givenRandomApi = entry => {
    when(axios.get).calledWith('https://api.publicapis.org/random').mockResolvedValue({
        data: {
            entries: [entry]
        }
    })
}

var wrapper

const createStoreWithApiName = (apiName) => {
    const store = createStore()
    store.state.entity.entries[0].API = apiName
    return store
}

const clickGoButton = async() => {
    await wrapper.findAll('button').wrappers.find(e => e.text() === 'Go').trigger('click')
}

const mocks = {
    $toasted: {
        show: jest.fn()
    }
}

const mountWithStore = async(store = createStore()) => {
    wrapper = await mount(About, { store, localVue: createLocalVue(), mocks })
}

describe('About', () => {
    beforeEach(() => {
        givenRandomApi({
            API: 'apiName'
        })
    })

    test('should show a random api name by api call', async() => {
        givenRandomApi({
            API: 'apiName'
        })
        await mountWithStore()
        await flushPromises()

        expectAllTextExists(wrapper, 'apiName')
    })

    test('should show an api name by store', async() => {
        await mountWithStore(createStoreWithApiName('storeApiName'))
        await flushPromises()

        expectAllTextExists(wrapper, 'storeApiName')
    })

    test('should show another api name by go button', async() => {
        givenRandomApi({
            API: 'apiName'
        })
        await mountWithStore()
        await flushPromises()

        axios.get.mockReset()
        givenRandomApi({
            API: 'anotherApiName'
        })
        await clickGoButton()
        await flushPromises()

        expectAllTextExists(wrapper, 'anotherApiName')
    })
})
