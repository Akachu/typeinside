import { get } from "./request";
import { API } from "./api";

interface NeighborArticle {
	index: number;
	title: string;
}

interface GalleryHeader {
	index: number;
	name: string;
	level: number;
	selected: boolean;
}

interface Article {
	index: number;
	view: number;
	recommend: number;
	hasImg: boolean;
	hasVoice: boolean;
	isRecommended: boolean;
	isBest: boolean;
	level: number;
	comment: number;
	voiceComment: number;
	isWinnerta: boolean;
	name: string;
	userId: string;
	ip: string | null;
	memberIcon: number;
	title: string;
	header: string;
	date: Date;
}

interface ArticleDetail extends Article {
	recommendMember: number;
	unrecommend: number;
	recommendCaptcha: boolean;
	recommendCaptchaType: string;
	recommendCaptchaLength: number;
	galleryTitle: string;
	galleryCategory: number;
	body: string;
	next: NeighborArticle;
	prev: NeighborArticle;
	galleryHeaders: Array<GalleryHeader>;
	isMinor: boolean;
	isNotice: boolean;
}

function parseDateString(data: string) {
	let yearRegexp = /\d+\.\d+\.\d+/;
	let timeRegexp = /\d+:\d+/;

	let year = data.match(yearRegexp);
	let time = data.match(timeRegexp);

	let date: Date;
	if (year && time) {
		date = new Date(data);
	} else if (year) {
		date = new Date(year[0]);
	} else if (time) {
		date = new Date();
		let timeArr = data.split(":").map(num => parseInt(num));
		date.setHours(timeArr[0], timeArr[1]);
	} else {
		date = new Date();
	}

	return date;
}

function parseBodyData(data: string) {
	let body: string = data;

	body = body.replace(/&gt;/g, ">");
	body = body.replace(/&lt;/g, "<");
	body = body.replace(/&quot;/g, '"');
	body = body.replace(/&amp;/g, "&");

	return body;
}

function parseArticleData(data: any) {
	let parsed: Article = {
		index: parseInt(data.no),
		view: parseInt(data.hit),
		recommend: parseInt(data.recommend),
		hasImg: data.img_icon === "Y",
		hasVoice: data.voice_icon === "Y",
		isRecommended: data.recommend_icon || data.recommend_chk === "Y",
		isBest: data.best_chk === "Y",
		level: parseInt(data.level),
		comment: parseInt(data.total_comment),
		voiceComment: data.voice_chk !== "N" ? parseInt(data.total_voice) : 0,
		isWinnerta: data.winnerta_icon === "Y",
		name: data.name,
		userId: data.user_id,
		ip: data.ip !== "" ? data.ip : null,
		memberIcon: parseInt(data.member_icon),
		title: data.subject,
		header: data.head_text,
		date: parseDateString(data.date_time)
	};

	return parsed;
}

function parseArticleDetailData(data: any) {
	let article = parseArticleData(data);

	let headers: Array<GalleryHeader> = data.head_text.map(
		(ht: any): GalleryHeader => ({
			index: parseInt(ht.no),
			name: ht.name,
			level: parseInt(ht.level),
			selected: ht.selected
		})
	);

	let hasCaptcha = false;
	let captchaType = null;
	let captchaLength = 0;

	if (data.recommend_captcha) {
		captchaType = data.recommend_captcha_type;
		captchaLength = data.recommend_code_count;
	}

	let parsedDetail: ArticleDetail = {
		...article,
		recommendMember: parseInt(data.recommend_member),
		unrecommend: parseInt(data.nonrecommend),
		recommendCaptcha: hasCaptcha,
		recommendCaptchaType: captchaType,
		recommendCaptchaLength: captchaLength,
		galleryTitle: data.galltitle,
		galleryCategory: parseInt(data.category),
		body: parseBodyData(data.memo),
		next: { index: parseInt(data.next_link), title: data.next_subject },
		prev: { index: parseInt(data.prev_link), title: data.prev_subject },
		galleryHeaders: headers,
		isMinor: data.is_minor,
		isNotice: data.isNotice === "Y"
	};

	return parsedDetail;
}

export async function list(galleryId: string, page = 1) {
	let options = {
		query: {
			page: page.toString(),
			id: galleryId
		}
	};

	let data = await get.withHash(API.ARTICLE.LIST, options);

	if (data && data[0] && data[0]["gall_list"]) {
		let gallList: Array<any> = data[0]["gall_list"];
		return gallList.map(d => parseArticleData(d));
	} else {
		return null;
	}
}

export async function detail(galleryId: string, index: number) {
	let options = {
		query: {
			no: index.toString(),
			id: galleryId
		}
	};

	let data = await get.withHash(API.ARTICLE.DETAIL, options);

	if (data && data[0] && data[0]["view_info"]) {
		let viewInfo = data[0]["view_info"];
		let viewMain = data[0]["view_main"];

		let viewData = { ...viewInfo, ...viewMain };

		return parseArticleDetailData(viewData);
	} else {
		return null;
	}
}

export async function lastIndex(galleryId: string) {
	let articleList = await list(galleryId, 1);
	if (!articleList) return null;
	return articleList[0].index;
}

interface ImageUrl {
	full: string;
	resized: string;
}

export async function image(
	galleryId: string,
	index: number
): Promise<Array<ImageUrl>> {
	let options = {
		query: {
			no: index.toString(),
			id: galleryId
		}
	};

	let data = await get.withHash(API.ARTICLE.IMAGE, options);

	if (data && data[0] && data[0].img) {
		return data.map((item: any) => ({
			full: item.img,
			resized: item.img_clone
		}));
	} else {
		return [];
	}
}
