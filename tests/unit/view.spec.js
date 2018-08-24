import {shallowMount, createLocalVue} from '@vue/test-utils'
import About from '@/views/About'
import Api from '@/api'
import Vuex from 'vuex'
import Toasted from 'vue-toasted'

const localVue = createLocalVue()

const createView = function (component, state) {
    localVue.use(Vuex)
    return shallowMount(component, {store: new Vuex.Store(state), localVue});
};

describe('view', function () {

    let component;
    let vm;
    localVue.use(Toasted)

    beforeEach(() => {
        component = createView(About, {
            state: {
                entity: {
                    entries: [{}]
                }
            }
        });
        vm = component.vm;
        vm.$toasted = jest.fn()
        vm.$toasted.show = jest.fn()
    })

    it('should set result to first entry API', async function () {
        givenRandomEntityWithName({apiName: 'ApiName'});

        await go()

        expect(vm.$data.result).toEqual('ApiName')
    });

    it('should show toast as first entry link', async function () {
        givenRandomEntityWithName({link: 'http://api.link'});

        await go()

        expect(vm.$toasted.show).toBeCalledTimes(1)
        expect(vm.$toasted.show).toBeCalledWith('http://api.link', {
            type: 'info',
            position: 'bottom-center',
            duration: 2000
        })
    });

    const go = function () {
        component.find('button.go').trigger('click');
    };

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

});
