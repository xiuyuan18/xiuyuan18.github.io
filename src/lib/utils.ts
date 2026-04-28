import { DATA } from '@/src/constants';
import type { Publication } from '@/src/types';

export function isAuthorMe(author: string): boolean {
  return author === DATA.profile.name || author === DATA.profile.publicationName;
}

const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.ogg', '.ogv']);

function isVideoPath(path: string): boolean {
  const lastDot = path.lastIndexOf('.');
  if (lastDot === -1) return false;
  return VIDEO_EXTENSIONS.has(path.slice(lastDot).toLowerCase());
}

export function resolvePublicationTeaser(pub: Publication): { videoSrc?: string; imageSrc?: string } {
  if (!pub.teaser) return {};
  if (isVideoPath(pub.teaser)) return { videoSrc: pub.teaser };
  return { imageSrc: pub.teaserImage ?? pub.teaser };
}
