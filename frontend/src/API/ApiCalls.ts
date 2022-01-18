const baseUrl = process.env.REACT_APP_API_BASE_URL;

// fetch("https://api.rdmraceapp.nl/auth/@me");
// fetch("localhost:8080/auth/@me");

export async function get(url: string) {
  return fetch(baseUrl + url, {
    method: 'GET',
  })
    .then(parseJson)
    .then((response) => {
      if (response.ok) {
        return response.json;
      }
      throw new Error('message');
    });
}
export async function getJWT(url: string) {
  return fetch(baseUrl + url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `${localStorage.getItem('DogeToken')}`,
    },
  })
    .then(parseJson)
    .then((response) => {
      if (response.ok) {
        return response.json;
      } else if (response.status === 401) {
        localStorage.removeItem('DogeToken');
        window.location.href = '/Login';
        return;
      }
      throw new Error('bruh');
    });
}
export async function Delete(url: string) {
  return fetch(baseUrl + url, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `${localStorage.getItem('DogeToken')}`,
    },
  })
    .then(parseJson)
    .then((response) => {
      if (response.ok) {
        return response.json;
      } else if (response.status === 401) {
        localStorage.removeItem('DogeToken');
        window.location.href = '/Login';
        return;
      } else {
        console.error(response);
      }
    });
}
export async function getfromURL(query: string) {
  return fetch(baseUrl + query, {
    method: 'GET',
    headers: {
      authorization: `${localStorage.getItem('DogeToken')}`,
    },
  })
    .then(parseJson)
    .then((response) => {
      if (response.ok) {
        return response.json;
      } else if (response.status === 401) {
        localStorage.removeItem('DogeToken');
        window.location.href = '/Login';
        return;
      }
      throw new Error('bruh');
    });
}

export async function postJson(url: string, data: any) {
  return fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(parseJson)
    .then((response) => {
      if (response.ok) {
        return response.json;
      } else if (response.status === 400) {
        return undefined;
      } else if (response.status === 401) {
        return response.json;
      }
    });
}
export async function postTokenJson(url: string, data: any) {
  return fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `${localStorage.getItem('DogeToken')}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
}

async function parseJson(response: Response) {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json().then((json: any) => ({
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
export async function ConsumeEffect(
  loader: React.Dispatch<React.SetStateAction<boolean>>,
  setter: React.Dispatch<React.SetStateAction<any>>,
  callback: () => Promise<any>
) {
  await callback().then(
    (result) => {
      setter(result);
      loader(true);
    },
    (error) => {
      setter(error);
      loader(false);
    }
  );
}
export async function sendData(url: string, data: FormData) {
  // const formData  = new FormData();

  // for(const name in data) {
  //   formData.append(name, data[name]);
  // }
  return fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      Authorization: `${localStorage.getItem('DogeToken')}`,
    },
    body: data,
  })
    .then(parseJson)
    .then((data) => {
      if (data.ok) {
        return data.json;
      } else if (data.status === 401) {
        localStorage.removeItem('DogeToken');
        window.location.href = '/Login';
        return;
      } else if (data.status === 500) {
      } else {
        return 'Bad Request';
      }
    });
}
export async function patchData(url: string, data: FormData) {
  // const formData  = new FormData();

  // for(const name in data) {
  //   formData.append(name, data[name]);
  // }
  return fetch(baseUrl + url, {
    method: 'PATCH',
    headers: {
      Authorization: `${localStorage.getItem('DogeToken')}`,
    },
    body: data,
  })
    .then(parseJson)
    .then((data) => {
      if (data.ok) {
        return data.json;
      } else if (data.status === 401) {
        localStorage.removeItem('DogeToken');
        window.location.href = '/Login';
        return;
      } else if (data.status === 500) {
      } else {
        return 'Bad Request';
      }
    });
}
