import About from '@/views/About'
import {createLocalVue, mount} from '@vue/test-utils'
import {createStore} from '@/store'
import axios from 'axios'
import {when} from 'jest-when'
import flushPromises from 'flush-promises/index'
import {expectAllTextExists} from '../helper'
import {mapMutations} from 'vuex'
import {RANDOM_ENTITY} from '@/store/entity'
import Vuex from 'vuex'

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

const clickButtonByText = async(text) => {
    await wrapper.findAll('button').wrappers.find(e => e.text() === text).trigger('click')
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
        await clickButtonByText('Go')
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
        await clickButtonByText('GoStore')
        await flushPromises()

        expectAllTextExists(wrapper, 'anotherApiName')
    })

    test('should show toast with api link by go button', async() => {
        await mountWithStore()
        await flushPromises()

        givenRandomApi({
            Link: 'apiLink'
        })
        await clickButtonByText('Go')
        await flushPromises()

        expect(mocks.$toasted.show).toBeCalledWith('apiLink', {
            type: 'info',
            position: 'bottom-center',
            duration: 2000
        })
    })
})
