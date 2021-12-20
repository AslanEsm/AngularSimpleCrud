import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  form!: FormGroup;
  Url: any = null;
  product!: Product;

  @ViewChild('image', { static: true }) image!: ElementRef;

  constructor(
    private router: Router,
    private alertService: ToastrService,
    ) { }

  ngOnInit(): void {
    this.getProduct();
    this.getImage();
    this.initForm();
    this.fillEditUserForm();
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

  public initForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      count: new FormControl('', [Validators.required]),
      shortDes: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  fillEditUserForm() {
    this.form.patchValue({
      name: this.product.name,
      count: this.product.count,
      shortDes: this.product.shortDes,
      description: this.product.description,
    })
  }

  EditProduct() {
    if(this.form.invalid) return this.alertService.warning("Enter Valid Data");
    this.DeleteLocal();
    localStorage.setItem("product", JSON.stringify(this.form.value));
    localStorage.setItem("image", this.Url);
    this.alertService.success("Product Edited successfully");
    this.router.navigate(['detail']);
  }

  DeleteLocal() {
    localStorage.clear();
  }

  onSelectFile(event) {
    var selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      this.Url = event?.target?.result;
    }

    reader.readAsDataURL(selectedImage);
  }


}
