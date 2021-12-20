import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  Url!: string;

  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.getImage();
  }

  getProduct() {
    var obj = localStorage.getItem('product');
    if (obj != null || obj != undefined)
      this.product = JSON.parse(obj);
  }

  getImage() {
    var obj = localStorage.getItem('image');
    if (obj != null || obj != undefined)
      this.Url = obj;
  }

  EditProduct() {
    this.router.navigate(['/edit']);
  }

  DeleteProduct() {
    /* #region  dialog confiq */
    const dialogConfig = new MatDialogConfig();
    /* #endregion dialog confiq*/
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        localStorage.clear();
        this.router.navigate(['/add']);
      }
    })
  }

}
