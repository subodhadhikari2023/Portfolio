import { Injectable } from '@angular/core';
import { Project } from '../_models/Project';
import { Tags } from '../_models/Tags';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }
  projects: Project[] = [
    { id: 0, name: "Sample Angular App", summary: "Test Summary", description: "Test Description", projectLink: "https://www.github.com/subodhadhikari2023", tags: [Tags.ANGULAR, Tags.SPRING_BOOT], pictures: ["../../../assets/images/image2.jpg", "../../../assets/images/image1.jpg", "../../../assets/images/image3.jpg"] },
    { id: 1, name: "Sample Angular App", summary: "Test Summary", description: "Test Description", projectLink: "", tags: [Tags.TYPESCRIPT, Tags.SPRING_BOOT], pictures: ["../../../assets/images/image2.jpg", "../../../assets/images/image1.jpg", "../../../assets/images/image3.jpg"] },
    { id: 2, name: "Sample Angular App2", summary: "Test Summary2", description: "Test Description2", projectLink: "", tags: [Tags.HIBERNATE, Tags.JAVA], pictures: ["../../../assets/images/image2.jpg", "../../../assets/images/image1.jpg", "../../../assets/images/image3.jpg"] },
    { id: 3, name: "Sample Angular App2", summary: "Test Summary2", description: "Test Description2", projectLink: "", tags: [Tags.HIBERNATE, Tags.JAVA], pictures: ["../../../assets/images/image2.jpg", "../../../assets/images/image1.jpg", "../../../assets/images/image3.jpg"] },
    { id: 4, name: "Sample Angular App2", summary: "Test Summary2", description: "Test Description2", projectLink: "", tags: [Tags.HIBERNATE, Tags.JAVA], pictures: ["../../../assets/images/image2.jpg", "../../../assets/images/image1.jpg", "../../../assets/images/image3.jpg"] },
    { id: 5, name: "Sample Angular App2", summary: "Test Summary2", description: "Test Description2", projectLink: "", tags: [Tags.HIBERNATE, Tags.JAVA], pictures: ["../../../assets/images/image2.jpg", "../../../assets/images/image1.jpg", "../../../assets/images/image3.jpg"] },
    { id: 6, name: "Sample Angular App2", summary: "Test Summary2", description: "Test Description2", projectLink: "", tags: [Tags.HIBERNATE, Tags.JAVA], pictures: ["../../../assets/images/image2.jpg", "../../../assets/images/image1.jpg", "../../../assets/images/image3.jpg"] },
    { id: 7, name: "Sample Angular App2", summary: "Test Summary2", description: "Test Description2", projectLink: "", tags: [Tags.HIBERNATE, Tags.JAVA], pictures: ["../../../assets/images/image2.jpg", "../../../assets/images/image1.jpg", "../../../assets/images/image3.jpg"] },
    { id: 8, name: "Sample Angular App2", summary: "Test Summary2", description: "Test Description2", projectLink: "", tags: [Tags.HIBERNATE, Tags.JAVA], pictures: ["../../../assets/images/image2.jpg", "../../../assets/images/image1.jpg", "../../../assets/images/image3.jpg"] },
    { id: 9, name: "Sample Angular App2", summary: "Test Summary2", description: "Test Description2", projectLink: "", tags: [Tags.HIBERNATE, Tags.JAVA], pictures: ["../../../assets/images/image2.jpg", "../../../assets/images/image1.jpg", "../../../assets/images/image3.jpg"] },
    { id: 10, name: "Sample Angular App2", summary: "Test Summary2", description: "Test Description2", projectLink: "", tags: [Tags.HIBERNATE, Tags.JAVA], pictures: ["../../../assets/images/image2.jpg", "../../../assets/images/image1.jpg", "../../../assets/images/image3.jpg"] }

  ];
  getProjects() {
    return this.projects;
  }
  getProjectbyId(id: number): Project {
    let project = this.projects.find(project => project.id == id);
    if (project == undefined) {
      throw new TypeError('Not project found!')
    }
    return project;
  }

  getProjectsbyFilter(filterTags: Tags[]) {
    let filteredProjects: Project[] = [];
    this.projects.forEach(function (project) {
      let foundAll = true;
      filterTags.forEach(function (filterTags) {
        if(project.tags.includes(filterTags)==false){
          foundAll=false;
        }
      });

      if(foundAll){
        filteredProjects.push(project);
      }
    });

    return filteredProjects;
  }
}
