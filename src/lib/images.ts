import { asset } from '$app/paths';
import {
	getImgSrc,
	getImgSrcSet,
	getLargestImgSrc,
	getResponsiveImage,
} from '$lib/optimized-images.generated';

export const imageAttrs = (path: string, sizes: string) => {
	const image = getResponsiveImage(path);
	return {
		src: asset(getImgSrc(path)),
		srcset: getImgSrcSet(path)
			? getImgSrcSet(path)
					?.split(', ')
					.map((entry) => {
						const [src, width] = entry.split(' ');
						return `${asset(src)} ${width}`;
					})
					.join(', ')
			: undefined,
		sizes,
		width: image?.width,
		height: image?.height,
	};
};

export const imageUrl = (path: string) => asset(getImgSrc(path));
export const largestImageUrl = (path: string) => asset(getLargestImgSrc(path));
export const imageMeta = (path: string) => getResponsiveImage(path);
