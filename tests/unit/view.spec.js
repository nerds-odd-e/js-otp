import {shallowMount, createLocalVue} from '@vue/test-utils'
import About from '@/views/About'
import Api from '@/api'
import Vuex from 'vuex'

const givenRandomEntityWithName = function (apiName) {
    Api.randomEntity = jest.fn()
    Api.randomEntity.mockReturnValue({
        data: {
            entries: [
                {
                    API: apiName
                }
            ]
        }
    })
};

const createView = function (component) {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store({
        state: {
            entity: {
                entries: [{}]
            }
        }
    })
    return shallowMount(component, {store, localVue}).vm;
};

describe('view', function () {
    it('should set result to first entity API', async function () {
        const about = createView(About);
        givenRandomEntityWithName('ApiName');

        await about.go();

        expect(about.$data.result).toEqual('ApiName')
    });
});
