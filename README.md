# typeinside


## Install

- ``npm i typeinside --save``

## Usage

### get article data

```ts
import { article, request } from('typeinside');

/** @returns Array<Article> */
let articleList = await article.list(galleryName);
```

### download image

```ts
const galleryName = 'cat';

let index = await article.lastIndex(galleryName);
let imgList = await article.image(galleryName, index!);

for (let img of imgList) {
  
  /** @returns { fileName: string, extension: string, data: Stream } | null */
  await request.image(img.full);

  // or download directly
  await request.image(img.full, './catImages/');

}
```

## License

[MIT](https://naver.com)

- - -

## other languages

- [goinside](https://github.com/geeksbaek/goinside)
- [KotlinInside](https://github.com/organization/KotlinInside)
