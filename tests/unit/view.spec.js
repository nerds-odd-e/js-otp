import {shallowMount, createLocalVue} from '@vue/test-utils'
import About from '@/views/About'
import Api from '@/api'
import Vuex from 'vuex'
import Toasted from 'vue-toasted'

const givenRandomEntityWithName = function ({apiName, link}) {
    Api.randomEntity = jest.fn()
    Api.randomEntity.mockReturnValue({
        data: {
            entries: [
                {
                    API: apiName,
                    Link: link
                }
            ]
        }
    })
};

const localVue = createLocalVue()

const createView = function (component) {
    localVue.use(Vuex)
    localVue.use(Toasted)
    const store = new Vuex.Store({
        state: {
            entity: {
                entries: [{}]
            }
        }
    })
    return shallowMount(component, {store, localVue});
};

describe('view', function () {
    it('should set result to first entry API', async function () {
        const component = createView(About);
        const about = component.vm;
        givenRandomEntityWithName({apiName: 'ApiName'});
        about.$toasted = jest.fn()
        about.$toasted.show = jest.fn()

        await component.find('button.go').trigger('click')

        expect(about.$data.result).toEqual('ApiName')
    });

    it('should show toast as first entry link', async function () {
        const component = createView(About);
        const about = component.vm;
        givenRandomEntityWithName({link: 'http://api.link'});
        about.$toasted = jest.fn()
        about.$toasted.show = jest.fn()

        await component.find('button.go').trigger('click')

        expect(about.$toasted.show).toBeCalledWith('http://api.link', {
            type: 'info',
            position: 'bottom-center',
            duration: 2000
        })
    });
});
