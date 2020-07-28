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

describe('About', () => {
    test('should show a random api name', async() => {
        givenRandomApi({
            API: 'apiName'
        })

        var wrapper = await mount(About, { store: createStore(), localVue: createLocalVue() })
        await flushPromises()

        expectAllTextExists(wrapper, 'apiName')
    })
})
