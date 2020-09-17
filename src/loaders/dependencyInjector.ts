import Container from 'typedi';
import { BaseEntity } from 'typeorm';

export default (entities: Array<{ entity: BaseEntity; name: string }>) => {
  entities.forEach(e => {
    Container.set(e.name, e.entity);
  });
};
