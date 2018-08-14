import {shallowMount} from '@vue/test-utils'
import About from '@/views/About'
import Api from '@/api'

describe('random', function () {
    it('should set result to first entity API', async function () {
        const wrapper = shallowMount(About);
        Api.randomEntity = jest.fn()

        Api.randomEntity.mockReturnValue({
            data: {
                entries: [
                    {
                        API: 'ApiName'
                    }
                ]
            }
        })

        await wrapper.vm.go();

        expect(wrapper.vm.$data.result).toEqual('ApiName')
    });
});
