import About from '@/views/About'
import {createLocalVue, mount} from '@vue/test-utils'
import {createStore} from '@/store'
import axios from 'axios'
import {when} from 'jest-when'
import flushPromises from 'flush-promises/index'

describe('About', () => {
    test('should show a random api name', async() => {
        when(axios.get).calledWith('https://api.publicapis.org/random').mockResolvedValue({
            data: {
                entries: [{
                    API: 'apiName'
                }]
            }
        })

        var wrapper = await mount(About, { store: createStore(), localVue: createLocalVue() })
        await flushPromises()

        expect(wrapper.html()).toContain('apiName')
    })
})
