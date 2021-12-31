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
export async function getJWT(url: string) {
    return fetch(baseUrl + url, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("DogeToken")}`,
        },        
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
///This Consumes an effect so there won't be 500 lines of code in Pages 
export function ConsumeEffect(loader : React.Dispatch<React.SetStateAction<boolean>>, 
                            setter : React.Dispatch<React.SetStateAction<any>>, 
                            callback : () => Promise<any>) {
    callback().then(
        (result) => {
            setter(result);
            loader(true);
        },
        (error) => {
            setter(error);
            loader(true);
        }
    );
}