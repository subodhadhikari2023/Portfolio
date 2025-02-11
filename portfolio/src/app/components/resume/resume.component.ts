import { Component, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  isEducationOpen=false;
  isWorkExperienceOpen=false;
  isSkillsOpen=false;
  isCertificationOpen=false;
  isProjectsOpen=false;

 constructor(private titleService:Title,private renderer:Renderer2) {
     this.titleService.setTitle('Subodh Adhikari - Resume');
    }
  ngOnInit(): void {
  }

  downloadResume()
{
    const link = this.renderer.createElement('a');
    link.setAttribute('target','_blank');
    link.setAttribute('href','../../assets/files/resume.pdf');
    link.setAttribute('download','resume.pdf');
    link.click();
    link.remove();
}

}
