export default function Pfp(authorId : string, ProfilePictureName : string) : string {
    const BASE = "https://cdn.rdmraceapp.nl/avatars/"
    return `${BASE}${authorId}/${ProfilePictureName}`
}