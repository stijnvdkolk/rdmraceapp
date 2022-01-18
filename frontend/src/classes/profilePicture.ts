// eslint-disable-next-line @typescript-eslint/no-unused-vars
function imageExists(image_url: string) {
  var http = new XMLHttpRequest();
  http.onerror = (e) => {
    return 404;
  };
  http.open('GET', image_url, false);
  http.send();

  return http.status;
}

export default function Pfp(
  authorId: string,
  ProfilePictureName: string
): string {
  if (
    ProfilePictureName === '' ||
    ProfilePictureName === '/embed/avatars/default.png'
  ) {
    return 'https://cdn.rdmraceapp.nl/embed/avatars/default.png';
  }

  const BASE = 'https://cdn.rdmraceapp.nl/avatars/';
  const PATH = `${BASE}${authorId}/${ProfilePictureName}`;
  return PATH;
}
export function tryAttachment(
  channelNumber: string,
  bId: string,
  name: string
): string {
  const BASE = 'https://cdn.rdmraceapp.nl/attachments/';
  const PATH = `${BASE}${channelNumber}/${bId}/${name}`;
  return PATH;
}
