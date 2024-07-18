import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReversePipe } from "./pipes/reverse.pipe";
import { ResaltadoDirective } from "./directives/resaltado.directive";
import { RepetirDirective } from "./directives/repetir.directive";
import { GenericListComponent } from "./components/generic-list/generic-list.component";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { UppercasePipe } from './pipes/uppercase/uppercase.pipe';
import { ChangeFontsizeDirective } from './directives/change-fontsize.directive';

@NgModule({
  declarations: [
    ReversePipe,
    ResaltadoDirective,
    RepetirDirective,
    GenericListComponent,
    UppercasePipe,
    ChangeFontsizeDirective,
  ],
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  exports: [
    ReversePipe,
    ResaltadoDirective,
    RepetirDirective,
    GenericListComponent,
  ],
})
export class SharedModule {}