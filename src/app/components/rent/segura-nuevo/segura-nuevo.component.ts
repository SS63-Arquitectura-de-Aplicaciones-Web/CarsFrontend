import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RentService } from '../../../services/rent.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-segura-nuevo',
  templateUrl: './segura-nuevo.component.html',
  styleUrl: './segura-nuevo.component.scss',
})
export class SeguraNuevoComponent {
  rentForm: FormGroup;
  currentDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rentService: RentService,
    public snackBar: MatSnackBar
  ) {
    this.rentForm = this.fb.group({
      clientName: this.fb.control('', Validators.required),
      rentDays: this.fb.control('', [Validators.required, Validators.min(1)]),
      rentDate: this.fb.control('', Validators.required),
      rentEndDate: this.fb.control('', Validators.required),
      pricePerDay: this.fb.control('', [
        Validators.required,
        Validators.min(1),
      ]),
      plate: this.fb.control('', Validators.required),
      brand: this.fb.control('', Validators.required),
      insurance: this.fb.control(false, Validators.required),
    });
  }

  onSubmit() {
    const starDate = this.rentForm.get('rentDate')?.value;
    const endDate = this.rentForm.get('rentEndDate')?.value;

    if (this.rentForm.invalid) {
      this.rentForm.markAllAsTouched();
      if(starDate >= endDate){
        console.log("invalid");
        this.rentForm.get('rentDate')?.setErrors({ invaliddate: true });
        this.rentForm.get('rentEndDate')?.setErrors({ invaliddate: true });
      }
      this.snackBar.open('Campos inválidos', 'Cerrar');
    } else {
      if (starDate < endDate) {
        this.rentService.create(this.rentForm.value).subscribe({
          next: () => {
            this.rentService.list().subscribe({
              next: (rents) => {
                this.rentService.setList(rents);
              },
            });
          },
        });
        this.snackBar.open('Registrado exitosamente!', 'Cerrar');
        this.router.navigate(['segura/listar']);
      }else{
        this.rentForm.get('rentDate')?.setErrors({ invaliddate: true });
        this.rentForm.get('rentEndDate')?.setErrors({ invaliddate: true });
        this.snackBar.open('Campos inválidos', 'Cerrar');
      }
    }
  }

  onCancel() {
    this.router.navigate(['segura/listar']);
  }
}
