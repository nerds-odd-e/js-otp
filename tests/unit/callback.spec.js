import {createLocalVue, shallowMount} from "@vue/test-utils";
import Callback from '@/views/Callback'

describe('callback', function () {

    it('should set something after 2 seconds', async function () {
        const component = shallowMount(Callback, {localVue: createLocalVue()});
        window.setTimeout = jest.fn(callback => callback())

        component.find('button.go').trigger('click')

        expect(component.vm.$data.something).toEqual('Hello World')
        expect(window.setTimeout).toBeCalledWith(expect.anything(), 2000)
    });

});
