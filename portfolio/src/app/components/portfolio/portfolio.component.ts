import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Project } from 'src/app/_models/Project';
import { Tags } from 'src/app/_models/Tags';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  projects = {} as Project[];
  isfiltered: boolean = false;
  typeScript: boolean = false;
  angular: boolean = false;
  isCollapsed: boolean = true;
  constructor(private titleService: Title, private projectService: ProjectsService) {
    this.titleService.setTitle('Subodh Adhikari - Portfolio');
  }
  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }
  filter() {
    let filterTags: Tags[] = [];
    if (this.typeScript) {
      filterTags.push(Tags.TYPESCRIPT);
    }
    if (this.angular) {
      filterTags.push(Tags.ANGULAR);
    }
    
    
    if (this.angular==true||this.typeScript==true) {
      this.isfiltered=true;
    }
    else{
      this.isfiltered=false;
    }
    this.projects = this.projectService.getProjectsbyFilter(filterTags);



  }

  resetFilters() {
    this.angular = false;
    this.typeScript = false;
    this.projects = this.projectService.getProjects();
    this.isfiltered=false;
  }

}
