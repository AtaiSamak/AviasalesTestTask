export default class GetService {
    _getData = async (url) => {
        const data = await fetch(url);

        if(!data.ok) {
            throw new Error(`Could not fetch ${url}, received: ${data.status}`)
        }

        return await data.json();
    }

    getTickets = async () => {
        const res = await this._getData("https://front-test.beta.aviasales.ru/search")
        .then( async (data) => {
            return await this._getData(`https://front-test.beta.aviasales.ru/tickets?searchId=${data.searchId}`)
        }).then(async (data) => {
            return data;
        }).catch((data) => {
            throw new Error(`Something goes wrong: ${data}`)
        })
        return res;
    }
}