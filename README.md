# [Typeinside](https://github.com/Akachu/typeinside) · [![Build Status](https://travis-ci.com/Akachu/typeinside.svg?branch=master)](https://travis-ci.com/Akachu/typeinside) [![Coverage Status](https://coveralls.io/repos/github/Akachu/typeinside/badge.svg?branch=master)](https://coveralls.io/github/Akachu/typeinside?branch=master) [![NPM version](https://img.shields.io/npm/v/typeinside.svg)](https://npmjs.org/package/typeinside)

## Install

`npm i typeinside --save`

## Usage

### get article data

```ts
import { article, request, getAppId } from "typeinside";

const appId = await getAppId();

/** @returns Article[]*/
let articleList = await article.list(galleryName, appId);
```

### download image

```ts
const galleryName = "cat";

let index = await article.lastIndex(galleryName, appId);
let imgList = await article.image(galleryName, index, appId);

for (let img of imgList) {
  /** @returns { fileName: string, extension: string, data: Stream } */
  await request.image(img.full);

  // or download directly
  await request.image.save(img.full, "./catImages/");
}
```

## License

[MIT](https://github.com/Akachu/typeinside/blob/master/LICENSE)

## other languages

- [goinside](https://github.com/geeksbaek/goinside)
- [KotlinInside](https://github.com/organization/KotlinInside)
