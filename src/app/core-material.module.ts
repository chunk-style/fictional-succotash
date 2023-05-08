import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CovalentCommonModule } from "@covalent/core/common";
import { CovalentLayoutModule } from "@covalent/core/layout";
import { CovalentUserProfileModule } from "@covalent/core/user-profile";

const ngMaterial = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatTooltipModule,
  MatMenuModule,
  MatBadgeModule,
  MatSnackBarModule,
  MatInputModule,
  MatSidenavModule,
];

const covalent = [
  CovalentCommonModule,
  CovalentUserProfileModule,
  CovalentLayoutModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...ngMaterial, ...covalent],
  exports: [...ngMaterial, ...covalent],
})
export class CoreMaterialModule {}
