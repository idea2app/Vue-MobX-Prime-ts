import { HTTPClient } from 'koajax';

export const service = new HTTPClient({
  baseURI: 'https://api.github.com/',
  responseType: 'json'
});
