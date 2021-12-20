import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  form!: FormGroup;
  Url: any = null;
  product!: Product;
  @ViewChild('image', { static: true }) image!: ElementRef;

  constructor(
    private router: Router,
    private alertService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      count: new FormControl('', [Validators.required]),
      shortDes: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  AddProduct() {
    if(this.form.invalid) return this.alertService.warning("Enter Valid Data");
    localStorage.setItem("product", JSON.stringify(this.form.value));
    localStorage.setItem("image", this.Url);
    this.alertService.success("Product Added successfully");
    this.router.navigate(['detail']);
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
