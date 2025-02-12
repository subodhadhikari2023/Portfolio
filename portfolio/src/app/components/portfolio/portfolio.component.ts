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
  java: boolean = false;
  spring_boot: boolean = false;
  hibernate: boolean = false;
  thymeleaf: boolean = false;
  mysql: boolean = false;
  javascript: boolean = false;
  php: boolean = false;
  spring_security: boolean = false;
  spring_mvc: boolean = false;


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
    if (this.java) {
      filterTags.push(Tags.JAVA);
    }
    if (this.spring_boot) {
      filterTags.push(Tags.SPRING_BOOT);
    }
    if (this.thymeleaf) {
      filterTags.push(Tags.THYMELEAF);
    }
    if (this.hibernate) {
      filterTags.push(Tags.HIBERNATE);
    }
    if (this.mysql) {
      filterTags.push(Tags.MYSQL);
    }
    if (this.javascript) {
      filterTags.push(Tags.JAVASCRIPT);
    }
    if (this.php) {
      filterTags.push(Tags.PHP);
    }
    if (this.spring_security) {
      filterTags.push(Tags.SPRING_SECURITY);
    }
    if (this.spring_mvc) {
      filterTags.push(Tags.SPRING_MVC);
    }
    if (this.angular) {
      filterTags.push(Tags.ANGULAR);
    }

    //add for reset
    if (this.angular == true || this.typeScript == true || this.hibernate == true || this.java == true || this.javascript == true || this.mysql == true || this.php == true || this.spring_boot == true || this.spring_mvc == true || this.spring_security == true || this.thymeleaf == true) {
      this.isfiltered = true;
    }
    else {
      this.isfiltered = false;
    }
    this.projects = this.projectService.getProjectsbyFilter(filterTags);



  }

  resetFilters() {
    this.angular = false;
    this.typeScript = false;
    this.hibernate=false;
    this.java=false;
    this.javascript=false;
    this.mysql=false;
    this.php=false;
    this.spring_boot=false;
    this.spring_mvc=false;
    this.spring_security=false;
    this.thymeleaf=false;
    this.projects = this.projectService.getProjects();
    this.isfiltered = false;
  }

}
