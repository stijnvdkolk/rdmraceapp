const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function get(url: string) {
    return fetch(baseUrl + url, {
        method: "GET",
    }).then(parseJson).then((response) => {
        if (response.ok) {
            return response.json;
        }
        throw new Error("message");
    });      
}

export async function postJson(url: string, data : any) {
    return fetch(baseUrl + url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(parseJson).then((response) => {
        if (response.ok) {
            return response.json;
        }
        console.error("error");
    });
}

async function parseJson(response: Response) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json()
            .then((json: any) => ({
                status: response.status,
                ok: response.ok,
                json,
            }));
    }

    return {
        status: response.status,
        ok: response.ok,
        json: {},
    };
}