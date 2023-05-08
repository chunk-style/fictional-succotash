import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { CovalentLayoutModule } from "@covalent/core/layout";

const ngMaterial = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
];

const covalent = [CovalentLayoutModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...ngMaterial, ...covalent],
  exports: [...ngMaterial, ...covalent],
})
export class CoreMaterialModule {}
