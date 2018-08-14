import axios from 'axios'

export default {
    randomEntity: async () => {
        return await axios.get('https://api.publicapis.org/random')
    }
}
