import axios from 'axios'

export const randomEntity = async () => {
    return await axios.get('https://api.publicapis.org/random')
}
