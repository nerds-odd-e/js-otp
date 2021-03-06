import About from '@/views/About'
import {createLocalVue, mount} from '@vue/test-utils'
import {createStore} from '@/store'
import axios from 'axios'
import {when} from 'jest-when'
import flushPromises from 'flush-promises/index'
import {clickButtonByText, expectAllTextExists} from '../helper'

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
        await clickButtonByText(wrapper, 'Go')
        await flushPromises()

        expectAllTextExists(wrapper, 'anotherApiName')
    })

    test('should show another api name by go store button', async() => {
        await mountWithStore(createStoreWithApiName('apiName'))
        await flushPromises()

        axios.get.mockReset()
        givenRandomApi({
            API: 'anotherApiName'
        })
        await clickButtonByText(wrapper, 'GoStore')
        await flushPromises()

        expectAllTextExists(wrapper, 'anotherApiName')
    })

    test('should show toast with api link by go button', async() => {
        await mountWithStore()
        await flushPromises()

        givenRandomApi({
            Link: 'apiLink'
        })
        await clickButtonByText(wrapper, 'Go')
        await flushPromises()

        expect(wrapper.vm.$toasted.show).toBeCalledWith('apiLink', {
            type: 'info',
            position: 'bottom-center',
            duration: 2000
        })
    })
})
