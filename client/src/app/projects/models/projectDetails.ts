import { ProjectsList } from './projectsList';
import { ManageEmployee } from '../../employee/models/manageEmmployee';

export interface ProjectDetails extends ProjectsList {
  employees: ManageEmployee[];
}
