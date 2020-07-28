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

const createStoreWithApiName = () => {
    const store = createStore()
    store.state.entity.entries[0].API = 'storeApiName'
    return store
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

        wrapper = await mount(About, { store: createStore(), localVue: createLocalVue() })
        await flushPromises()

        expectAllTextExists(wrapper, 'apiName')
    })

    test('should show an api name by store', async() => {
        wrapper = await mount(About, {store: createStoreWithApiName(), localVue: createLocalVue()})
        await flushPromises()

        expectAllTextExists(wrapper, 'storeApiName')
    })
})
