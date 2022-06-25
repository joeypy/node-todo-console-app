import { v4 as uuidv4 } from 'uuid';

class Task {
  id = '';
  desc = '';
  completedAt = null;

  constructor(desc) {
    this.desc = desc;
    this.id = uuidv4();
    this.completedAt = null;
  }
}

export { Task };
