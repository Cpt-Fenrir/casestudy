import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
} from '@ionic/angular/standalone';
import { NavController, AlertController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline, trashOutline } from 'ionicons/icons';
import { Task, TaskService } from '../../services/task.service';

interface TaskForm {
  title: string;
  description?: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  estimated: number;
}

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon,
    IonContent,
    IonItem,
    IonInput,
    IonTextarea,
  ],
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
  categories = ['Work', 'Study', 'Personal', 'Health', 'Other'];
  task: TaskForm = {
    title: '',
    description: '',
    category: 'Work',
    priority: 'Medium',
    estimated: 20
  };
  isEditing = false;
  editingId: string | null = null;

  constructor(
    private nav: NavController,
    private alertCtrl: AlertController,
    private taskService: TaskService,
    private router: Router
  ) {
    addIcons({ chevronBackOutline, trashOutline });
  }

  ngOnInit(): void {
    this.loadFromState(history.state?.task as Task | undefined);
  }

  selectCategory(c: string) {
    this.task.category = c;
  }

  selectPriority(p: 'High'|'Medium'|'Low') {
    this.task.priority = p;
  }

  saveTask() {
    if (!this.task.title || !this.task.title.trim()) {
      return;
    }
    if (this.isEditing && this.editingId) {
      this.taskService.updateTask(this.editingId, {
        title: this.task.title.trim(),
        description: this.task.description?.trim() || undefined,
        category: this.task.category as Task['category'],
        duration: this.task.estimated || 20,
        priority: this.task.priority,
      });
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        title: this.task.title.trim(),
        description: this.task.description?.trim() || undefined,
        category: this.task.category as Task['category'],
        duration: this.task.estimated || 20,
        completed: false,
        dueTime: undefined,
        createdDate: new Date(),
        priority: this.task.priority,
      };
      this.taskService.addTask(newTask);
    }
    this.nav.navigateBack('/tabs/tasks');
  }

  cancel() {
    this.nav.back();
  }

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Delete Task',
      message: 'Are you sure you want to delete this task?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Delete', role: 'destructive', handler: () => {
            if (this.isEditing && this.editingId) {
              this.taskService.deleteTask(this.editingId);
            }
            this.nav.navigateBack('/tabs/tasks');
          } }
      ]
    });
    await alert.present();
  }

  private loadFromState(incoming?: Task) {
    if (incoming && incoming.id) {
      this.isEditing = true;
      this.editingId = incoming.id;
      this.task = {
        title: incoming.title || '',
        description: incoming.description || '',
        category: incoming.category || 'Work',
        priority: (incoming.priority as TaskForm['priority']) || 'Medium',
        estimated: incoming.duration || 20,
      };
    } else {
      this.isEditing = false;
      this.editingId = null;
      this.task = {
        title: '',
        description: '',
        category: 'Work',
        priority: 'Medium',
        estimated: 20,
      };
    }
  }
}
