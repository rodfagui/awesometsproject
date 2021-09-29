class Http {
  static instance = new Http();

  get = async (url: string) => {
    try {
      let req = await fetch(url);
      let json = await req.json();
      return json;
    } catch (err: any) {
      console.log('http get error', err);
      throw Error(err);
    }
  };

  post = async (url: string, body: any) => {
    try {
      let req = await fetch(url, {
        method: 'POST',
        body,
      });
      let json = await req.json();
      return json;
    } catch (err: any) {
      console.log('http post error', err);
      throw Error(err);
    }
  };
}

export default Http;
