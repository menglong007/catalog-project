import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DetailComponent} from "./detail/detail.component";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {JsonPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatChip, MatChipSet} from "@angular/material/chips";


@Component({
  selector: 'app-contain',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, ReactiveFormsModule, NgIf, KeyValuePipe, MatProgressSpinner, NgForOf, MatChipSet, MatChip, JsonPipe],
  templateUrl: './contain.component.html',
})
export class ContainComponent implements AfterViewInit , OnInit {

  displayedColumns: string[] = [
    'no',
    'name',
    'flag',
    'cc2',
    'cc3',
    'nativeName',
    'altSpellings',
    'idd',
  ];

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  search = new FormControl<string | null>('');

  constructor(private http: HttpClient,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.sort) {
      this.sort.sortChange.subscribe(() => {
        const direction = this.sort.direction === 'asc' ? 1 : -1;
        this.dataSource.data = [...this.dataSource.data].sort((a, b) => {
          return a.name.official.localeCompare(b.name.official) * direction;
        });
      });
    }
  }


  loadData() {
    this.http.get(`v3.1/all`).subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
      },
    });
  }

  applyFilter() {
    const filterValue = this.search.value!.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.name.official.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
  }


  onDialog(row: any) {
    this.dialog.open(DetailComponent, {
      minWidth: '1400px',
      height: '700px',
      data: row
    })
  }

  getDisplayedIndex(index: number): number {
    return (
      (this.paginator?.pageIndex ?? 0) * (this.paginator?.pageSize ?? 10) +
      index +
      1
    );
  }

  checkObject(value: any): any {
    return Object.keys(value).map((key) => ({key, value: value[key]}));
  }

}
