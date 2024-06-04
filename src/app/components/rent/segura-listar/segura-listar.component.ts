import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rent } from '../../../models/rent';
import { RentService } from '../../../services/rent.service';

@Component({
  selector: 'app-segura-listar',
  templateUrl: './segura-listar.component.html',
  styleUrl: './segura-listar.component.scss'
})
export class SeguraListarComponent {
  rents: Rent[] = [];
  dataSource = new MatTableDataSource<Rent>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'id',
    'clientName',
    'rentDays',
    'rentDate',
    'pricePerDay',
    'plate',
    'brand',
    'insurance',
    'totalPrice',
    'years',
    'rentDateEnd'
  ];

  constructor(
    private rentService: RentService,
  ) {}

  ngOnInit(): void {
    this.rentService.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });

    this.rentService.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    const sortState: Sort = { active: 'id', direction: 'asc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  getCarYears(date: Date): number{
    const rentYear = new Date(date).getFullYear();
    return 2024 - rentYear;
  }

  getRentEndDate(date: Date, rentDays: number): Date{
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + rentDays);
    return endDate;
  }
}
