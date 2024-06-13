import { HTTPClient } from 'koajax';
import { Downloader } from 'mobx-restful';

export const service = new HTTPClient({
  baseURI: 'https://api.github.com/',
  responseType: 'json'
});

export const downloader = new Downloader();
