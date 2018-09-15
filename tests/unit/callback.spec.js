import {createLocalVue, shallowMount} from "@vue/test-utils";
import Callback from '@/views/Callback'

describe('callback', function () {

    it('should set something', async function () {
        const component = shallowMount(Callback, {localVue: createLocalVue()});
        window.setTimeout = (callback, milliseconds) => {
            callback()
        }

        component.find('button.go').trigger('click')

        expect(component.vm.$data.something).toEqual('Hello World')
    });

});
