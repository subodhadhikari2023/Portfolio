import { Injectable } from '@angular/core';
import { Project } from '../_models/Project';
import { Tags } from '../_models/Tags';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }
  projects: Project[] = [
    {
      id: 0, name: "Campus Connect",
      summary: "At its core, Campus Connect serves as a dynamic and inclusive digital ecosystem fostering a culture of collaboration, knowledge sharing, and continuous improvement. By providing a centralized hub for communication and resource management, Campus Connect empowers users at all levels—administrators, Heads of Departments (HODs), teachers, and students—to connect and collaborate in meaningful ways.",
      description: "Campus Connect is an innovative educational platform designed to foster collaboration within academic institutions. It serves as a centralized hub where faculty members and students can seamlessly connect and engage in collaborative learning activities.The platform is structured into multiple modules catering to the distinct roles and responsibilities of administrators, Heads of Departments (HODs), teachers, and students.At its core, Campus Connect serves as a dynamic and inclusive digital ecosystem fostering a culture of collaboration, knowledge sharing, and continuous improvement. By providing a centralized hub for communication and resource management, Campus Connect empowers users at all levels—administrators, Heads of Departments (HODs), teachers, and students—to connect and collaborate in meaningful ways.",
      projectLink: "https://www.github.com/subodhadhikari2023/campusconnect",
      tags: [
        Tags.THYMELEAF,
        Tags.SPRING_BOOT,
        Tags.HIBERNATE,
        Tags.MYSQL,
        Tags.JAVASCRIPT,
        Tags.JAVA,
        Tags.SPRING_SECURITY,
        Tags.SPRING_MVC
      ],
      pictures: [
        "../../../assets/images/screenshots/campusConnect/login.png",
        "../../../assets/images/screenshots/campusConnect/adminhome.png",
        "../../../assets/images/screenshots/campusConnect/hodhome.png",
        "../../../assets/images/screenshots/campusConnect/fileupload.png",
        "../../../assets/images/screenshots/campusConnect/fileaccess.png",
        "../../../assets/images/screenshots/campusConnect/teacherhome.png",
        "../../../assets/images/screenshots/campusConnect/addcourse.png"
      ]
    },
    {
      id: 1,
      name: "Patient Portal",
      summary: "Developed a patient portal allowing the users to book an appointment, view the appointment and update the appointments on real time",
      description: "Designed a patient portal using PHP, MySQL, HTML, CSS and JavaScript. Integrated doctors’ appointments scheduling with specific doctors within the system, selecting available dates and times. Enabled real-time appointment modification for improved patient engagement. Implemented real time viewing of all booked appointments for easy management and tracking.",
      projectLink: "https://github.com/subodhadhikari2023/BCA-MAJOR-PROJECT",
      tags: [
        Tags.PHP,
        Tags.MYSQL,
        Tags.JAVASCRIPT
      ],
      pictures: [
        "",
        "",
        ""
      ]
    },
    {
      id: 2,
      name: " Internship Portal for Government of Sikkim. (Actively Working)",
      summary: "The Internship Portal is a web-based platform developed to digitize the internship application and management process for students applying under the Government of Sikkim, Department of Information Technology. It provides students and administrators with tools for application submission, project file storage, status tracking, and certificate issuance",
      description: "The Internship Portal for the Government of Sikkim is a web-based platform designed to digitize the internship application and management process for students under the Department of Information Technology. This portal enhances accessibility and efficiency by providing students with tools for online application submission, status tracking, centralized project file storage, and real-time email notifications. Administrators benefit from features that allow them to manage and approve applications, monitor progress, and issue completion certificates seamlessly. Built with a tech stack that includes Angular 14.0.7 for the frontend, Spring Boot for the backend, and MySQL for the database, the portal addresses common challenges faced in manual internship management, such as delayed processing and lack of centralized file storage, ultimately facilitating a more streamlined and effective experience for both students and administrators. ",
      projectLink: "https://github.com/subodhadhikari2023/internship-portal",
      tags: [
        Tags.JAVA,
        Tags.MYSQL,
        Tags.TYPESCRIPT,
        Tags.ANGULAR,
        Tags.SPRING_SECURITY,
        Tags.SPRING_BOOT,
        Tags.HIBERNATE
      ],
      pictures: [
        "",
        "",
        ""
      ]
    },
    {
      id: 3,
      name: " Spring MVC CRUD Application",
      summary: "This project is part of Spring Boot 3: Learn Spring 6, Spring Core, Spring REST, Spring MVC, Spring Security, Thymeleaf, JPA, Hibernate, MySQL Course",
      description: "This project allows the user to perform CRUD operations: Lists all the employees in the database. Add employee allows the user to add a new employee using a form which asks for the necessary fields.Two buttons are present: Update and Delete. Update allows the user to update the current employee.Delete allows the user to delete the current employee. ",
      projectLink:"https://github.com/subodhadhikari2023/Spring-Boot-MVC-CRUD-Employee-Application-Using-Thymeleaf",
      tags: [
        Tags.JAVA,
        Tags.MYSQL,
        Tags.SPRING_BOOT,
        Tags.SPRING_SECURITY,
        Tags.SPRING_MVC,
        Tags.HIBERNATE
      ],
      pictures: [
        "",
        "",
        ""
      ]
    }

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
        if (project.tags.includes(filterTags) == false) {
          foundAll = false;
        }
      });

      if (foundAll) {
        filteredProjects.push(project);
      }
    });

    return filteredProjects;
  }
}
