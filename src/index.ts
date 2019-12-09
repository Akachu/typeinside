import * as article from "./article";
import { image as downloadImage } from "./request";

function test(id: string) {
	let now: number;
	setInterval(() => {
		article.lastIndex(id).then(async last => {
			if (!last) {
				return;
			} else if (!now) {
				now = last;
			} else if (last > now) {
				let from = now;
				now = last;
				console.log(id, now);
				for (let i = from + 1; i <= last; i++) {
					let imgList = await article.image(id, i);
					imgList.forEach(img => {
						downloadImage(img.full, "./img/");
					});
					await delay(100);
				}
			}
		});
	}, 500);
}

function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

test("cat");
