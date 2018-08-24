import {actions, RANDOM_ENTITY} from '@/store/entity'
import axios from 'axios'

const givenRandomEntityWithName = function (apiName) {
    axios.get = jest.fn()
    axios.get.mockReturnValue(
        Promise.resolve({
            data: {
                entries: [
                    {
                        API: apiName
                    }
                ]
            }
        })
    )
};

describe('store', function () {
    it('should call mutation in action', async function () {
        givenRandomEntityWithName('ApiName')

        const commit = jest.fn()
        await actions.randomEntity({commit})

        expect(commit).toBeCalledWith(RANDOM_ENTITY, {
            entries: [
                {
                    API: 'ApiName'
                }
            ]
        })
    });
});
