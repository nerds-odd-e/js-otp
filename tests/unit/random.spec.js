import {shallowMount} from '@vue/test-utils'
import About from '@/views/About'
import Api from '@/api'

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

describe('random', function () {
    it('should set result to first entity API', async function () {
        const about = shallowMount(About).vm;
        givenRandomEntityWithName('ApiName');

        await about.go();

        expect(about.$data.result).toEqual('ApiName')
    });
});
