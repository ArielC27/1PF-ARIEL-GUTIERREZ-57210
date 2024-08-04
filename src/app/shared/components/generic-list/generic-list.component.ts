import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-generic-list",
  templateUrl: "./generic-list.component.html",
  styleUrl: "./generic-list.component.scss",
})
export class GenericListComponent {
  @Input() displayedColumns: string[] = [];
  @Input() columnsResult: any = {};
  @Input() dataSource: any[] = [];

  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  edit(row: any): void {
    this.editEvent.emit(row);
  }
  deleteItem(row: any): void {
    this.deleteEvent.emit(row);
  }
}
