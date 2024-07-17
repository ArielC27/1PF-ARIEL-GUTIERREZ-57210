import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-generic-list",
  templateUrl: "./generic-list.component.html",
  styleUrl: "./generic-list.component.scss",
})
export class GenericListComponent<T> {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: T[] = [];

  @Output() editStudentEvent = new EventEmitter<T>();
  @Output() deleteStudentEvent = new EventEmitter<T>();

  editStudent(row: T){
    this.editStudentEvent.emit(row);
  };
  deleteStudent(row: T){
    this.deleteStudentEvent.emit(row);
  };
}
