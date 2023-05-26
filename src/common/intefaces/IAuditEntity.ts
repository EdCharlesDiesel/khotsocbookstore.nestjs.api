export interface IAuditEntity {
  createdOn: Date;
  createdBy: string;
  updatedOn: Date;
  updatedBy: string;
  deletedAt: Date;
  deletedBy: string;
}
