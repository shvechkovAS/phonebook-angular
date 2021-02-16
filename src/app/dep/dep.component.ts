import { Component, OnInit } from '@angular/core';
import { PhoneService } from '../phone.service';
import { Dep, FilBranchDep, OrgDep } from './Dep';

@Component({
  selector: 'app-dep',
  templateUrl: './dep.component.html',
  styleUrls: ['./dep.component.css']
})
export class DepComponent implements OnInit {

  deps:IDep[]=[];
  fil: FilBranchDep = new FilBranchDep();
  org: OrgDep = new OrgDep();
  dep: Dep = new Dep();
  id: number = 0;
  idOrg: number = 0;
  idFil: number = 0;
  done:boolean = false;

  ngOnInit(): void {
    this.getDepsTbl();
  }

  constructor(private phoneService: PhoneService) { }

  getDepsTbl() {
    this.phoneService.getDeps().subscribe((req) => {
      this.deps = req;
      console.log(req);
    });
  }

  setNewDepartment(dep: Dep){
    this.phoneService.setNewDep(dep).subscribe(
                    (data: Dep) => {this.dep=data; this.done=true;},
                    error => console.log(error)
                    );
                    this.getDepsTbl();
  }

  removeDepartment(id: number){
    this.phoneService.removeDep(id).subscribe(
                    error => console.log(error)
                    );
                    this.getDepsTbl();
  }

  updateDepartment(depId:number, dep: Dep){
    this.phoneService.updateDep(depId, dep).subscribe(
                      error => console.log(error)
                  );
                  this.getDepsTbl();
  }

  findDepartmentByNameDep(nameDep:string){
    this.phoneService.findDepByDepName(nameDep).subscribe((req) => {
      this.deps = req;
      console.log(req);
    });
  }

  setOrgToDepartment(orgId:number, depId:number, dep: Dep){
    this.phoneService.setOrgToDep(orgId, depId, dep).subscribe(
                      error => console.log(error)
                  );
                  this.getDepsTbl();
  }

  removeOrgFromDepartment(orgId:number, depId:number){
    this.phoneService.removeOrgFromDep(orgId, depId).subscribe(
                      error => console.log(error)
                  );
                  this.getDepsTbl();
  }

  setFilToDepartment(filId:number, depId:number, dep: Dep){
    this.phoneService.setFilToDep(filId, depId, dep).subscribe(
                      error => console.log(error)
                  );
                  this.getDepsTbl();
  }

  removeFilFromDepartment(filId:number, depId:number){
    this.phoneService.removeFilFromDep(filId, depId).subscribe(
                      error => console.log(error)
                  );
                  this.getDepsTbl();
  }

}

export interface IDep{
    id: number;
    depName?: string;
    plainFilialBranchDto?: IFilBranchDep;
    plainOrgDto?: IOrgDep;
  }

export interface IFilBranchDep{
    id?: number;
    filialName?:string;
}

export interface IOrgDep{
    id?: number;
    nameOrg?:string;
}
