export interface Task {
  id: number;
  name: string;
  status: string;
  description: string;
  employeeId: number;
  employeeName: string;
  employeeImage: string;
  projectId: number;
  estimatedWorkTime: string;
  estimatedTaskTimeEnd: string;
  startDate: Date;
  priorityStatus: string;
  typeTask: string;
  comment: string;
}
