import Person from './Person';

export default class Dms {
  id!: string;
  name!: string;
  type!: string;
  users!: Person[];
}

export class DmChannel {
  channels!: Dms[];
}
