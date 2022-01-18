import Person from './Person';

export default class Channel {
  id: string | undefined;
  name: string | undefined;
  type: string | undefined;
  createdAt: string | undefined;
  description: string | undefined;
  rolesAccess: string[] | undefined;
  users?: Person[] | undefined;
}
