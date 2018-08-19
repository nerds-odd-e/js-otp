import {actions, RANDOM_ENTITY} from '@/store/entity'
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
