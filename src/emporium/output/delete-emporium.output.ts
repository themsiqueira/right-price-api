export class DeleteEmporiumOutput {
    id: number; // ID of the soft-deleted Emporium entity
    message: string;
  
    constructor(id: number, message: string) {
      this.id = id;
      this.message = message;
    }
  }
  